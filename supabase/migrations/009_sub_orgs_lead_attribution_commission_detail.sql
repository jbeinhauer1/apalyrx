-- ═══════════════════════════════════════════════════════
-- Sub-organization hierarchy on partner_organizations
-- ═══════════════════════════════════════════════════════
ALTER TABLE partner_organizations
  ADD COLUMN parent_organization_id UUID REFERENCES partner_organizations(id) ON DELETE SET NULL,
  ADD COLUMN invited_by_organization_id UUID REFERENCES partner_organizations(id) ON DELETE SET NULL,
  ADD COLUMN invite_token TEXT,
  ADD COLUMN invite_token_expires_at TIMESTAMPTZ;

-- Add 'invited' to partner_organizations status constraint
ALTER TABLE partner_organizations DROP CONSTRAINT IF EXISTS partner_organizations_status_check;
ALTER TABLE partner_organizations ADD CONSTRAINT partner_organizations_status_check
  CHECK (status IN ('pending','active','suspended','denied','invited'));

CREATE INDEX partner_orgs_parent_idx ON partner_organizations(parent_organization_id);

-- ═══════════════════════════════════════════════════════
-- Lead attribution and prospect confirmation
-- ═══════════════════════════════════════════════════════
ALTER TABLE leads
  ADD COLUMN referral_link_id UUID,
  ADD COLUMN assigned_to_user_id UUID REFERENCES partner_users(id) ON DELETE SET NULL,
  ADD COLUMN prospect_confirmed_at TIMESTAMPTZ,
  ADD COLUMN prospect_consent_token TEXT,
  ADD COLUMN prospect_consent_token_expires_at TIMESTAMPTZ;

-- Add 'disputed' to leads status constraint
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_status_check;
ALTER TABLE leads ADD CONSTRAINT leads_status_check
  CHECK (status IN ('pending','qualified','customer','expired','denied','disputed'));

CREATE INDEX leads_assigned_to_user_idx ON leads(assigned_to_user_id);
CREATE INDEX leads_referral_link_idx ON leads(referral_link_id);

-- ═══════════════════════════════════════════════════════
-- Commission entries: script-level detail columns
-- ═══════════════════════════════════════════════════════
ALTER TABLE commission_entries
  ADD COLUMN partner_code TEXT,
  ADD COLUMN customer_name TEXT,
  ADD COLUMN script_id TEXT,
  ADD COLUMN drug_ndc TEXT,
  ADD COLUMN drug_brand_name TEXT,
  ADD COLUMN drug_generic_name TEXT,
  ADD COLUMN fulfillment_date DATE,
  ADD COLUMN apalyrx_fee DECIMAL(10,2),
  ADD COLUMN commission_rate_snapshot DECIMAL(6,4),
  ADD COLUMN sub_organization_id UUID REFERENCES partner_organizations(id) ON DELETE SET NULL;

CREATE INDEX commission_entries_partner_code_idx ON commission_entries(partner_code);
