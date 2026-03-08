-- Disease categories
CREATE TABLE diseases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  prevalence_per_1000 DECIMAL(8,4) NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Central drug formulary
CREATE TABLE drugs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ndc VARCHAR(11) UNIQUE NOT NULL,
  brand_name TEXT NOT NULL,
  generic_name TEXT NOT NULL,
  is_biosimilar BOOLEAN NOT NULL DEFAULT false,
  reference_drug_id UUID REFERENCES drugs(id) ON DELETE SET NULL,
  scripts_per_member_month DECIMAL(6,3) NOT NULL DEFAULT 1.0,
  wac_price DECIMAL(12,2),
  avg_pbm_post_rebate DECIMAL(12,2),
  apalyrx_net_price DECIMAL(12,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Drug to disease many-to-many
CREATE TABLE drug_diseases (
  drug_id UUID REFERENCES drugs(id) ON DELETE CASCADE,
  disease_id UUID REFERENCES diseases(id) ON DELETE CASCADE,
  PRIMARY KEY (drug_id, disease_id)
);

-- Named fee schedules
CREATE TABLE fee_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  is_default BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tiered rows per fee schedule (mirrors PAA Attachment A structure)
CREATE TABLE fee_schedule_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fee_schedule_id UUID NOT NULL REFERENCES fee_schedules(id) ON DELETE CASCADE,
  net_cost_min DECIMAL(12,2) NOT NULL,
  net_cost_max DECIMAL(12,2),
  flat_fee DECIMAL(10,2) NOT NULL,
  percent_fee DECIMAL(6,4) NOT NULL,
  vbp_cap DECIMAL(10,2),
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Ensure only one default fee schedule at a time
CREATE UNIQUE INDEX fee_schedules_default_idx
  ON fee_schedules (is_default) WHERE is_default = true;

-- Add fee_schedule_id and customer_agreement_date to leads
ALTER TABLE leads
  ADD COLUMN fee_schedule_id UUID REFERENCES fee_schedules(id),
  ADD COLUMN customer_agreement_date DATE;

-- Seed the Standard fee schedule from PAA Attachment A
INSERT INTO fee_schedules (name, description, is_default, status)
VALUES ('Standard', 'ApalyRx standard fee schedule per PAA Attachment A', true, 'active');

-- Seed standard tiers
WITH fs AS (SELECT id FROM fee_schedules WHERE is_default = true LIMIT 1)
INSERT INTO fee_schedule_tiers
  (fee_schedule_id, net_cost_min, net_cost_max, flat_fee, percent_fee, vbp_cap, sort_order)
VALUES
  ((SELECT id FROM fs), 0,        100.00,   2.00,  0.12,   NULL, 1),
  ((SELECT id FROM fs), 100.01,   400.00,   18.00, 0.08,   NULL, 2),
  ((SELECT id FROM fs), 400.01,   2500.00,  35.00, 0.04,   NULL, 3),
  ((SELECT id FROM fs), 2500.01,  25000.00, 60.00, 0.04,   NULL, 4),
  ((SELECT id FROM fs), 25000.01, NULL,     90.00, 0.04,   1500.00, 5);

-- RLS
ALTER TABLE diseases ENABLE ROW LEVEL SECURITY;
ALTER TABLE drugs ENABLE ROW LEVEL SECURITY;
ALTER TABLE drug_diseases ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_schedule_tiers ENABLE ROW LEVEL SECURITY;

-- diseases: readable by authenticated, writable by apaly team
CREATE POLICY "Authenticated read diseases" ON diseases
  FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Apaly team manage diseases" ON diseases
  FOR ALL USING (is_apaly_team_member() = true);

-- drugs: readable by authenticated, writable by apaly team
CREATE POLICY "Authenticated read drugs" ON drugs
  FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Apaly team manage drugs" ON drugs
  FOR ALL USING (is_apaly_team_member() = true);

-- drug_diseases: readable by authenticated, writable by apaly team
CREATE POLICY "Authenticated read drug_diseases" ON drug_diseases
  FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Apaly team manage drug_diseases" ON drug_diseases
  FOR ALL USING (is_apaly_team_member() = true);

-- fee_schedules: readable by authenticated, writable by super_admin
CREATE POLICY "Authenticated read fee_schedules" ON fee_schedules
  FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Apaly team manage fee_schedules" ON fee_schedules
  FOR ALL USING (is_apaly_team_member() = true);

-- fee_schedule_tiers: readable by authenticated, writable by super_admin
CREATE POLICY "Authenticated read fee_schedule_tiers" ON fee_schedule_tiers
  FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Apaly team manage fee_schedule_tiers" ON fee_schedule_tiers
  FOR ALL USING (is_apaly_team_member() = true);
