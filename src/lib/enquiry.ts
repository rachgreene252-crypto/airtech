import { z } from "zod";

export const intentOptions = [
  { value: "hvac", label: "HVAC" },
  { value: "electrical", label: "Electrical" },
  { value: "plumbing", label: "Plumbing & Public Health" },
  { value: "fire", label: "Fire Protection & Fire Alarm" },
  { value: "elv", label: "ELV / Security / IT" },
  { value: "bms", label: "BMS / Systems Integration" },
  { value: "advisory", label: "Engineering / Advisory" },
  { value: "full-mep", label: "Full MEP / integrated delivery" },
  { value: "amc-service", label: "AMC / Service & Support" },
] as const;

export const projectStageOptions = [
  { value: "planning", label: "Planning / concept" },
  { value: "design", label: "Design" },
  { value: "tender", label: "Tender / procurement" },
  { value: "construction", label: "Under construction" },
  { value: "operational", label: "Operational (existing building)" },
] as const;

export const enquirySchema = z.object({
  intent: z
    .array(z.enum(intentOptions.map((o) => o.value) as [string, ...string[]]))
    .min(1, "Choose at least one option."),
  name: z.string().min(2, "Enter your name"),
  company: z.string().min(1, "Enter your company or organisation"),
  designation: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(6, "Enter a phone number"),
  projectName: z.string().optional(),
  location: z.string().optional(),
  industry: z.string().optional(),
  projectStage: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
