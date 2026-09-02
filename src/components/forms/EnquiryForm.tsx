"use client";

import { useRef, useState, useTransition } from "react";
import { intentOptions, projectStageOptions, enquirySchema, type EnquiryInput } from "@/lib/enquiry";
import { submitEnquiry } from "@/app/(site)/contact/actions";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { Industry } from "@/content/types";

// What you need -> Contact -> Project -> Documents -> Done. Step 0 is a
// multi-select checkbox group (spec §8.2) — a project can span more than
// one discipline, so a single radio choice was under-representing what
// visitors actually needed to tell Airtech.
const STEPS = ["What you need", "Contact", "Project", "Documents", "Done"] as const;

const MAX_TOTAL_BYTES = 12 * 1024 * 1024;

const emptyForm: EnquiryInput = {
  intent: [],
  name: "",
  company: "",
  designation: "",
  email: "",
  phone: "",
  projectName: "",
  location: "",
  industry: "",
  projectStage: "",
  budget: "",
  message: "",
};

export function EnquiryForm({ industries }: { industries: Industry[] }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<EnquiryInput>(emptyForm);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const formTopRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function update<K extends keyof EnquiryInput>(key: K, value: EnquiryInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleIntent(value: string) {
    setForm((f) => ({
      ...f,
      intent: f.intent.includes(value) ? f.intent.filter((v) => v !== value) : [...f.intent, value],
    }));
  }

  function goToStep(next: number) {
    setStep(next);
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function validateStep(current: number): boolean {
    const nextErrors: Record<string, string> = {};
    if (current === 0 && form.intent.length === 0) nextErrors.intent = "Choose at least one option to continue.";
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

  function addFiles(list: FileList | null) {
    if (!list || list.length === 0) return;
    const incoming = Array.from(list);
    const combined = [...files, ...incoming];
    const totalBytes = combined.reduce((sum, f) => sum + f.size, 0);
    if (totalBytes > MAX_TOTAL_BYTES) {
      setFileError("Total attachments must stay under 12MB. Remove a file or email larger drawings directly.");
      return;
    }
    setFileError(null);
    setFiles(combined);
  }

  function removeFile(index: number) {
    setFiles((f) => f.filter((_, i) => i !== index));
    setFileError(null);
  }

  function handleSubmit() {
    const parsed = enquirySchema.safeParse(form);
    if (!parsed.success) {
      setSubmitError("Please check the earlier steps: some required details are missing.");
      return;
    }
    setSubmitError(null);
    startTransition(async () => {
      const result = await submitEnquiry(parsed.data, files);
      if (result.ok) {
        goToStep(4);
      } else {
        setSubmitError(result.error ?? "Something went wrong. Please try again or email us directly.");
      }
    });
  }

  return (
    <div ref={formTopRef}>
      <ol className="flex flex-wrap gap-x-6 gap-y-2 mb-10 font-sans text-label">
        {STEPS.map((label, i) => (
          <li
            key={label}
            className={cn(
              "flex items-center gap-2",
              i === step ? "text-(--color-ink)" : "text-(--color-steel)"
            )}
          >
            <span
              className={cn(
                "flex h-5 w-5 items-center justify-center border text-[10px]",
                i === step
                  ? "border-(--color-brand-blue) text-(--color-brand-blue)"
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
          <legend className="font-display text-2xl font-semibold mb-6">What do you need?</legend>
          <div role="group" aria-label="What do you need">
            {intentOptions.map((opt) => {
              const checked = form.intent.includes(opt.value);
              return (
                <label
                  key={opt.value}
                  className={cn(
                    "flex min-h-14 cursor-pointer items-center gap-4 border-t border-(--color-line) py-4 pl-4 text-base transition-colors first:border-t-0 hover:bg-(--color-paper-raised)",
                    checked && "border-l-2 border-l-(--color-brand-blue) bg-(--color-paper-raised)"
                  )}
                >
                  <input
                    type="checkbox"
                    name="intent"
                    value={opt.value}
                    checked={checked}
                    onChange={() => toggleIntent(opt.value)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center border",
                      checked ? "border-(--color-brand-blue) bg-(--color-brand-blue)" : "border-(--color-line-strong)"
                    )}
                  >
                    {checked && <span className="h-1.5 w-1.5 bg-white" />}
                  </span>
                  {opt.label}
                </label>
              );
            })}
          </div>
          {errors.intent && <p className="mt-3 text-sm text-(--color-brand-blue)" role="alert">{errors.intent}</p>}
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
            <Field label="Budget" optional>
              <input
                type="text"
                value={form.budget}
                onChange={(e) => update("budget", e.target.value)}
                placeholder="Approximate range, if known"
                className={inputClass}
              />
            </Field>
          </div>
          <div className="mt-5">
            <Field label="Requirements" optional>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Scope, timeline, or any specific technical constraints."
                className={inputClass}
              />
            </Field>
          </div>
          <StepNav onBack={() => goToStep(1)} onNext={() => goToStep(3)} />
        </fieldset>
      )}

      {step === 3 && (
        <fieldset>
          <legend className="font-display text-2xl font-semibold mb-6">Documents</legend>
          <p className="text-sm text-(--color-steel)">
            Drawings, specifications or any reference documents (optional, up to 12MB total).
          </p>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-5 flex min-h-14 w-full items-center justify-center border border-dashed border-(--color-line-strong) py-8 text-sm text-(--color-steel) hover:border-(--color-brand-blue) hover:text-(--color-brand-blue) transition-colors"
          >
            Click to attach files
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = "";
            }}
            className="sr-only"
          />

          {fileError && (
            <p className="mt-3 text-sm text-(--color-brand-blue)" role="alert">
              {fileError}
            </p>
          )}

          {files.length > 0 && (
            <ul className="mt-5">
              {files.map((file, i) => (
                <li
                  key={`${file.name}-${i}`}
                  className="flex items-center justify-between gap-4 border-t border-(--color-line) py-3 text-sm first:border-t-0"
                >
                  <span className="truncate text-(--color-ink)">{file.name}</span>
                  <span className="shrink-0 text-(--color-steel)">{formatBytes(file.size)}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="shrink-0 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue) hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          {submitError && (
            <p className="mt-4 text-sm text-(--color-brand-blue)" role="alert">
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
        <div className="border-t border-(--color-line) pt-10 text-center">
          <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">Enquiry received</p>
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

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const inputClass =
  "w-full border border-(--color-line-strong) bg-(--color-paper-raised) px-3.5 py-2.5 text-(--color-ink) focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--color-brand-blue)";

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
      <span className="block font-sans text-label font-medium text-(--color-steel) mb-1.5">
        {label} {optional && <span className="text-(--color-steel)">(optional)</span>}
      </span>
      {children}
      {error && (
        <span className="mt-1.5 block text-sm text-(--color-brand-blue)" role="alert">
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
