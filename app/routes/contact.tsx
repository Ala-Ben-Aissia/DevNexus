import { InputField } from "~/components/InputField";
import type { Route } from "./+types/contact";
import { z } from "zod";
import { Form } from "react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// Schema with detailed error messages
const formSchema = z.object({
  fullName: z
    .string()
    .min(5, "Full name must be at least 5 characters")
    .max(50, "Full name must not exceed 50 characters")
    .trim(),
  email: z.email("Please enter a valid email address").trim().toLowerCase(),
  subject: z.string().trim().optional(),
  body: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(1000, "Message must not exceed 1000 characters")
    .trim(),
});

type FormData = z.infer<typeof formSchema>;

type ActionResponse =
  | { success: true; message: string; data: FormData }
  | { success: false; message: string; field?: string };

export function meta({}: Route.MetaArgs) {
  const title = "Dev Nexus | Contact";
  return [
    { title: "Dev Nexus | Contact" },
    {
      name: "description",
      content:
        "Get in touch with me for collaboration opportunities, project inquiries, or just to say hello.",
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content:
        "Get in touch with me for collaboration opportunities, project inquiries, or just to say hello.",
    },
    {
      property: "og:url",
      content: "https://devnexus.vercel.app/contact",
    },
    {
      property: "twitter:title",
      content: title,
    },
    {
      property: "twitter:description",
      content:
        "Get in touch with me for collaboration opportunities, project inquiries, or just to say hello.",
    },
  ];
}

export async function action({
  request,
}: Route.ActionArgs): Promise<ActionResponse> {
  const formData = await request.formData();

  const rawData = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    body: formData.get("body"),
  };

  const result = formSchema.safeParse(rawData);

  if (result.success) {
    // TODO: Send email or save to database here
    return {
      success: true,
      message: "Your message has been sent successfully!",
      data: result.data,
    };
  }

  // Extract first validation error
  const firstError = result.error.issues[0];
  return {
    success: false,
    message: firstError.message,
    field: firstError.path[0]?.toString(),
  };
}

export default function ContactPage({ actionData }: Route.ComponentProps) {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (actionData) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [actionData]);

  return (
    <div className="space-y-12 lg:space-y-16">
      {/* Header Section */}
      <div className="text-center space-y-6 animate-fade-in-up">
        <h1 className="text-fluid-4xl lg:text-fluid-6xl font-thin text-[var(--color-text)] tracking-tight">
          Get In{" "}
          <span className="font-normal text-[var(--color-text)] relative">
            Touch
            <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[var(--color-accent)] opacity-20"></div>
          </span>
        </h1>
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mx-auto"></div>
        <p className="text-fluid-base text-[var(--color-text-light)] max-w-2xl mx-auto leading-relaxed">
          I'm always interested in new opportunities and exciting projects.
          Let's discuss how we can bring your ideas to life.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
        {/* Contact Info */}
        <div
          className="lg:col-span-2 space-y-8 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-3xl border border-[var(--color-border)] p-8 lg:p-10 hover-lift relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5"></div>
            <div className="relative z-10 space-y-8">
              <div>
                <h3 className="text-fluid-xl lg:text-fluid-2xl font-thin text-[var(--color-text)] mb-4 tracking-tight">
                  Let's <span className="font-normal">Connect</span>
                </h3>
                <p className="text-fluid-base text-[var(--color-text-light)] leading-relaxed">
                  Whether you have a project in mind or just want to chat about
                  technology, I'm here to help.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[var(--color-tertiary)] rounded-2xl border border-[var(--color-border)] flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-[var(--color-text-light)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[var(--color-text)] font-medium text-fluid-base">
                      Email
                    </p>
                    <p className="text-[var(--color-text-light)] text-fluid-sm">
                      hello@devnexus.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[var(--color-tertiary)] rounded-2xl border border-[var(--color-border)] flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-[var(--color-text-light)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[var(--color-text)] font-medium text-fluid-base">
                      Response Time
                    </p>
                    <p className="text-[var(--color-text-light)] text-fluid-sm">
                      Within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[var(--color-tertiary)] rounded-2xl border border-[var(--color-border)] flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-[var(--color-text-light)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[var(--color-text)] font-medium text-fluid-base">
                      Location
                    </p>
                    <p className="text-[var(--color-text-light)] text-fluid-sm">
                      Available Worldwide
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--color-border)]">
                <p className="text-fluid-sm text-[var(--color-text-light)] leading-relaxed">
                  Prefer a different platform? Find me on{" "}
                  <a
                    href="#"
                    className="text-[var(--color-text)] hover:text-[var(--color-text)] underline decoration-[var(--color-accent)] underline-offset-4 transition-colors duration-300"
                  >
                    LinkedIn
                  </a>{" "}
                  or{" "}
                  <a
                    href="#"
                    className="text-[var(--color-text)] hover:text-[var(--color-text)] underline decoration-[var(--color-accent)] underline-offset-4 transition-colors duration-300"
                  >
                    GitHub
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div
          className="lg:col-span-3 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-3xl border border-[var(--color-border)] p-8 lg:p-10 hover-lift relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5"></div>
            <div className="relative z-10">
              <div className="mb-8 lg:mb-10">
                <h2 className="text-fluid-xl lg:text-fluid-2xl font-thin text-[var(--color-text)] mb-4 tracking-tight">
                  Send a <span className="font-normal">Message</span>
                </h2>
                <p className="text-fluid-base text-[var(--color-text-light)] leading-relaxed">
                  Fill out the form below and I'll get back to you as soon as
                  possible.
                </p>
              </div>

              {/* Success/Error Messages */}
              <AnimatePresence>
                {actionData && showMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`mb-8 p-6 rounded-2xl border transition-all duration-300 ${
                      actionData.success
                        ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300"
                        : "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300"
                    }`}
                    role="alert"
                  >
                    <div className="flex items-center gap-3">
                      {actionData.success ? (
                        <svg
                          className="h-6 w-6 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg
                          className="h-6 w-6 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      <p className="text-fluid-base font-medium">
                        {actionData.message}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Form method="post" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <InputField
                      type="text"
                      name="fullName"
                      label="Full Name *"
                      required
                      placeholder="John Doe"
                      className="w-full px-6 py-5 border-2 border-[var(--color-border)] rounded-2xl bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] text-[var(--color-text)] placeholder-[var(--color-text-light)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-0 focus:shadow-lg transition-all duration-500 text-fluid-base hover:border-[var(--color-accent)] hover:shadow-md gpu-accelerated"
                    />
                    {!actionData?.success &&
                      actionData?.field === "fullName" && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-fluid-sm mt-2 font-medium"
                        >
                          {actionData.message}
                        </motion.p>
                      )}
                  </div>

                  <div>
                    <InputField
                      type="email"
                      name="email"
                      label="Email *"
                      required
                      placeholder="john@example.com"
                      className="w-full px-6 py-5 border-2 border-[var(--color-border)] rounded-2xl bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] text-[var(--color-text)] placeholder-[var(--color-text-light)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-0 focus:shadow-lg transition-all duration-500 text-fluid-base hover:border-[var(--color-accent)] hover:shadow-md gpu-accelerated"
                    />
                    {!actionData?.success && actionData?.field === "email" && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-fluid-sm mt-2 font-medium"
                      >
                        {actionData.message}
                      </motion.p>
                    )}
                  </div>
                </div>

                <div>
                  <InputField
                    type="text"
                    name="subject"
                    label="Subject"
                    placeholder="What's this about?"
                    className="w-full px-6 py-5 border-2 border-[var(--color-border)] rounded-2xl bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] text-[var(--color-text)] placeholder-[var(--color-text-light)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-0 focus:shadow-lg transition-all duration-500 text-fluid-base hover:border-[var(--color-accent)] hover:shadow-md gpu-accelerated"
                  />
                  {!actionData?.success && actionData?.field === "subject" && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-fluid-sm mt-2 font-medium"
                    >
                      {actionData.message}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="body"
                    className="block text-fluid-base font-medium tracking-wide text-[var(--color-text)] mb-3"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      name="body"
                      id="body"
                      rows={6}
                      required
                      placeholder="Tell me about your project or idea... (minimum 20 characters)"
                      className="w-full px-6 py-5 border-2 border-[var(--color-border)] rounded-2xl bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] text-[var(--color-text)] placeholder-[var(--color-text-light)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-0 focus:shadow-lg transition-all duration-500 text-fluid-base hover:border-[var(--color-accent)] hover:shadow-md gpu-accelerated resize-none"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] opacity-0 hover:opacity-5 focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {!actionData?.success && actionData?.field === "body" && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-fluid-sm mt-2 font-medium"
                    >
                      {actionData.message}
                    </motion.p>
                  )}
                </div>

                <button
                  type="submit"
                  className="group w-full px-8 py-5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-text)] font-medium rounded-2xl transition-all duration-500 hover-lift text-fluid-base relative overflow-hidden border border-[var(--color-accent)] hover:border-[var(--color-accent-hover)] focus:outline-none focus:ring-4 focus:ring-[var(--color-accent)]/20"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Send Message
                    <svg
                      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
