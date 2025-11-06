import {useState} from 'react'
import {NavLink} from 'react-router'
import ThemeToggleSimple from './ThemeToggleSimple'

type Path = `/${string}`
type NavLinks = Array<{to: Path; label: string}>

const navLinks: NavLinks = [
	{to: '/', label: 'Home'},
	{to: '/projects', label: 'Projects'},
	{to: '/blog', label: 'Blog'},
	{to: '/about', label: 'About'},
	{to: '/contact', label: 'Contact'},
]

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false)

	return (
		<nav className="sticky top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm mb-12">
			<div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
				{/* Logo */}
				<NavLink
					to="/"
					className="group flex items-center gap-3 transition-all duration-200 hover:scale-[1.02]"
				>
					<div className="relative w-10 h-10">
						<svg
							viewBox="0 0 100 100"
							className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:rotate-180"
							style={{transformOrigin: 'center'}}
						>
							<path
								d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z"
								fill="none"
								stroke="lightgray"
								strokeWidth="5"
								className="text-[var(--color-accent)] transition-colors duration-300"
							/>
						</svg>

						<svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
							<defs>
								<linearGradient id="logoGradient" x1="0%" y1="0%" x2="25%" y2="50%">
									<stop offset="0%" style={{stopColor: 'currentColor'}} />
									<stop offset="100%" style={{stopColor: 'currentColor'}} />
								</linearGradient>
							</defs>
							<path
								d="M50 20 L75 35 L75 65 L50 80 L25 65 L25 35 Z"
								fill="url(#logoGradient)"
								className="transition-all duration-300 group-hover:opacity-80"
							/>
						</svg>

						<div className="absolute inset-0 flex items-center justify-center">
							<span className="text-lg font-bold text-[var(--color-primary)] transition-transform duration-300 group-hover:scale-110">
								A
							</span>
						</div>

						<div className="absolute inset-0 rounded-full bg-[var(--color-accent)] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
					</div>

					<div className="flex flex-col leading-none">
						<span className="text-base font-bold text-[var(--color-text)] tracking-tight transition-colors duration-300">
							DevNexus
						</span>
						<span className="text-[10px] font-medium text-[var(--color-text-light)] tracking-wider uppercase transition-colors duration-300">
							Portfolio
						</span>
					</div>
				</NavLink>

				{/* Desktop Navigation */}
				<div className="hidden sm:flex items-center gap-8">
					{navLinks.map(l => (
						<NavLink
							key={l.label}
							to={l.to}
							className={({isActive}) =>
								`relative text-fluid-base transition-all duration-500 ${
									isActive
										? 'font-semibold text-[var(--color-text)]'
										: 'text-[var(--color-text-light)] hover:text-[var(--color-text)]'
								}`
							}
						>
							<span className="relative z-10">{l.label}</span>
							<div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full"></div>
						</NavLink>
					))}

					<div className="ml-4">
						<ThemeToggleSimple />
					</div>
				</div>

				{/* Mobile Actions */}
				<div className="sm:hidden flex items-center gap-3">
					<ThemeToggleSimple />
					<button
						className="text-[var(--color-text)] text-fluid-xl cursor-pointer hover:text-[var(--color-text-light)] transition-all duration-300"
						onClick={() => setMenuOpen(o => !o)}
						aria-label="Toggle menu"
					>
						<div className="relative w-6 h-6 flex items-center justify-center">
							<div
								className={`absolute transition-all duration-300 ${
									menuOpen ? 'rotate-45' : ''
								}`}
							>
								{menuOpen ? (
									<svg
										className="w-6 h-6 text-gray-800 dark:text-white"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										fill="none"
										viewBox="0 0 24 24"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 12h14m-7 7V5"
										/>
									</svg>
								) : (
									<svg
										className="w-6 h-6 text-gray-800 dark:text-white"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										fill="none"
										viewBox="0 0 24 24"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeWidth="2"
											d="M5 7h14M5 12h14M5 17h14"
										/>
									</svg>
								)}
							</div>
						</div>
					</button>
				</div>
			</div>

			{/* Mobile Dropdown */}

			{menuOpen && (
				<div className="sm:hidden absolute left-0 right-0 top-full backdrop-blur-xl bg-white/90 dark:bg-gray-950/90 border-t border-gray-200/50 dark:border-gray-800/50 shadow-lg transition-all duration-500">
					<div className="flex flex-col items-center gap-6 py-8 text-fluid-lg">
						{navLinks.map(l => (
							<NavLink
								key={l.label}
								to={l.to}
								className={({isActive}) =>
									`transition-all duration-500 relative text-fluid-lg ${
										isActive
											? 'font-semibold text-[var(--color-text)]'
											: 'text-[var(--color-text-light)] hover:text-[var(--color-text)]'
									}`
								}
								onClick={() => setMenuOpen(false)}
							>
								{l.label}
							</NavLink>
						))}
					</div>
				</div>
			)}
		</nav>
	)
}
