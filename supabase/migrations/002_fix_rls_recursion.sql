-- Fix RLS infinite recursion on partner_users table
-- The original policies subquery partner_users from within partner_users RLS,
-- causing infinite recursion. Fix: use SECURITY DEFINER functions that bypass RLS.

-- Step 1: Create helper functions (SECURITY DEFINER bypasses RLS)

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

-- Step 2: Drop all existing policies

DROP POLICY IF EXISTS "Partners see own org" ON partner_organizations;
DROP POLICY IF EXISTS "Partners see own org users" ON partner_users;
DROP POLICY IF EXISTS "Partners see own leads" ON leads;
DROP POLICY IF EXISTS "Partners see own lead activity" ON lead_activity;
DROP POLICY IF EXISTS "Partners see own commissions" ON commission_entries;
DROP POLICY IF EXISTS "Apaly team only - audit" ON audit_log;
DROP POLICY IF EXISTS "Apaly team only - settings" ON admin_notification_settings;

-- Step 3: Recreate all policies using the helper functions

-- partner_users: use auth.uid() directly — no subquery back to itself
CREATE POLICY "Users see own org members" ON partner_users
  FOR ALL USING (
    user_id = auth.uid()
    OR organization_id = get_my_partner_org_id()
    OR is_apaly_team_member() = true
  );

-- partner_organizations
CREATE POLICY "Partners see own org" ON partner_organizations
  FOR ALL USING (
    id = get_my_partner_org_id()
    OR is_apaly_team_member() = true
  );

-- leads
CREATE POLICY "Partners see own leads" ON leads
  FOR ALL USING (
    organization_id = get_my_partner_org_id()
    OR is_apaly_team_member() = true
  );

-- lead_activity
CREATE POLICY "Partners see own lead activity" ON lead_activity
  FOR ALL USING (
    (SELECT organization_id FROM leads WHERE id = lead_id) = get_my_partner_org_id()
    OR is_apaly_team_member() = true
  );

-- commission_entries
CREATE POLICY "Partners see own commissions" ON commission_entries
  FOR ALL USING (
    organization_id = get_my_partner_org_id()
    OR is_apaly_team_member() = true
  );

-- audit_log (Apaly team only)
CREATE POLICY "Apaly team only - audit" ON audit_log
  FOR ALL USING (
    is_apaly_team_member() = true
  );

-- admin_notification_settings (Apaly team only)
CREATE POLICY "Apaly team only - settings" ON admin_notification_settings
  FOR ALL USING (
    is_apaly_team_member() = true
  );
