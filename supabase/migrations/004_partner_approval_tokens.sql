-- Add approval token columns to partner_organizations
-- for one-click approve/deny from email without login
ALTER TABLE partner_organizations
  ADD COLUMN IF NOT EXISTS approval_token text UNIQUE,
  ADD COLUMN IF NOT EXISTS approval_token_expires_at timestamptz;

CREATE INDEX IF NOT EXISTS idx_partner_orgs_approval_token
  ON partner_organizations(approval_token);
