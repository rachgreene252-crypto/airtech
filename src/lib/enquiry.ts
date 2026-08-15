import { z } from "zod";

export const intentOptions = [
  { value: "hvac", label: "New project — HVAC" },
  { value: "electrical", label: "New project — Electrical" },
  { value: "full-mep", label: "New project — Full MEP / multiple disciplines" },
  { value: "amc-service", label: "AMC / Service & Support" },
  { value: "consultation", label: "Consultation / advisory" },
] as const;

export const projectStageOptions = [
  { value: "planning", label: "Planning / concept" },
  { value: "design", label: "Design" },
  { value: "tender", label: "Tender / procurement" },
  { value: "construction", label: "Under construction" },
  { value: "operational", label: "Operational (existing building)" },
] as const;

export const enquirySchema = z.object({
  intent: z.enum(intentOptions.map((o) => o.value) as [string, ...string[]]),
  name: z.string().min(2, "Enter your name"),
  company: z.string().min(1, "Enter your company or organisation"),
  designation: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(6, "Enter a phone number"),
  projectName: z.string().optional(),
  location: z.string().optional(),
  industry: z.string().optional(),
  projectStage: z.string().optional(),
  message: z.string().optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
