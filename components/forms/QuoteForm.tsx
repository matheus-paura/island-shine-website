"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, LoaderCircle, Phone } from "lucide-react";
import { siteConfig, telUrl } from "@/config/site";
import { services } from "@/content/services";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type FieldErrors = Partial<
  Record<"name" | "phone" | "service" | "area" | "email", string>
>;
type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full min-h-11 rounded-control border border-sand-200 bg-white px-4 py-3 text-ink-900 placeholder:text-ink-500/60 focus:border-navy-500";

/** Submissions faster than this are treated as bots (timing check). */
const MIN_FILL_TIME_MS = 3000;

function validPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Quote form (Section 8). Short on purpose — every extra field costs
 * submissions. Spam protection is a honeypot + timing check (no CAPTCHA).
 * POSTs JSON to NEXT_PUBLIC_FORM_ENDPOINT; success fires `generate_lead`.
 */
const WINDOW_CLEANING = "Window Cleaning";

export function QuoteForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [selectedService, setSelectedService] = useState("");
  const showWindowFields = selectedService === WINDOW_CLEANING;
  const formStartedRef = useRef(false);
  const mountedAtRef = useRef<number>(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  const fieldId = (name: string) => `${uid}-${name}`;

  const onFormStart = () => {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      track("form_start", { location: "final_cta" });
    }
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();
    const area = String(data.get("area") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const stories = String(data.get("stories") ?? "").trim();
    const windows = String(data.get("windows") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const honeypot = String(data.get("company") ?? "").trim();

    const nextErrors: FieldErrors = {};
    if (!name) nextErrors.name = "Please tell us your name.";
    if (!phone) nextErrors.phone = "We need a phone number to send your quote.";
    else if (!validPhone(phone))
      nextErrors.phone = "That phone number doesn't look right. Please double-check.";
    if (!service) nextErrors.service = "Please pick a service (or choose Other).";
    if (!area) nextErrors.area = "Please tell us your address.";
    if (!email) nextErrors.email = "We need an email to send your quote.";
    else if (!validEmail(email))
      nextErrors.email = "That email doesn't look right. Please double-check.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the first invalid field for keyboard/SR users.
      const first = Object.keys(nextErrors)[0];
      form.querySelector<HTMLElement>(`#${CSS.escape(fieldId(first))}`)?.focus();
      return;
    }

    // Spam checks: honeypot filled or submitted faster than a human could
    // type. Pretend success so bots learn nothing.
    const tooFast = Date.now() - mountedAtRef.current < MIN_FILL_TIME_MS;
    if (honeypot || tooFast) {
      setStatus("success");
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
    setStatus("submitting");

    try {
      if (!endpoint) {
        // TODO: set NEXT_PUBLIC_FORM_ENDPOINT (Formspree / Web3Forms / n8n).
        if (process.env.NODE_ENV === "development") {
          await new Promise((resolve) => setTimeout(resolve, 600));
          console.warn("QuoteForm: NEXT_PUBLIC_FORM_ENDPOINT not set — simulated success.");
        } else {
          throw new Error("Form endpoint not configured");
        }
      } else {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name,
            phone,
            service,
            area,
            email,
            stories: stories || undefined,
            windows: windows || undefined,
            message: message || undefined,
            source: "islandshine.ca quote form",
          }),
        });
        if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`);
      }

      track("generate_lead", { service, area });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-card bg-white p-8 text-center shadow-card-hover"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-success" aria-hidden="true" />
        <h3 className="heading-display mt-4 text-display-3 text-navy-800">
          Thanks! We&apos;ll call you within 24 hours
        </h3>
        <p className="mt-2 text-ink-500">
          Your quote request is in. If it&apos;s urgent, call us right now at{" "}
          <a href={telUrl()} className="font-semibold text-navy-700 underline">
            {siteConfig.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      onFocusCapture={onFormStart}
      noValidate
      className="rounded-card bg-white p-6 shadow-card-hover md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor={fieldId("name")}
            className="mb-1.5 block text-sm font-semibold text-ink-900"
          >
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? fieldId("name-error") : undefined}
            className={cn(inputClasses, errors.name && "border-red-600")}
          />
          {errors.name && (
            <p id={fieldId("name-error")} className="mt-1.5 text-sm text-red-700">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={fieldId("phone")}
            className="mb-1.5 block text-sm font-semibold text-ink-900"
          >
            Phone <span aria-hidden="true">*</span>
          </label>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? fieldId("phone-error") : undefined}
            className={cn(inputClasses, errors.phone && "border-red-600")}
          />
          {errors.phone && (
            <p id={fieldId("phone-error")} className="mt-1.5 text-sm text-red-700">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={fieldId("service")}
            className="mb-1.5 block text-sm font-semibold text-ink-900"
          >
            Service <span aria-hidden="true">*</span>
          </label>
          <select
            id={fieldId("service")}
            name="service"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? fieldId("service-error") : undefined}
            defaultValue=""
            onChange={(e) => setSelectedService(e.target.value)}
            className={cn(inputClasses, errors.service && "border-red-600")}
          >
            <option value="" disabled>
              Choose a service…
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.name}>
                {service.name}
              </option>
            ))}
            <option value="Other">Other / not sure</option>
          </select>
          {errors.service && (
            <p id={fieldId("service-error")} className="mt-1.5 text-sm text-red-700">
              {errors.service}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={fieldId("area")}
            className="mb-1.5 block text-sm font-semibold text-ink-900"
          >
            Address <span aria-hidden="true">*</span>
          </label>
          <input
            id={fieldId("area")}
            name="area"
            type="text"
            placeholder="e.g. 123 Main St, Oak Bay"
            autoComplete="street-address"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.area)}
            aria-describedby={errors.area ? fieldId("area-error") : undefined}
            className={cn(inputClasses, errors.area && "border-red-600")}
          />
          {errors.area && (
            <p id={fieldId("area-error")} className="mt-1.5 text-sm text-red-700">
              {errors.area}
            </p>
          )}
        </div>

        {showWindowFields && (
          <>
            <div>
              <label
                htmlFor={fieldId("stories")}
                className="mb-1.5 block text-sm font-semibold text-ink-900"
              >
                Stories <span className="font-normal text-ink-500">(optional)</span>
              </label>
              <select
                id={fieldId("stories")}
                name="stories"
                defaultValue=""
                className={inputClasses}
              >
                <option value="">Not sure</option>
                <option value="1 storey">1 storey</option>
                <option value="2 storeys">2 storeys</option>
                <option value="3 storeys">3 storeys</option>
                <option value="4+ storeys">4+ storeys</option>
              </select>
            </div>

            <div>
              <label
                htmlFor={fieldId("windows")}
                className="mb-1.5 block text-sm font-semibold text-ink-900"
              >
                Number of windows{" "}
                <span className="font-normal text-ink-500">(optional)</span>
              </label>
              <select
                id={fieldId("windows")}
                name="windows"
                defaultValue=""
                className={inputClasses}
              >
                <option value="">Not sure</option>
                <option value="1-10 windows">1–10</option>
                <option value="11-20 windows">11–20</option>
                <option value="21-30 windows">21–30</option>
                <option value="30-40 windows">30–40</option>
                <option value="50+ windows">50+</option>
              </select>
            </div>
          </>
        )}

        <div>
          <label
            htmlFor={fieldId("email")}
            className="mb-1.5 block text-sm font-semibold text-ink-900"
          >
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? fieldId("email-error") : undefined}
            className={cn(inputClasses, errors.email && "border-red-600")}
          />
          {errors.email && (
            <p id={fieldId("email-error")} className="mt-1.5 text-sm text-red-700">
              {errors.email}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor={fieldId("message")}
            className="mb-1.5 block text-sm font-semibold text-ink-900"
          >
            Anything else? <span className="font-normal text-ink-500">(optional)</span>
          </label>
          <textarea
            id={fieldId("message")}
            name="message"
            rows={3}
            placeholder="e.g. two-storey house, windows + driveway"
            className={inputClasses}
          />
        </div>
      </div>

      {/* Honeypot — hidden from real users, tempting to bots */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={fieldId("company")}>Company (leave this empty)</label>
        <input
          id={fieldId("company")}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 rounded-control bg-red-50 p-3 text-sm text-red-800">
          Something went wrong sending your request. Please try again, or call us
          directly at{" "}
          <a href={telUrl()} className="font-semibold underline">
            {siteConfig.phone}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-control bg-orange-500 px-6 py-3 text-lg font-semibold text-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {status === "submitting" ? (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          "Get my free quote"
        )}
      </button>

      <p className="mt-3 text-center text-sm text-ink-500">
        <Phone className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />
        {siteConfig.responsePromise}, or call{" "}
        <a href={telUrl()} className="font-semibold text-navy-700 underline">
          {siteConfig.phone}
        </a>
      </p>
    </form>
  );
}
