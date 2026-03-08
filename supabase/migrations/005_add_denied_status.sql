-- Add 'denied' to partner_organizations status CHECK constraint
ALTER TABLE partner_organizations DROP CONSTRAINT IF EXISTS partner_organizations_status_check;
ALTER TABLE partner_organizations ADD CONSTRAINT partner_organizations_status_check
  CHECK (status IN ('pending', 'active', 'suspended', 'denied'));
