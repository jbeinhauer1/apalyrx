-- ═══════════════════════════════════════════════════════
-- Sub-organization visibility: RLS policy updates
-- Parent orgs can see their sub-orgs' data
-- ═══════════════════════════════════════════════════════

-- Helper: returns the user's org ID plus all child org IDs (one level deep)
CREATE OR REPLACE FUNCTION get_my_org_and_children()
RETURNS SETOF uuid
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  -- Own org
  SELECT organization_id FROM partner_users WHERE user_id = auth.uid()
  UNION
  -- Direct child orgs
  SELECT id FROM partner_organizations
  WHERE parent_organization_id = (
    SELECT organization_id FROM partner_users WHERE user_id = auth.uid()
  )
$$;

-- ═══════════════════════════════════════════════════════
-- Update leads policy: parent orgs see sub-org leads
-- ═══════════════════════════════════════════════════════
DROP POLICY IF EXISTS "Partners see own leads" ON leads;
CREATE POLICY "Partners see own leads" ON leads
  FOR ALL USING (
    organization_id IN (SELECT get_my_org_and_children())
    OR is_apaly_team_member() = true
  );

-- ═══════════════════════════════════════════════════════
-- Update commission_entries policy: parent orgs see sub-org commissions
-- ═══════════════════════════════════════════════════════
DROP POLICY IF EXISTS "Partners see own commissions" ON commission_entries;
CREATE POLICY "Partners see own commissions" ON commission_entries
  FOR ALL USING (
    organization_id IN (SELECT get_my_org_and_children())
    OR is_apaly_team_member() = true
  );

-- ═══════════════════════════════════════════════════════
-- Update partner_organizations policy: see own org + sub-orgs
-- ═══════════════════════════════════════════════════════
DROP POLICY IF EXISTS "Partners see own org" ON partner_organizations;
CREATE POLICY "Partners see own org" ON partner_organizations
  FOR ALL USING (
    id IN (SELECT get_my_org_and_children())
    OR is_apaly_team_member() = true
  );

-- ═══════════════════════════════════════════════════════
-- Update lead_activity policy: follows leads visibility
-- ═══════════════════════════════════════════════════════
DROP POLICY IF EXISTS "Partners see own lead activity" ON lead_activity;
CREATE POLICY "Partners see own lead activity" ON lead_activity
  FOR ALL USING (
    lead_id IN (
      SELECT id FROM leads WHERE organization_id IN (SELECT get_my_org_and_children())
    )
    OR is_apaly_team_member() = true
  );
