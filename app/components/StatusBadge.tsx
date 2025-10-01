/**
 * A customizable and theme-responsive status badge component
 *
 * @example
 * // Success badge with pulse animation
 * <StatusBadge text="Available for new projects" variant="success" showPulse={true} />
 *
 * @example
 * // Info badge with custom icon
 * <StatusBadge
 *   text="Responds in 24h"
 *   variant="info"
 *   showPulse={false}
 *   icon={<ClockIcon />}
 * />
 *
 * @example
 * // Warning badge
 * <StatusBadge text="Limited availability" variant="warning" />
 *
 * @example
 * // Primary badge with emoji icon
 * <StatusBadge
 *   text="Featured Projects"
 *   variant="primary"
 *   showPulse={false}
 *   icon={<span className="text-lg">🔥</span>}
 * />
 */

type StatusBadgeVariant =
  | "success"
  | "info"
  | "warning"
  | "primary"
  | "premium";

type StatusBadgeProps = {
  /** The text content to display in the badge */
  text: string;
  /** Visual style variant - defaults to "success" */
  variant?: StatusBadgeVariant;
  /** Whether to show the pulsing dot indicator - defaults to true */
  showPulse?: boolean;
  /** Optional icon to display instead of the pulse dot */
  icon?: React.ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
};

const variantStyles: Record<
  StatusBadgeVariant,
  {
    container: string;
    pulseColor: string;
  }
> = {
  success: {
    container:
      "bg-gradient-to-r from-green-50 via-green-100 to-green-100/90 dark:from-green-950/50 dark:via-green-900/40 dark:to-green-950/50 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100",
    pulseColor: "bg-green-500 dark:bg-green-400",
  },
  info: {
    container:
      "bg-gradient-to-r from-blue-50 via-blue-100 to-blue-100/90 dark:from-blue-950/50 dark:via-blue-900/40 dark:to-blue-950/50 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100",
    pulseColor: "bg-blue-500 dark:bg-blue-400",
  },
  warning: {
    container:
      "bg-gradient-to-r from-amber-50 via-amber-100 to-amber-100/90 dark:from-amber-950/50 dark:via-amber-900/40 dark:to-amber-950/50 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100",
    pulseColor: "bg-amber-500 dark:bg-amber-400",
  },
  primary: {
    container:
      "bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-tertiary)] border-[var(--color-border)] text-[var(--color-text)]",
    pulseColor: "bg-[var(--color-accent)]",
  },
  premium: {
    container:
      "bg-gradient-to-r from-purple-50 via-purple-100 to-purple-100/90 dark:from-purple-950/50 dark:via-purple-900/40 dark:to-purple-950/50 border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-100",
    pulseColor: "bg-purple-500 dark:bg-purple-400",
  },
};
export default function StatusBadge({
  text,
  variant = "success",
  showPulse = true,
  icon,
  className = "",
}: StatusBadgeProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 mb-12 ${styles.container} border rounded-full text-fluid-sm font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm ${className}`}
    >
      {showPulse && !icon && (
        <div
          className={`w-2 h-2 ${styles.pulseColor} rounded-full animate-pulse transition-colors duration-300`}
        ></div>
      )}
      {icon && (
        <span className="flex items-center transition-transform duration-300">
          {icon}
        </span>
      )}
      <span className="transition-colors duration-300">{text}</span>
    </div>
  );
}
