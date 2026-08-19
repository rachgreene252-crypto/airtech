"use server";

import { enquirySchema, type EnquiryInput } from "@/lib/enquiry";

export interface SubmitEnquiryResult {
  ok: boolean;
  error?: string;
}

const MAX_ATTACHMENT_BYTES = 12 * 1024 * 1024; // leaves headroom under the 15mb server-action body limit

/**
 * Delivers a qualified enquiry, including any attached drawings/documents.
 * No CRM/email provider has been confirmed by Airtech yet (see
 * docs/OPEN_DECISIONS.md #7) — rather than hardcode a specific vendor SDK,
 * this posts to a generic LEAD_WEBHOOK_URL if one is configured (works with
 * Zapier/Make/a custom endpoint/email-via-webhook services alike), with
 * attachments forwarded as base64 in the same JSON payload — the
 * interoperable shape for a generic inbound webhook. Until LEAD_WEBHOOK_URL
 * is set, submissions (and attachment metadata only, not file bytes, to
 * keep server logs small) are logged server-side.
 *
 * This does not persist files anywhere — there is no storage backend yet
 * (Supabase Storage is the planned destination, see
 * architecture-supabase-migration in project memory, still gated on the
 * client decision form). Once that lands, this should write to a
 * `enquiry-attachments` bucket instead of/as well as forwarding to the
 * webhook.
 */
export async function submitEnquiry(input: EnquiryInput, files: File[]): Promise<SubmitEnquiryResult> {
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please check the highlighted fields." };
  }

  const totalBytes = files.reduce((sum, f) => sum + f.size, 0);
  if (totalBytes > MAX_ATTACHMENT_BYTES) {
    return { ok: false, error: "Attachments are too large — please keep the total under 12MB, or email larger files directly." };
  }

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const attachments = await Promise.all(
        files.map(async (file) => ({
          filename: file.name,
          contentType: file.type || "application/octet-stream",
          sizeBytes: file.size,
          contentBase64: Buffer.from(await file.arrayBuffer()).toString("base64"),
        }))
      );

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          attachments,
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
    console.info(
      "[enquiry] LEAD_WEBHOOK_URL not configured — logging enquiry only:",
      parsed.data,
      "attachments:",
      files.map((f) => ({ name: f.name, size: f.size, type: f.type }))
    );
  }

  return { ok: true };
}
