-- Ensure RLS is enabled on partner_users table
-- (It may have been disabled during debugging)
ALTER TABLE partner_users ENABLE ROW LEVEL SECURITY;
