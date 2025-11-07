/**
 * A customizable and theme-responsive status badge component with multiple visual styles
 *
 * @example
 * // Success badge with pulse animation
 * <StatusBadge text="Available for new projects" variant="success" showPulse={true} />
 *
 * @example
 * // Modern glass effect style
 * <StatusBadge
 *   text="Live Project"
 *   variant="success"
 *   customStyle="glass"
 *   showPulse={true}
 * />
 *
 * @example
 * // Bold vibrant style
 * <StatusBadge text="Featured" variant="primary" customStyle="bold" />
 *
 * @example
 * // Premium multi-pulse style
 * <StatusBadge
 *   text="Premium Project"
 *   variant="premium"
 *   customStyle="premium"
 *   showPulse={true}
 * />
 */

import React from 'react'

type StatusBadgeVariant = 'success' | 'info' | 'warning' | 'primary' | 'premium'

type StatusBadgeStyle =
	| 'default'
	| 'subtle'
	| 'glass'
	| 'bold'
	| 'minimal'
	| 'premium'
	| 'corporate'

type StatusBadgeProps = {
	/** The text content to display in the badge */
	text: string
	/** Visual style variant - defaults to "success" */
	variant?: StatusBadgeVariant
	/** Visual style preset - defaults to "default" */
	customStyle?: StatusBadgeStyle
	/** Whether to show the pulsing dot indicator - defaults to true */
	showPulse?: boolean
	/** Optional icon to display instead of the pulse dot */
	icon?: React.ReactNode
	/** Additional CSS classes to apply */
	className?: string
}

const variantStyles: Record<
	StatusBadgeVariant,
	{
		container: Record<StatusBadgeStyle, string>
		pulseColor: string
		textColor: string
		gradientText: string
	}
> = {
	success: {
		container: {
			default:
				'bg-gradient-to-r from-green-50 via-green-100 to-green-100/90 dark:from-green-950/50 dark:via-green-900/40 dark:to-green-950/50 border-green-200 dark:border-green-800',
			subtle:
				'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md',
			glass:
				'bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-green-200/50 dark:border-green-500/30 shadow-lg',
			bold: 'bg-gradient-to-r from-emerald-500 to-teal-500 border-transparent shadow-lg hover:shadow-xl',
			minimal: 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700',
			premium:
				'bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-2 border-green-500/20 dark:border-green-500/40 shadow-xl',
			corporate:
				'bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800',
		},
		pulseColor: 'bg-green-500 dark:bg-green-400',
		textColor: 'text-green-900 dark:text-green-100',
		gradientText: 'from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400',
	},
	info: {
		container: {
			default:
				'bg-gradient-to-r from-blue-50 via-blue-100 to-blue-100/90 dark:from-blue-950/50 dark:via-blue-900/40 dark:to-blue-950/50 border-blue-200 dark:border-blue-800',
			subtle:
				'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md',
			glass:
				'bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-blue-200/50 dark:border-blue-500/30 shadow-lg',
			bold: 'bg-gradient-to-r from-blue-500 to-cyan-500 border-transparent shadow-lg hover:shadow-xl',
			minimal: 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700',
			premium:
				'bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-2 border-blue-500/20 dark:border-blue-500/40 shadow-xl',
			corporate: 'bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800',
		},
		pulseColor: 'bg-blue-500 dark:bg-blue-400',
		textColor: 'text-blue-900 dark:text-blue-100',
		gradientText: 'from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400',
	},
	warning: {
		container: {
			default:
				'bg-gradient-to-r from-amber-50 via-amber-100 to-amber-100/90 dark:from-amber-950/50 dark:via-amber-900/40 dark:to-amber-950/50 border-amber-200 dark:border-amber-800',
			subtle:
				'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md',
			glass:
				'bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-amber-200/50 dark:border-amber-500/30 shadow-lg',
			bold: 'bg-gradient-to-r from-amber-500 to-orange-500 border-transparent shadow-lg hover:shadow-xl',
			minimal: 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700',
			premium:
				'bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-2 border-amber-500/20 dark:border-amber-500/40 shadow-xl',
			corporate:
				'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800',
		},
		pulseColor: 'bg-amber-500 dark:bg-amber-400',
		textColor: 'text-amber-900 dark:text-amber-100',
		gradientText: 'from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400',
	},
	primary: {
		container: {
			default:
				'bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-tertiary)] border-[var(--color-border)]',
			subtle:
				'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md',
			glass:
				'bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-500/30 shadow-lg',
			bold: 'bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800 border-transparent shadow-lg hover:shadow-xl',
			minimal: 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700',
			premium:
				'bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-2 border-slate-500/20 dark:border-slate-500/40 shadow-xl',
			corporate:
				'bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800',
		},
		pulseColor: 'bg-[var(--color-accent)]',
		textColor: 'text-[var(--color-text)]',
		gradientText: 'from-slate-700 to-slate-900 dark:from-slate-300 dark:to-slate-100',
	},
	premium: {
		container: {
			default:
				'bg-gradient-to-r from-purple-50 via-purple-100 to-purple-100/90 dark:from-purple-950/50 dark:via-purple-900/40 dark:to-purple-950/50 border-purple-200 dark:border-purple-800',
			subtle:
				'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md',
			glass:
				'bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-purple-200/50 dark:border-purple-500/30 shadow-lg',
			bold: 'bg-gradient-to-r from-purple-500 to-pink-500 border-transparent shadow-lg hover:shadow-xl',
			minimal: 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700',
			premium:
				'bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-2 border-purple-500/20 dark:border-purple-500/40 shadow-xl',
			corporate:
				'bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800',
		},
		pulseColor: 'bg-purple-500 dark:bg-purple-400',
		textColor: 'text-purple-900 dark:text-purple-100',
		gradientText: 'from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400',
	},
}

const PulseIndicator = ({
	style,
	pulseColor,
	variant,
}: {
	style: StatusBadgeStyle
	pulseColor: string
	variant: StatusBadgeVariant
}) => {
	// Bold style uses white pulse on colored background
	if (style === 'bold') {
		return (
			<div className="relative flex items-center justify-center">
				<div className="w-2 h-2 bg-white rounded-full"></div>
				<div className="absolute w-2 h-2 bg-white rounded-full animate-ping opacity-75"></div>
			</div>
		)
	}

	// Subtle style with double ping animation
	if (style === 'subtle') {
		return (
			<div className="relative flex items-center justify-center">
				<div className={`w-2 h-2 ${pulseColor} rounded-full`}></div>
				<div
					className={`absolute w-2 h-2 ${pulseColor} rounded-full animate-ping opacity-75`}
				></div>
			</div>
		)
	}

	// Glass style with shadow effect
	if (style === 'glass') {
		return (
			<div className="relative flex items-center justify-center">
				<div
					className={`w-2 h-2 ${pulseColor} rounded-full shadow-lg ${
						variant === 'success' ? 'shadow-emerald-500/50' : ''
					}`}
				></div>
				<div
					className={`absolute w-2 h-2 ${pulseColor
						.replace('bg-', 'bg-')
						.replace('-500', '-400')} rounded-full animate-ping`}
				></div>
			</div>
		)
	}

	// Minimal style - simple pulse
	if (style === 'minimal') {
		return <div className={`w-1.5 h-1.5 ${pulseColor} rounded-full animate-pulse`}></div>
	}

	// Premium style with multi-layer pulse
	if (style === 'premium') {
		return (
			<div className="relative flex items-center justify-center">
				<div
					className={`w-2.5 h-2.5 bg-gradient-to-br ${pulseColor
						.replace('bg-', 'from-')
						.replace('-500', '-400')} ${pulseColor
						.replace('bg-', 'to-')
						.replace('-500', '-600')} rounded-full`}
				></div>
				<div
					className={`absolute w-3 h-3 ${pulseColor} rounded-full animate-ping opacity-60`}
				></div>
				<div
					className={`absolute w-4 h-4 ${pulseColor} rounded-full animate-ping opacity-30`}
					style={{animationDelay: '0.5s'}}
				></div>
			</div>
		)
	}

	// Corporate style with SVG animation
	if (style === 'corporate') {
		const color = pulseColor.includes('green')
			? 'text-green-500'
			: pulseColor.includes('blue')
			? 'text-blue-500'
			: pulseColor.includes('amber')
			? 'text-amber-500'
			: pulseColor.includes('purple')
			? 'text-purple-500'
			: 'text-slate-500'

		return (
			<svg className={`w-3 h-3 ${color}`} fill="currentColor" viewBox="0 0 8 8">
				<circle cx="4" cy="4" r="3">
					<animate
						attributeName="opacity"
						values="1;0.3;1"
						dur="2s"
						repeatCount="indefinite"
					/>
				</circle>
			</svg>
		)
	}

	// Default style
	return (
		<div
			className={`w-2 h-2 ${pulseColor} rounded-full animate-pulse transition-colors`}
		></div>
	)
}

export default function StatusBadge({
	text,
	variant = 'success',
	customStyle = 'default',
	showPulse = true,
	icon,
	className = '',
}: StatusBadgeProps) {
	const styles = variantStyles[variant]
	const containerStyle = styles.container[customStyle]

	// Determine text styling based on customStyle
	const getTextStyle = () => {
		if (customStyle === 'bold') {
			return 'text-white font-bold tracking-wide'
		}
		if (customStyle === 'minimal') {
			return 'text-slate-600 dark:text-slate-300 uppercase tracking-wider'
		}
		if (customStyle === 'premium') {
			return `font-semibold bg-gradient-to-r ${styles.gradientText} bg-clip-text text-transparent`
		}
		if (customStyle === 'subtle') {
			return 'text-slate-700 dark:text-slate-200 font-medium'
		}
		if (customStyle === 'glass') {
			return 'text-slate-800 dark:text-slate-100 font-semibold'
		}
		if (customStyle === 'corporate') {
			return styles.textColor + ' font-medium'
		}
		return styles.textColor
	}

	// Determine sizing based on customStyle
	const getSizeStyle = () => {
		if (customStyle === 'minimal') {
			return 'px-3 py-1.5 text-xs rounded-md'
		}
		if (customStyle === 'bold' || customStyle === 'premium') {
			return 'px-5 py-2.5 text-sm rounded-full'
		}
		if (customStyle === 'corporate') {
			return 'px-4 py-2 text-sm rounded-lg'
		}
		return 'px-4 py-2 text-sm rounded-full'
	}

	return (
		<div
			className={`inline-flex items-center gap-${
				customStyle === 'premium' ? '3' : customStyle === 'minimal' ? '2' : '2.5'
			} ${getSizeStyle()} ${containerStyle} border transition-all hover:scale-105 ${className}`}
		>
			{showPulse && !icon && (
				<PulseIndicator
					style={customStyle}
					pulseColor={styles.pulseColor}
					variant={variant}
				/>
			)}
			{icon && <span className="flex items-center transition-transform">{icon}</span>}
			<span className={`${getTextStyle()} ${customStyle === 'bold' ? 'uppercase' : ''}`}>
				{customStyle === 'bold' ? text.toUpperCase() : text}
			</span>
		</div>
	)
}
