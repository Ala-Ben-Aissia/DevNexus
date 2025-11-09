import Banner from './Banner'
import InputField from './InputField'
import TextAreaField from './TextariaField'

export default function EnhancedContactForm() {
	const benefits = [
		{icon: '📋', text: 'Detailed project proposal'},
		{icon: '💰', text: 'Transparent pricing'},
		{icon: '⚡', text: 'Quick turnaround'},
		{icon: '🤝', text: 'Free consultation call'},
	]

	return (
		<div className="min-h-screen bg-[var(--color-primary)] py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto">
				<div className="relative bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-3xl border border-[var(--color-border)] overflow-hidden hover-lift">
					{/* Decorative gradient overlay */}
					<div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5 pointer-events-none"></div>

					<div className="relative z-10 p-8 sm:p-10 lg:p-12">
						{/* Header */}
						<div className="mb-10 animate-fade-in-up">
							<h2 className="text-fluid-3xl lg:text-fluid-4xl font-light text-[var(--color-text)] mb-4 tracking-tight">
								Start Your <span className="font-medium">Project</span>
							</h2>
							<p className="text-fluid-base text-[var(--color-text-light)] leading-relaxed max-w-2xl">
								Tell me about your project goals and I'll provide a detailed proposal
								within 24 hours.
							</p>
						</div>

						{/* Benefits Grid */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
							{benefits.map((benefit, index) => (
								<div
									key={index}
									className="inline-flex items-center gap-3 px-4 py-3 bg-[var(--color-tertiary)] border border-[var(--color-border)] rounded-full text-fluid-sm text-[var(--color-text-light)] transition-all duration-300 hover:border-[var(--color-accent)] hover:shadow-sm gpu-accelerated"
								>
									<span className="text-xl">{benefit.icon}</span>
									<span className="font-normal">{benefit.text}</span>
								</div>
							))}
						</div>

						{/* Success Message */}
						{'success' === 'success' && (
							<Banner
								status="success"
								title="Message sent successfully!"
								description="Message sent successfully!"
							/>
						)}
						{'error' === 'error' && (
							<Banner
								status="error"
								title="Something went wrong!"
								description="Please try again or contact us directly."
							/>
						)}

						{/* Error Message */}
						{/* {submitStatus === 'error' && (
							<div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 animate-fade-in-scale">
								<div className="flex items-start gap-3">
									<div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
										<svg
											className="w-4 h-4 text-white"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</div>
									<div>
										<p className="font-semibold text-red-900 mb-1 text-fluid-base">
											Something went wrong
										</p>
										<p className="text-fluid-sm text-red-700">
											Please try again or contact us directly.
										</p>
									</div>
								</div>
							</div>
						)} */}

						{/* Form */}
						<div className="space-y-6">
							{/* Name and Email Row */}
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
								<InputField
									type="text"
									name="fullName"
									label="Full Name *"
									required
									placeholder="John Doe"
									// value={formData.fullName}
									// onChange={e => handleInputChange('fullName', e.target.value)}
									minLength={2}
									maxLength={50}
								/>
								<InputField
									type="email"
									name="email"
									label="Email Address *"
									required
									placeholder="john@example.com"
									// value={formData.email}
									// onChange={e => handleInputChange('email', e.target.value)}
								/>
							</div>

							{/* Subject */}
							<InputField
								type="text"
								name="subject"
								label="Subject"
								placeholder="What's this about?"
								// value={formData.subject}
								// onChange={e => handleInputChange('subject', e.target.value)}
								maxLength={100}
							/>

							{/* Message */}
							<TextAreaField
								name="body"
								label="Message *"
								required
								rows={6}
								placeholder="Tell me about your project or idea... (minimum 20 characters)"
								// value={formData.body}
								// onChange={e => handleInputChange('body', e.target.value)}
								minLength={20}
								maxLength={1000}
							/>

							{/* Submit Button */}
							<button
								type="button"
								// onClick={handleSubmit}
								// disabled={
								// 	isSubmitting ||
								// 	!formData.fullName ||
								// 	!formData.email ||
								// 	!formData.body ||
								// 	formData.body.length < 20
								// }
								className="group relative w-full px-8 py-5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-text)] font-semibold rounded-2xl transition-all duration-500 hover-lift text-fluid-base overflow-hidden border border-[var(--color-accent)] hover:border-[var(--color-accent-hover)] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
							>
								<span className="relative z-10 flex items-center justify-center gap-3">
									{false ? (
										<>
											<svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
												<circle
													className="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													strokeWidth="4"
													fill="none"
												/>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												/>
											</svg>
											Sending...
										</>
									) : (
										<>
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
										</>
									)}
								</span>
								<div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-text)] opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
							</button>

							{/* Privacy Note */}
							<p className="text-fluid-xs text-center text-[var(--color-text-muted)] leading-relaxed">
								By submitting this form, you agree to our privacy policy. We'll never
								share your information.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
