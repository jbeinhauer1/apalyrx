import { createPartnerAdminClient } from "./supabase/admin";

const SAFE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no O, 0, I, 1

function generatePartnerCode(): string {
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += SAFE_CHARS[Math.floor(Math.random() * SAFE_CHARS.length)];
  }
  return code;
}

export async function generateUniquePartnerCode(): Promise<string> {
  const supabase = createPartnerAdminClient();
  for (let attempt = 0; attempt < 10; attempt++) {
    const code = generatePartnerCode();
    const { data } = await supabase
      .from("partner_organizations")
      .select("id")
      .eq("partner_code", code)
      .single();
    if (!data) return code;
  }
  throw new Error("Failed to generate unique partner code after 10 attempts");
}
