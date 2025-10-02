import { InputField } from "~/components/InputField";
import type { Route } from "./+types/contact";
import { z } from "zod";
import { useEffect, useState } from "react";

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

// export async function action({
//   request,
// }: Route.ActionArgs): Promise<ActionResponse> {
//   const formData = await request.formData();

//   const rawData = {
//     fullName: formData.get("fullName"),
//     email: formData.get("email"),
//     subject: formData.get("subject"),
//     body: formData.get("body"),
//   };

//   const result = formSchema.safeParse(rawData);

//   if (result.success) {
//     // TODO: Send email or save to database here
//     return {
//       success: true,
//       message: "Your message has been sent successfully!",
//       data: result.data,
//     };
//   }

//   // Extract first validation error
//   const firstError = result.error.issues[0];
//   return {
//     success: false,
//     message: firstError.message,
//     field: firstError.path[0]?.toString(),
//   };
// }

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
      <div className="text-center space-y-6 animate-fade-in-up relative">
        {/* Availability badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-300/20 dark:to-emerald-300/20 border border-green-200 dark:border-green-800 rounded-full text-fluid-sm font-medium mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Currently accepting new projects
        </div>

        <h1 className="text-fluid-4xl lg:text-fluid-6xl font-light text-[var(--color-text)] tracking-tight">
          Let's Work{" "}
          <span className="font-medium text-[var(--color-text)] relative">
            Together
            <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[var(--color-accent)] opacity-20"></div>
          </span>
        </h1>
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mx-auto"></div>
        <p className="text-fluid-base text-[var(--color-text-light)] max-w-2xl mx-auto leading-relaxed font-normal">
          Ready to turn your vision into reality? I'm here to help you build
          something extraordinary. Let's start the conversation.
        </p>

        {/* Response time stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
          <div className="text-center">
            <div className="text-fluid-lg font-semibold text-[var(--color-text)]">
              &lt;24h
            </div>
            <div className="text-fluid-sm text-[var(--color-text-light)]">
              Response time
            </div>
          </div>
          <div className="hidden sm:block w-px h-6 bg-[var(--color-border)]"></div>
          <div className="text-center">
            <div className="text-fluid-lg font-semibold text-[var(--color-text)]">
              Free
            </div>
            <div className="text-fluid-sm text-[var(--color-text-light)]">
              Initial consultation
            </div>
          </div>
          <div className="hidden sm:block w-px h-6 bg-[var(--color-border)]"></div>
          <div className="text-center">
            <div className="text-fluid-lg font-semibold text-[var(--color-text)]">
              Flexible
            </div>
            <div className="text-fluid-sm text-[var(--color-text-light)]">
              Engagement models
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <div className="text-center mb-12">
          <h2 className="text-fluid-2xl lg:text-fluid-3xl font-light text-[var(--color-text)] mb-4 tracking-tight">
            Frequently Asked <span className="font-medium">Questions</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {[
            {
              question: "What's your typical project timeline?",
              answer:
                "Most projects take 2-8 weeks depending on complexity. I'll provide a detailed timeline during our initial consultation.",
            },
            {
              question: "Do you offer ongoing support?",
              answer:
                "Yes! I provide 30 days of free support post-launch, with flexible maintenance packages available.",
            },
            {
              question: "What technologies do you work with?",
              answer:
                "I specialize in React, Next.js, Node.js, TypeScript, and modern web technologies. Full tech stack available on my about page.",
            },
            {
              question: "How do you handle project communication?",
              answer:
                "Regular updates via email, video calls for important milestones, and shared project dashboard for real-time progress tracking.",
            },
          ].map((faq, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-2xl border border-[var(--color-border)] p-6 hover-lift relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5"></div>
              <div className="relative z-10">
                <h4 className="text-fluid-base font-semibold text-[var(--color-text)] mb-3">
                  {faq.question}
                </h4>
                <p className="text-fluid-sm text-[var(--color-text-light)] leading-relaxed font-normal">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
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
                <h3 className="text-fluid-xl lg:text-fluid-2xl font-light text-[var(--color-text)] mb-4 tracking-tight">
                  Let's <span className="font-medium">Connect</span>
                </h3>
                <p className="text-fluid-base text-[var(--color-text-light)] leading-relaxed font-normal">
                  Ready to discuss your project? I'm here to help you build
                  something amazing. Let's explore the possibilities together.
                </p>
              </div>

              {/* Project types */}
              <div>
                <h4 className="text-fluid-base font-semibold text-[var(--color-text)] mb-4">
                  Perfect for:
                </h4>
                <div className="space-y-3">
                  {[
                    "🚀 Startup MVPs & Product launches",
                    "🏢 Business websites & Applications",
                    "🛒 E-commerce & Online stores",
                    "📱 Progressive Web Apps",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-fluid-sm text-[var(--color-text-light)]"
                    >
                      <div className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
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
                    <p className="text-[var(--color-text)] font-semibold text-fluid-base">
                      Email
                    </p>
                    <p className="text-[var(--color-text-light)] text-fluid-sm font-medium">
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
                    <p className="text-[var(--color-text)] font-semibold text-fluid-base">
                      Response Time
                    </p>
                    <p className="text-[var(--color-text-light)] text-fluid-sm font-medium">
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
                    <p className="text-[var(--color-text)] font-semibold text-fluid-base">
                      Location
                    </p>
                    <p className="text-[var(--color-text-light)] text-fluid-sm font-medium">
                      Available Worldwide
                    </p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="pt-6 border-t border-[var(--color-border)]">
                <h4 className="text-fluid-sm font-semibold text-[var(--color-text)] mb-4">
                  Connect on social platforms
                </h4>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-10 h-10 bg-[var(--color-tertiary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] rounded-xl flex items-center justify-center text-[var(--color-text-light)] hover:text-[var(--color-text)] transition-all duration-300 hover-lift"
                    title="LinkedIn"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-[var(--color-tertiary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] rounded-xl flex items-center justify-center text-[var(--color-text-light)] hover:text-[var(--color-text)] transition-all duration-300 hover-lift"
                    title="GitHub"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-[var(--color-tertiary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] rounded-xl flex items-center justify-center text-[var(--color-text-light)] hover:text-[var(--color-text)] transition-all duration-300 hover-lift"
                    title="Twitter"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                </div>
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
                <h2 className="text-fluid-xl lg:text-fluid-2xl font-light text-[var(--color-text)] mb-4 tracking-tight">
                  Start Your <span className="font-medium">Project</span>
                </h2>
                <p className="text-fluid-base text-[var(--color-text-light)] leading-relaxed font-normal">
                  Tell me about your project goals and I'll provide a detailed
                  proposal within 24 hours.
                </p>

                {/* Form benefits */}
                <div className="flex flex-wrap gap-4 mt-6">
                  {[
                    "📋 Detailed project proposal",
                    "💰 Transparent pricing",
                    "⚡ Quick turnaround",
                    "🤝 Free consultation call",
                  ].map((benefit, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-tertiary)] border border-[var(--color-border)] rounded-full text-fluid-xs text-[var(--color-text-light)]"
                    >
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>

              {/* Success/Error Messages */}
              {/* <AnimatePresence>
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
                      <p className="text-fluid-base font-semibold">
                        {actionData.message}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence> */}

              {/* <Form */}
              <form
                method="post"
                className="space-y-8"
                action="https://formspree.io/f/mgvnyyvg"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <InputField
                      type="text"
                      name="fullName"
                      label="Full Name *"
                      required
                      placeholder="John Doe"
                      className="w-full px-6 py-5 border-2 border-[var(--color-border)] rounded-2xl bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] text-[var(--color-text)] placeholder-[var(--color-text-light)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-0 focus:shadow-lg transition-all duration-500 text-fluid-base hover:border-[var(--color-accent)] hover:shadow-md gpu-accelerated"
                      min="5"
                      max="50"
                    />
                    {/* {!actionData?.success &&
                      actionData?.field === "fullName" && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-fluid-sm mt-2 font-semibold"
                        >
                          {actionData.message}
                        </motion.p>
                      )} */}
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
                    {/* {!actionData?.success && actionData?.field === "email" && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-fluid-sm mt-2 font-semibold"
                      >
                        {actionData.message}
                      </motion.p>
                    )} */}
                  </div>
                </div>

                <div>
                  <InputField
                    type="text"
                    name="subject"
                    label="Subject"
                    placeholder="What's this about?"
                    max="100"
                    className="w-full px-6 py-5 border-2 border-[var(--color-border)] rounded-2xl bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] text-[var(--color-text)] placeholder-[var(--color-text-light)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-0 focus:shadow-lg transition-all duration-500 text-fluid-base hover:border-[var(--color-accent)] hover:shadow-md gpu-accelerated"
                  />
                  {/* {!actionData?.success && actionData?.field === "subject" && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-fluid-sm mt-2 font-semibold"
                    >
                      {actionData.message}
                    </motion.p>
                  )} */}
                </div>

                <div>
                  <label
                    htmlFor="body"
                    className="block text-fluid-base font-semibold tracking-wide text-[var(--color-text)] mb-3"
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
                      minLength={20}
                      maxLength={1000}
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] opacity-0 hover:opacity-5 focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {/* {!actionData?.success && actionData?.field === "body" && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-fluid-sm mt-2 font-semibold"
                    >
                      {actionData.message}
                    </motion.p>
                  )} */}
                </div>

                <button
                  type="submit"
                  className="group w-full px-8 py-5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-text)] font-semibold rounded-2xl transition-all duration-500 hover-lift text-fluid-base relative overflow-hidden border border-[var(--color-accent)] hover:border-[var(--color-accent-hover)] focus:outline-none focus:ring-4 focus:ring-[var(--color-accent)]/20"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Send Message
                    <svg
                      className="h-5 w-5 rotate-90 transition-transform duration-300 group-hover:translate-x-1"
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
