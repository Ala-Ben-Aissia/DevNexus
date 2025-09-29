import { InputField } from "~/components/InputField";
import type { Route } from "./+types/contact";
import z from "zod";
import { Form } from "react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const formSchema = z.object({
  fullName: z.string().min(5).max(50),
  email: z.email(),
  subject: z.string().min(20).max(1000),
});

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const parsedData = formSchema.safeParse({ fullName, email, subject });
  if (parsedData.success) {
    return {
      ...parsedData.data,
      message: "📬 Thank you for your message!",
      success: true,
    } as const;
  } else {
    const parsedError = JSON.parse(parsedData.error.message)[0];
    const pathError = parsedError["path"][0];
    const errorMessage: string = parsedError["message"].replace(
      typeof formData.get(pathError),
      pathError
    );
    return {
      message: errorMessage,
      success: false,
    } as const;
  }
}

export default function ContactPage({ actionData }: Route.ComponentProps) {
  const [showMessage, setshowMessage] = useState(!!actionData);
  const formData = actionData;

  useEffect(() => {
    if (actionData) {
      setshowMessage(true);
      const timer = setTimeout(() => {
        setshowMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [actionData]);

  return (
    <div className="text-w-3xl mx-auto mt-12 px-6 py-8 dark:bg-gray-900">
      <h2 className="text-3xl font-bold dark:text-white mb-8 text-center">
        📬 Contact Me
      </h2>
      <AnimatePresence>
        {formData?.message && showMessage && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className={`mx-auto w-1/2 py-4 text-center border border-gray-700 rounded-lg shadow-md ${
              formData.success ? "text-green-500" : "text-red-500"
            }`}
          >
            {formData.message}
          </motion.div>
        )}
      </AnimatePresence>
      <Form method="post" className="space-y-6">
        <InputField type="text" name="fullName" label="Full Name" />
        <InputField
          type="email"
          name="email"
          label="Email"
          defaultValue="empty@email.com"
        />
        <div>
          <label
            htmlFor="subject"
            className="block text-fluid-base font-normal text-[var(--color-text)] tracking-wide"
          >
            Subject
          </label>
          <textarea
            name="subject"
            id="subject"
            cols={30}
            rows={10}
            className="w-full px-4 mt-3 py-2 border dark:border-gray-700 rouned-lg dark:bg-gray-800 text-gray-300 rounded placeholder:text-gray-500"
            placeholder="Please write your message here..."
          />
        </div>
        <button className="mx-auto w-full block dark:text-white py-2 rounded dark:bg-gray-700 dark:hover:bg-gray-800 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] transition-colors duration-300 cursor-pointer">
          Send Message
        </button>
      </Form>
    </div>
  );
}
