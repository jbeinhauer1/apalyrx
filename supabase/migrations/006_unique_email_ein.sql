-- Prevent duplicate partner signups by email or EIN
ALTER TABLE partner_users
  ADD CONSTRAINT partner_users_email_unique UNIQUE (email);

ALTER TABLE partner_organizations
  ADD CONSTRAINT partner_orgs_ein_unique UNIQUE (ein);
