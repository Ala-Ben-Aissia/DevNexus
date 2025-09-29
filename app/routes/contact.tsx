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
      message: "✉️ Your Message Has Been Sent!",
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
      const timer = setTimeout(() => setShowMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [actionData]);

  return (
    <div className="mx-auto mt-12 max-w-3xl px-6 py-8 dark:bg-gray-900">
      <h2 className="mb-8 text-center text-3xl font-bold dark:text-white">
        📬 Contact Me
      </h2>

      <AnimatePresence>
        {actionData?.success && showMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`mb-6 rounded-lg border px-4 py-3 text-center border-green-500 bg-green-500/10 text-green-500"
            }`}
            role="alert"
          >
            {actionData.message}
          </motion.div>
        )}
      </AnimatePresence>

      <Form method="post" className="space-y-6">
        <InputField
          type="text"
          name="fullName"
          label="Full Name"
          required
          // minLength={5}
          // maxLength={50}
        />
        {!actionData?.success && actionData?.field === "fullName" && (
          <pre className="text-red-500 text-xs">{actionData.message}</pre>
        )}

        <InputField type="email" name="email" label="Email" required />
        {!actionData?.success && actionData?.field === "email" && (
          <pre className="text-red-500 text-xs">{actionData.message}</pre>
        )}

        <InputField type="text" name="subject" label="Subject" />
        {!actionData?.success && actionData?.field === "subject" && (
          <pre className="text-red-500 text-xs">{actionData.message}</pre>
        )}

        <div>
          <label
            htmlFor="body"
            className="block text-fluid-base font-normal tracking-wide text-[var(--color-text)]"
          >
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            name="body"
            id="body"
            cols={30}
            rows={10}
            required
            // minLength={20}
            // maxLength={1000}
            className="mt-3 w-full rounded border px-4 py-2 text-gray-300 placeholder:text-gray-500 dark:border-gray-700 dark:bg-gray-800"
            placeholder="Please write your message here... (minimum 20 characters)"
          />
          {!actionData?.success && actionData?.field === "body" && (
            <pre className="text-red-500 text-xs">{actionData.message}</pre>
          )}
        </div>

        <button
          type="submit"
          className="mx-auto block w-full cursor-pointer rounded bg-[var(--color-accent)] py-2 transition-colors duration-300 hover:bg-[var(--color-accent-hover)] dark:bg-gray-700 dark:text-white dark:hover:bg-gray-800"
        >
          Send Message
        </button>
      </Form>
    </div>
  );
}
