-- Partner Organizations
CREATE TABLE partner_organizations (
  id                          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_code                varchar(4) UNIQUE NOT NULL,
  company_name                text NOT NULL,
  ein                         varchar(10),
  address                     text,
  city                        text,
  state                       text,
  zip                         text,
  website                     text,
  status                      text DEFAULT 'pending' CHECK (status IN ('pending','active','suspended','denied')),
  commission_rate             decimal(5,2),
  commission_duration_months  integer DEFAULT 12,
  notification_email          text,
  setup_complete              boolean DEFAULT false,
  routing_number              text,
  account_number_last4        text,
  account_number_encrypted    text,
  bank_name                   text,
  created_at                  timestamptz DEFAULT now(),
  approved_at                 timestamptz,
  approved_by                 uuid,
  updated_at                  timestamptz DEFAULT now()
);

-- Partner Users
CREATE TABLE partner_users (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          uuid REFERENCES auth.users(id) UNIQUE,
  organization_id  uuid REFERENCES partner_organizations(id),
  role             text NOT NULL CHECK (role IN ('super_admin','apaly_staff','partner_admin','partner_user')),
  first_name       text,
  last_name        text,
  email            text NOT NULL,
  is_apaly_team    boolean DEFAULT false,
  created_at       timestamptz DEFAULT now(),
  last_login       timestamptz
);

-- Leads
CREATE TABLE leads (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id         uuid REFERENCES partner_organizations(id),
  submitted_by            uuid REFERENCES partner_users(id),
  submission_source       text DEFAULT 'manual' CHECK (submission_source IN ('manual','referral_link')),
  prospect_company_name   text NOT NULL,
  prospect_ein            varchar(10),
  prospect_contact_name   text NOT NULL,
  prospect_contact_email  text NOT NULL,
  prospect_phone          text,
  prospect_estimated_lives text,
  prospect_notes          text,
  status                  text DEFAULT 'pending' CHECK (status IN ('pending','qualified','customer','expired','denied')),
  denial_reason           text,
  submitted_at            timestamptz DEFAULT now(),
  qualified_at            timestamptz,
  acceptance_deadline     timestamptz,
  customer_since          timestamptz,
  commission_start_date   timestamptz,
  commission_end_date     timestamptz,
  expired_at              timestamptz,
  approved_by             uuid REFERENCES partner_users(id),
  approval_token          text UNIQUE,
  approval_token_expires_at timestamptz,
  created_at              timestamptz DEFAULT now(),
  updated_at              timestamptz DEFAULT now()
);

CREATE INDEX idx_leads_ein ON leads(prospect_ein);
CREATE INDEX idx_leads_approval_token ON leads(approval_token);
CREATE INDEX idx_leads_org ON leads(organization_id);

-- Lead Activity Timeline
CREATE TABLE lead_activity (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id       uuid REFERENCES leads(id),
  author_id     uuid REFERENCES partner_users(id),
  author_type   text CHECK (author_type IN ('apaly_team','partner')),
  content       text NOT NULL,
  activity_type text DEFAULT 'note' CHECK (activity_type IN ('note','status_change','email_sent','approval')),
  created_at    timestamptz DEFAULT now()
);

-- Commission Entries
CREATE TABLE commission_entries (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id                  uuid REFERENCES leads(id),
  organization_id          uuid REFERENCES partner_organizations(id),
  period_month             date NOT NULL,
  program_admin_fee        decimal(12,2) DEFAULT 0,
  value_based_fee          decimal(12,2) DEFAULT 0,
  total_commissionable     decimal(12,2) GENERATED ALWAYS AS (program_admin_fee + value_based_fee) STORED,
  commission_rate_applied  decimal(5,2) NOT NULL,
  commission_amount        decimal(12,2),
  import_source            text DEFAULT 'csv' CHECK (import_source IN ('csv','webhook','manual')),
  import_batch_id          text,
  created_at               timestamptz DEFAULT now(),
  created_by               uuid REFERENCES partner_users(id)
);

-- Commission Import Log
CREATE TABLE commission_imports (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  import_source  text DEFAULT 'csv',
  filename       text,
  row_count      integer,
  success_count  integer,
  error_count    integer,
  errors         jsonb,
  imported_by    uuid REFERENCES partner_users(id),
  created_at     timestamptz DEFAULT now()
);

-- Audit Log
CREATE TABLE audit_log (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id     uuid REFERENCES partner_users(id),
  actor_email  text,
  action       text NOT NULL,
  target_type  text,
  target_id    uuid,
  metadata     jsonb,
  ip_address   text,
  created_at   timestamptz DEFAULT now()
);

-- Admin Notification Settings
CREATE TABLE admin_notification_settings (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type   text UNIQUE NOT NULL,
  email_list   text[] DEFAULT '{}',
  enabled      boolean DEFAULT true,
  updated_by   uuid REFERENCES partner_users(id),
  updated_at   timestamptz DEFAULT now()
);

-- Seed default notification events
INSERT INTO admin_notification_settings (event_type) VALUES
  ('new_partner_signup'),
  ('new_lead'),
  ('lead_approved'),
  ('lead_denied');

-- Calculator defaults
CREATE TABLE portal_settings (
  key    text PRIMARY KEY,
  value  text,
  updated_at timestamptz DEFAULT now()
);

INSERT INTO portal_settings (key, value) VALUES
  ('avg_commissionable_fee_per_life', '12.00'),
  ('default_commission_duration_months', '12');

-- RLS Policies

-- Helper functions (SECURITY DEFINER bypasses RLS to avoid infinite recursion)
CREATE OR REPLACE FUNCTION get_my_partner_org_id()
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT organization_id FROM partner_users WHERE user_id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION is_apaly_team_member()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT COALESCE(is_apaly_team, false) FROM partner_users WHERE user_id = auth.uid();
$$;

ALTER TABLE partner_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE commission_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE commission_imports ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_notification_settings ENABLE ROW LEVEL SECURITY;

-- partner_users: use auth.uid() directly — no subquery back to itself
CREATE POLICY "Users see own org members" ON partner_users
  FOR ALL USING (
    user_id = auth.uid()
    OR organization_id = get_my_partner_org_id()
    OR is_apaly_team_member() = true
  );

-- Partners can only see their own org
CREATE POLICY "Partners see own org" ON partner_organizations
  FOR ALL USING (
    id = get_my_partner_org_id()
    OR is_apaly_team_member() = true
  );

-- Partners see only their leads; Apaly team sees all
CREATE POLICY "Partners see own leads" ON leads
  FOR ALL USING (
    organization_id = get_my_partner_org_id()
    OR is_apaly_team_member() = true
  );

-- Lead activity scoped to partner's leads
CREATE POLICY "Partners see own lead activity" ON lead_activity
  FOR ALL USING (
    (SELECT organization_id FROM leads WHERE id = lead_id) = get_my_partner_org_id()
    OR is_apaly_team_member() = true
  );

-- Commission entries scoped to partner's org
CREATE POLICY "Partners see own commissions" ON commission_entries
  FOR ALL USING (
    organization_id = get_my_partner_org_id()
    OR is_apaly_team_member() = true
  );

-- Only Apaly team can see audit log and notification settings
CREATE POLICY "Apaly team only - audit" ON audit_log
  FOR ALL USING (
    is_apaly_team_member() = true
  );

CREATE POLICY "Apaly team only - settings" ON admin_notification_settings
  FOR ALL USING (
    is_apaly_team_member() = true
  );
