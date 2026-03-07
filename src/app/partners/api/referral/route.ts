import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createPartnerAdminClient } from "@/lib/partners/supabase/admin";
import { sendEmail, getNotificationEmails } from "@/lib/partners/emails/send";
import {
  newLeadApprovalEmail,
  leadSubmittedToPartnerEmail,
} from "@/lib/partners/emails/templates";

const baseUrl = "https://www.apalyrx.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      partnerCode,
      companyName,
      ein,
      contactName,
      contactEmail,
      phone,
      estimatedLives,
      message,
    } = body;

    if (!partnerCode || !companyName || !contactName || !contactEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = createPartnerAdminClient();

    // Validate partner
    const { data: org } = await supabase
      .from("partner_organizations")
      .select("id, company_name, notification_email, status")
      .eq("partner_code", partnerCode.toUpperCase())
      .single();

    if (!org || org.status !== "active") {
      return NextResponse.json(
        { error: "Invalid partner code" },
        { status: 400 }
      );
    }

    // Check EIN duplicate
    if (ein) {
      const { data: existingLead } = await supabase
        .from("leads")
        .select("id")
        .eq("prospect_ein", ein)
        .limit(1)
        .single();

      if (existingLead) {
        return NextResponse.json(
          {
            error:
              "This company is already in our system. Please contact your ApalyRx representative.",
          },
          { status: 409 }
        );
      }
    }

    // Generate approval token
    const approvalToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date();
    tokenExpiry.setDate(tokenExpiry.getDate() + 7);

    // Create lead
    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .insert({
        organization_id: org.id,
        submission_source: "referral_link",
        prospect_company_name: companyName,
        prospect_ein: ein || null,
        prospect_contact_name: contactName,
        prospect_contact_email: contactEmail,
        prospect_phone: phone || null,
        prospect_estimated_lives: estimatedLives || null,
        prospect_notes: message || null,
        status: "pending",
        approval_token: approvalToken,
        approval_token_expires_at: tokenExpiry.toISOString(),
      })
      .select("id")
      .single();

    if (leadError) {
      return NextResponse.json({ error: leadError.message }, { status: 500 });
    }

    // Send emails concurrently
    const approveUrl = `${baseUrl}/partners/api/approve/${approvalToken}`;
    const denyUrl = `${baseUrl}/partners/api/deny/${approvalToken}`;

    const notifyEmails = await getNotificationEmails("new_lead");

    const emailPromises: Promise<void>[] = [];

    // Email to ApalyRx team
    if (notifyEmails.length > 0) {
      const approvalEmail = newLeadApprovalEmail({
        companyName,
        ein,
        contactName,
        contactEmail,
        phone,
        estimatedLives,
        message,
        partnerName: org.company_name,
        source: "Referral Link",
        submittedAt: new Date().toLocaleString(),
        approveUrl,
        denyUrl,
      });
      emailPromises.push(
        sendEmail({
          to: notifyEmails,
          subject: approvalEmail.subject,
          html: approvalEmail.html,
        })
      );
    }

    // Email to partner
    if (org.notification_email) {
      const partnerEmail = leadSubmittedToPartnerEmail({
        companyName,
        partnerContactName: org.company_name,
      });
      emailPromises.push(
        sendEmail({
          to: org.notification_email,
          subject: partnerEmail.subject,
          html: partnerEmail.html,
        })
      );
    }

    await Promise.allSettled(emailPromises);

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (err) {
    console.error("Referral submission error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
