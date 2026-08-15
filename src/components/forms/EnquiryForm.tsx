"use client";

import { useRef, useState, useTransition } from "react";
import { intentOptions, projectStageOptions, enquirySchema, type EnquiryInput } from "@/lib/enquiry";
import { submitEnquiry } from "@/app/(site)/contact/actions";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { Industry } from "@/content/types";

const STEPS = ["Intent", "Your details", "Project details", "Notes", "Done"] as const;

const emptyForm: EnquiryInput = {
  intent: "",
  name: "",
  company: "",
  designation: "",
  email: "",
  phone: "",
  projectName: "",
  location: "",
  industry: "",
  projectStage: "",
  message: "",
};

export function EnquiryForm({ industries }: { industries: Industry[] }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<EnquiryInput>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const formTopRef = useRef<HTMLDivElement>(null);

  function update<K extends keyof EnquiryInput>(key: K, value: EnquiryInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function goToStep(next: number) {
    setStep(next);
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function validateStep(current: number): boolean {
    const nextErrors: Record<string, string> = {};
    if (current === 0 && !form.intent) nextErrors.intent = "Choose one option to continue.";
    if (current === 1) {
      if (form.name.trim().length < 2) nextErrors.name = "Enter your name.";
      if (!form.company.trim()) nextErrors.company = "Enter your company or organisation.";
      if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Enter a valid email address.";
      if (form.phone.trim().length < 6) nextErrors.phone = "Enter a phone number.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleNext() {
    if (!validateStep(step)) return;
    goToStep(step + 1);
  }

  function handleSubmit() {
    const parsed = enquirySchema.safeParse(form);
    if (!parsed.success) {
      setSubmitError("Please check the earlier steps — some required details are missing.");
      return;
    }
    setSubmitError(null);
    startTransition(async () => {
      const result = await submitEnquiry(parsed.data);
      if (result.ok) {
        goToStep(4);
      } else {
        setSubmitError(result.error ?? "Something went wrong. Please try again or email us directly.");
      }
    });
  }

  return (
    <div ref={formTopRef}>
      <ol className="flex flex-wrap gap-x-6 gap-y-2 mb-10 font-mono text-xs tracking-[0.06em] uppercase">
        {STEPS.map((label, i) => (
          <li
            key={label}
            className={cn(
              "flex items-center gap-2",
              i === step ? "text-(--color-ink)" : "text-(--color-steel-soft)"
            )}
          >
            <span
              className={cn(
                "flex h-5 w-5 items-center justify-center border text-[10px]",
                i === step
                  ? "border-(--color-signal) text-(--color-signal)"
                  : i < step
                    ? "border-(--color-ink) bg-(--color-ink) text-(--color-paper)"
                    : "border-(--color-line-strong)"
              )}
            >
              {i < step ? "✓" : i + 1}
            </span>
            {label}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <fieldset>
          <legend className="font-display text-2xl font-semibold mb-6">What are you working on?</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {intentOptions.map((opt) => (
              <label
                key={opt.value}
                className={cn(
                  "cursor-pointer border p-4 text-sm transition-colors",
                  form.intent === opt.value
                    ? "border-(--color-ink) bg-(--color-paper-raised)"
                    : "border-(--color-line-strong) hover:border-(--color-ink)"
                )}
              >
                <input
                  type="radio"
                  name="intent"
                  value={opt.value}
                  checked={form.intent === opt.value}
                  onChange={() => update("intent", opt.value)}
                  className="sr-only"
                />
                {opt.label}
              </label>
            ))}
          </div>
          {errors.intent && <p className="mt-3 text-sm text-(--color-signal)" role="alert">{errors.intent}</p>}
          <div className="mt-8">
            <Button type="button" onClick={handleNext} size="lg">
              Continue
            </Button>
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <fieldset>
          <legend className="font-display text-2xl font-semibold mb-6">Your details</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Full name" error={errors.name}>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Company / organisation" error={errors.company}>
              <input
                type="text"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Designation" optional>
              <input
                type="text"
                value={form.designation}
                onChange={(e) => update("designation", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Email" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Phone" error={errors.phone}>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>
          <StepNav onBack={() => goToStep(0)} onNext={handleNext} />
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
          <legend className="font-display text-2xl font-semibold mb-6">Project details</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Project name" optional>
              <input
                type="text"
                value={form.projectName}
                onChange={(e) => update("projectName", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Location" optional>
              <input
                type="text"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Industry" optional>
              <select
                value={form.industry}
                onChange={(e) => update("industry", e.target.value)}
                className={inputClass}
              >
                <option value="">Select an industry</option>
                {industries.map((i) => (
                  <option key={i.slug} value={i.slug}>
                    {i.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Project stage" optional>
              <select
                value={form.projectStage}
                onChange={(e) => update("projectStage", e.target.value)}
                className={inputClass}
              >
                <option value="">Select a stage</option>
                {projectStageOptions.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <StepNav onBack={() => goToStep(1)} onNext={() => goToStep(3)} />
        </fieldset>
      )}

      {step === 3 && (
        <fieldset>
          <legend className="font-display text-2xl font-semibold mb-6">Anything else?</legend>
          <Field label="Message" optional>
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Tell us more about the requirement — scope, timeline, or any specific technical constraints."
              className={inputClass}
            />
          </Field>
          <p className="mt-3 text-sm text-(--color-steel)">
            Have drawings or documents to share? Reply with them once we&apos;re in touch by email.
          </p>
          {submitError && (
            <p className="mt-4 text-sm text-(--color-signal)" role="alert">
              {submitError}
            </p>
          )}
          <div className="mt-8 flex gap-4">
            <Button type="button" variant="secondary" onClick={() => goToStep(2)}>
              Back
            </Button>
            <Button type="button" onClick={handleSubmit} disabled={isPending} size="lg">
              {isPending ? "Sending…" : "Send enquiry"}
            </Button>
          </div>
        </fieldset>
      )}

      {step === 4 && (
        <div className="crop-frame border border-(--color-line) p-10 text-center">
          <p className="font-mono text-xs tracking-[0.14em] uppercase text-(--color-signal)">Enquiry received</p>
          <h2 className="mt-4 font-display text-3xl font-semibold">
            Thanks, {form.name.split(" ")[0] || "there"}.
          </h2>
          <p className="mt-3 text-(--color-steel) max-w-md mx-auto">
            Our engineering team will review your enquiry and respond within one business day.
          </p>
        </div>
      )}
    </div>
  );
}

const inputClass =
  "w-full border border-(--color-line-strong) bg-(--color-paper-raised) px-3.5 py-2.5 text-(--color-ink) focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--color-signal)";

function Field({
  label,
  optional,
  error,
  children,
}: {
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block font-mono text-[11px] tracking-[0.08em] uppercase text-(--color-steel) mb-1.5">
        {label} {optional && <span className="normal-case text-(--color-steel-soft)">(optional)</span>}
      </span>
      {children}
      {error && (
        <span className="mt-1.5 block text-sm text-(--color-signal)" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}

function StepNav({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="mt-8 flex gap-4">
      <Button type="button" variant="secondary" onClick={onBack}>
        Back
      </Button>
      <Button type="button" onClick={onNext} size="lg">
        Continue
      </Button>
    </div>
  );
}
