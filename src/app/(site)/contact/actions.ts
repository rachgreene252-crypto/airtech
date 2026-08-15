"use server";

import { enquirySchema, type EnquiryInput } from "@/lib/enquiry";

export interface SubmitEnquiryResult {
  ok: boolean;
  error?: string;
}

/**
 * Delivers a qualified enquiry. No CRM/email provider has been confirmed by
 * Airtech yet (see docs/OPEN_DECISIONS.md #7) — rather than hardcode a
 * specific vendor SDK, this posts to a generic LEAD_WEBHOOK_URL if one is
 * configured (works with Zapier/Make/a custom endpoint/email-via-webhook
 * services alike). Until that env var is set, submissions are logged
 * server-side only. Wiring a real destination is a config change, not a
 * rebuild.
 */
export async function submitEnquiry(input: EnquiryInput): Promise<SubmitEnquiryResult> {
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please check the highlighted fields." };
  }

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          submittedAt: new Date().toISOString(),
          source: "airtech.com.np/contact",
        }),
      });
      if (!response.ok) {
        console.error("Lead webhook responded with", response.status);
        return { ok: false, error: "Something went wrong sending your enquiry. Please email us directly." };
      }
    } catch (err) {
      console.error("Lead webhook delivery failed", err);
      return { ok: false, error: "Something went wrong sending your enquiry. Please email us directly." };
    }
  } else {
    console.info("[enquiry] LEAD_WEBHOOK_URL not configured — logging enquiry only:", parsed.data);
  }

  return { ok: true };
}
