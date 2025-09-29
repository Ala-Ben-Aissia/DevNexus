import { useId, type InputHTMLAttributes } from "react";

export function InputField({
  type,
  name,
  id,
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  id ??= useId();

  return (
    <div className="space-y-3">
      <label
        htmlFor={id}
        className="block text-fluid-base font-normal text-[var(--color-text)] tracking-wide"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          name={name}
          className="w-full px-6 py-5 border-2 border-[var(--color-border)] rounded-2xl bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] text-[var(--color-text)] placeholder-[var(--color-text-light)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-0 focus:shadow-lg transition-all duration-500 text-fluid-base hover:border-[var(--color-accent)] hover:shadow-md gpu-accelerated"
          autoComplete="off"
          {...props}
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] opacity-0 hover:opacity-5 focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </div>
  );
}
