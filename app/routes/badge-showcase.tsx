import StatusBadge from "~/components/StatusBadge";

export default function BadgeShowcase() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-fluid-4xl lg:text-fluid-5xl font-light text-[var(--color-text)] tracking-tight">
          StatusBadge{" "}
          <span className="font-medium relative">
            Component
            <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[var(--color-accent)] opacity-20"></div>
          </span>
        </h1>
        <p className="text-fluid-base text-[var(--color-text-light)] max-w-2xl mx-auto">
          A customizable and theme-responsive status badge component with
          multiple variants. Switch between light and dark mode to see the theme
          transitions.
        </p>
      </div>

      {/* Success Variant */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-fluid-2xl font-medium text-[var(--color-text)]">
            Success Variant
          </h2>
          <p className="text-fluid-sm text-[var(--color-text-light)]">
            Perfect for availability status, completed tasks, or positive
            confirmations
          </p>
        </div>
        <div className="flex flex-wrap gap-4 p-8 bg-[var(--color-secondary)] rounded-2xl border border-[var(--color-border)]">
          <StatusBadge
            text="Available for new projects"
            variant="success"
            showPulse={true}
          />
          <StatusBadge text="Online now" variant="success" showPulse={true} />
          <StatusBadge
            text="Task completed"
            variant="success"
            showPulse={false}
            icon={
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />
          <StatusBadge
            text="Verified account"
            variant="success"
            showPulse={false}
            icon={
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
          />
        </div>
      </section>

      {/* Info Variant */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-fluid-2xl font-medium text-[var(--color-text)]">
            Info Variant
          </h2>
          <p className="text-fluid-sm text-[var(--color-text-light)]">
            Ideal for informational messages, response times, or neutral
            announcements
          </p>
        </div>
        <div className="flex flex-wrap gap-4 p-8 bg-[var(--color-secondary)] rounded-2xl border border-[var(--color-border)]">
          <StatusBadge
            text="Usually responds within 24 hours"
            variant="info"
            showPulse={false}
            icon={
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />
          <StatusBadge text="New update available" variant="info" />
          <StatusBadge
            text="Beta feature"
            variant="info"
            showPulse={false}
            icon={
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />
          <StatusBadge
            text="Remote friendly"
            variant="info"
            showPulse={false}
            icon={<span className="text-base">🌍</span>}
          />
        </div>
      </section>

      {/* Warning Variant */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-fluid-2xl font-medium text-[var(--color-text)]">
            Warning Variant
          </h2>
          <p className="text-fluid-sm text-[var(--color-text-light)]">
            Great for attention-grabbing messages, limited availability, or
            cautionary notes
          </p>
        </div>
        <div className="flex flex-wrap gap-4 p-8 bg-[var(--color-secondary)] rounded-2xl border border-[var(--color-border)]">
          <StatusBadge
            text="Limited availability"
            variant="warning"
            showPulse={true}
          />
          <StatusBadge text="Booking fast" variant="warning" showPulse={true} />
          <StatusBadge
            text="Action required"
            variant="warning"
            showPulse={false}
            icon={
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            }
          />
          <StatusBadge
            text="Few spots left"
            variant="warning"
            showPulse={false}
            icon={<span className="text-base">⚡</span>}
          />
        </div>
      </section>

      {/* Premium Variant */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-fluid-2xl font-medium text-[var(--color-text)]">
            Premium Variant
          </h2>
          <p className="text-fluid-sm text-[var(--color-text-light)]">
            Elegant purple styling for exclusive features, VIP content, or
            premium offerings
          </p>
        </div>
        <div className="flex flex-wrap gap-4 p-8 bg-[var(--color-secondary)] rounded-2xl border border-[var(--color-border)]">
          <StatusBadge text="Pro member" variant="premium" showPulse={true} />
          <StatusBadge
            text="Premium content"
            variant="premium"
            showPulse={false}
            icon={
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            }
          />
          <StatusBadge
            text="VIP access"
            variant="premium"
            showPulse={false}
            icon={<span className="text-base">👑</span>}
          />
          <StatusBadge
            text="Exclusive offer"
            variant="premium"
            showPulse={true}
            icon={<span className="text-base">💎</span>}
          />
        </div>
      </section>

      {/* Primary Variant */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-fluid-2xl font-medium text-[var(--color-text)]">
            Primary Variant
          </h2>
          <p className="text-fluid-sm text-[var(--color-text-light)]">
            Uses your site's theme colors, perfect for section badges and
            branded elements
          </p>
        </div>
        <div className="flex flex-wrap gap-4 p-8 bg-[var(--color-secondary)] rounded-2xl border border-[var(--color-border)]">
          <StatusBadge
            text="Featured Projects"
            variant="primary"
            showPulse={false}
            icon={<span className="text-lg">🔥</span>}
          />
          <StatusBadge
            text="Latest Insights"
            variant="primary"
            showPulse={false}
            icon={
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253z"
                />
              </svg>
            }
          />
          <StatusBadge text="Trending" variant="primary" showPulse={true} />
          <StatusBadge
            text="Popular choice"
            variant="primary"
            showPulse={false}
            icon={<span className="text-base">⭐</span>}
          />
        </div>
      </section>

      {/* Code Examples */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-fluid-2xl font-medium text-[var(--color-text)]">
            Usage Examples
          </h2>
          <p className="text-fluid-sm text-[var(--color-text-light)]">
            Copy and paste these examples to use in your project
          </p>
        </div>
        <div className="space-y-4">
          <div className="p-6 bg-[var(--color-secondary)] rounded-xl border border-[var(--color-border)]">
            <p className="text-fluid-sm text-[var(--color-text-light)] mb-3">
              Basic success badge with pulse:
            </p>
            <pre className="text-fluid-sm text-[var(--color-text)] overflow-x-auto">
              <code>{`<StatusBadge
  text="Available for new projects"
  variant="success"
  showPulse={true}
/>`}</code>
            </pre>
          </div>

          <div className="p-6 bg-[var(--color-secondary)] rounded-xl border border-[var(--color-border)]">
            <p className="text-fluid-sm text-[var(--color-text-light)] mb-3">
              Info badge with custom icon:
            </p>
            <pre className="text-fluid-sm text-[var(--color-text)] overflow-x-auto">
              <code>{`<StatusBadge
  text="Usually responds within 24 hours"
  variant="info"
  showPulse={false}
  icon={<ClockIcon />}
/>`}</code>
            </pre>
          </div>

          <div className="p-6 bg-[var(--color-secondary)] rounded-xl border border-[var(--color-border)]">
            <p className="text-fluid-sm text-[var(--color-text-light)] mb-3">
              Warning badge with emoji:
            </p>
            <pre className="text-fluid-sm text-[var(--color-text)] overflow-x-auto">
              <code>{`<StatusBadge
  text="Limited availability"
  variant="warning"
  showPulse={true}
  icon={<span className="text-base">⚡</span>}
/>`}</code>
            </pre>
          </div>

          <div className="p-6 bg-[var(--color-secondary)] rounded-xl border border-[var(--color-border)]">
            <p className="text-fluid-sm text-[var(--color-text-light)] mb-3">
              Premium badge with crown icon:
            </p>
            <pre className="text-fluid-sm text-[var(--color-text)] overflow-x-auto">
              <code>{`<StatusBadge
  text="VIP access"
  variant="premium"
  showPulse={false}
  icon={<span className="text-base">👑</span>}
/>`}</code>
            </pre>
          </div>

          <div className="p-6 bg-[var(--color-secondary)] rounded-xl border border-[var(--color-border)]">
            <p className="text-fluid-sm text-[var(--color-text-light)] mb-3">
              Primary badge with custom styling:
            </p>
            <pre className="text-fluid-sm text-[var(--color-text)] overflow-x-auto">
              <code>{`<StatusBadge
  text="Featured Projects"
  variant="primary"
  showPulse={false}
  icon={<span className="text-lg">🔥</span>}
  className="mb-6"
/>`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Props Documentation */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-fluid-2xl font-medium text-[var(--color-text)]">
            Props
          </h2>
          <p className="text-fluid-sm text-[var(--color-text-light)]">
            Available props for the StatusBadge component
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="p-4 text-fluid-sm font-semibold text-[var(--color-text)]">
                  Prop
                </th>
                <th className="p-4 text-fluid-sm font-semibold text-[var(--color-text)]">
                  Type
                </th>
                <th className="p-4 text-fluid-sm font-semibold text-[var(--color-text)]">
                  Default
                </th>
                <th className="p-4 text-fluid-sm font-semibold text-[var(--color-text)]">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="text-fluid-sm">
              <tr className="border-b border-[var(--color-border)]">
                <td className="p-4 font-mono text-gray-400">text</td>
                <td className="p-4 text-[var(--color-text-light)]">string</td>
                <td className="p-4 text-[var(--color-text-light)]">required</td>
                <td className="p-4 text-[var(--color-text-light)]">
                  The text content to display in the badge
                </td>
              </tr>
              <tr className="border-b border-[var(--color-border)]">
                <td className="p-4 font-mono text-gray-400">variant</td>
                <td className="p-4 text-[var(--color-text-light)]">
                  "success" | "info" | "warning" | "premium" | "primary"
                </td>
                <td className="p-4 text-[var(--color-text-light)]">
                  "success"
                </td>
                <td className="p-4 text-[var(--color-text-light)]">
                  Visual style variant
                </td>
              </tr>
              <tr className="border-b border-[var(--color-border)]">
                <td className="p-4 font-mono text-gray-400">showPulse</td>
                <td className="p-4 text-[var(--color-text-light)]">boolean</td>
                <td className="p-4 text-[var(--color-text-light)]">true</td>
                <td className="p-4 text-[var(--color-text-light)]">
                  Whether to show the pulsing dot indicator
                </td>
              </tr>
              <tr className="border-b border-[var(--color-border)]">
                <td className="p-4 font-mono text-gray-400">icon</td>
                <td className="p-4 text-[var(--color-text-light)]">
                  React.ReactNode
                </td>
                <td className="p-4 text-[var(--color-text-light)]">
                  undefined
                </td>
                <td className="p-4 text-[var(--color-text-light)]">
                  Optional icon to display instead of the pulse dot
                </td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-gray-400">className</td>
                <td className="p-4 text-[var(--color-text-light)]">string</td>
                <td className="p-4 text-[var(--color-text-light)]">""</td>
                <td className="p-4 text-[var(--color-text-light)]">
                  Additional CSS classes to apply
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
