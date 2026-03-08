import { createPartnerAdminClient } from "./supabase/admin";

function companyNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 30);
}

export async function generateUniquePartnerCode(companyName: string): Promise<string> {
  const supabase = createPartnerAdminClient();
  const base = companyNameToSlug(companyName);
  if (!base) throw new Error("Cannot generate partner code from empty company name");

  // Try base slug first, then base-2, base-3, etc.
  for (let i = 0; i < 20; i++) {
    const candidate = i === 0 ? base : `${base}-${i + 1}`;
    const { data } = await supabase
      .from("partner_organizations")
      .select("id")
      .eq("partner_code", candidate)
      .maybeSingle();
    if (!data) return candidate;
  }
  throw new Error("Failed to generate unique partner code after 20 attempts");
}
