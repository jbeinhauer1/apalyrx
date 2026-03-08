-- Change partner_code from varchar(4) to varchar(50) for slug-based codes
ALTER TABLE partner_organizations ALTER COLUMN partner_code TYPE varchar(50);
