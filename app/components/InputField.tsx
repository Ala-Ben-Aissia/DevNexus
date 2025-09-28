import { useId, type InputHTMLAttributes } from "react";

export function InputField({
  type,
  name,
  id,
  label,
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  id ??= useId();

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        className="w-full mt-1 px-4 py-2 border border-gray-700 rouned-lg bg-gray-800 text-gray-300 rounded"
        autoComplete="off"
      />
    </div>
  );
}
