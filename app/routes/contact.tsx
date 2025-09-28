import { InputField } from "~/components/InputField";

export default function ContactPage() {
  return (
    <div className="text-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900">
      <h2 className="text-3xl font-bold text-white mb-8">📬 Contact Me</h2>
      <form action="" className="space-y-6">
        <InputField type="text" name="fullName" label="Full Name" />
        <InputField type="email" name="email" label="Email" />
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-300"
          >
            Subject
          </label>
          <textarea
            name="message"
            id="message"
            cols={30}
            rows={10}
            className="w-full px-4 mt-1 py-2 border border-gray-700 rouned-lg bg-gray-800 text-gray-300 rounded placeholder:text-gray-500"
            placeholder="Please write your message here..."
          />
        </div>
        <button className="mx-auto w-full block text-white py-2 rounded bg-blue-600 hover:bg-blue-700 transition-colors duration-300 cursor-pointer">
          Send Message
        </button>
      </form>
    </div>
  );
}
