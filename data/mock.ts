import fs from 'fs/promises'
import type {Post, Project} from 'generated/prisma/browser'

export const projects: Omit<Project, 'id'>[] = [
	{
		title: 'Eagle the master of the jungle',
		liveUrl: 'https://example.com/',
		githubUrl: 'https://example.com/',
		description:
			"Eagle's master of the jungle is a very strong creature, and it's very smart too. He can see its prey from very long distances",
		createdAt: new Date('2025-11-15'),
		updatedAt: new Date('2025-11-15'),
	},
	{
		title: 'E-Commerce Platform Redesign',
		liveUrl: 'https://example.com/',
		githubUrl: 'https://example.com/',
		description:
			'Complete overhaul of an existing e-commerce platform with modern UI/UX, improved checkout flow, and mobile-first responsive design. Integrated payment gateways and inventory management system.',
		createdAt: new Date('2024-01-15'),
		updatedAt: new Date('2024-01-15'),
	},
	{
		title: 'AI-Powered Task Manager',
		liveUrl: 'https://example.com/',
		githubUrl: 'https://example.com/',
		description:
			'Smart task management application that uses machine learning to predict task durations, suggest priorities, and optimize daily schedules. Features calendar integration and team collaboration tools.',
		createdAt: new Date('2024-02-03'),
		updatedAt: new Date('2024-02-03'),
	},
	{
		title: 'Real Estate Listing Portal',
		liveUrl: 'https://example.com/',
		githubUrl: 'https://example.com/',
		description:
			'Comprehensive property listing platform with advanced search filters, virtual tour integration, mortgage calculator, and direct messaging between buyers and agents.',
		createdAt: new Date('2024-02-18'),
		updatedAt: new Date('2024-02-18'),
	},
	{
		title: 'Fitness Tracking Mobile App',
		liveUrl: 'https://example.com/',
		githubUrl: 'https://example.com/',
		description:
			'Cross-platform mobile application for workout tracking, meal planning, and progress visualization. Includes social features, workout library, and integration with wearable devices.',
		createdAt: new Date('2024-03-05'),
		updatedAt: new Date('2024-03-05'),
	},
	{
		title: 'Restaurant Management System',
		liveUrl: 'https://example.com/',
		githubUrl: 'https://example.com/',
		description:
			'All-in-one solution for restaurant operations including table reservations, order management, kitchen display system, and staff scheduling. POS integration and analytics dashboard included.',
		createdAt: new Date('2024-03-22'),
		updatedAt: new Date('2024-03-22'),
	},
	{
		title: 'Online Learning Platform',
		liveUrl: 'https://example.com/',
		githubUrl: 'https://example.com/',
		description:
			'Educational platform with video courses, interactive quizzes, progress tracking, and certification system. Features live classes, discussion forums, and personalized learning paths.',
		createdAt: new Date('2024-04-10'),
		updatedAt: new Date('2024-04-10'),
	},
	{
		title: 'Healthcare Appointment System',
		liveUrl: 'https://example.com/',
		githubUrl: 'https://example.com/',
		description:
			'Patient management system with online appointment booking, telemedicine capabilities, prescription management, and medical records storage. HIPAA compliant with secure data encryption.',
		createdAt: new Date('2024-04-28'),
		updatedAt: new Date('2024-04-28'),
	},
	{
		title: 'Social Media Dashboard',
		liveUrl: 'https://example.com/',
		githubUrl: 'https://example.com/',
		description:
			'Unified dashboard for managing multiple social media accounts. Schedule posts, track analytics, monitor mentions, and generate performance reports across all major platforms.',
		createdAt: new Date('2024-05-14'),
		updatedAt: new Date('2024-05-14'),
	},
	{
		title: 'Inventory Management System',
		liveUrl: 'https://example.com/',
		githubUrl: 'https://example.com/',
		description:
			'Enterprise-level inventory tracking solution with barcode scanning, automated reordering, supplier management, and multi-warehouse support. Real-time stock level monitoring and reporting.',
		createdAt: new Date('2024-06-02'),
		updatedAt: new Date('2024-06-02'),
	},
	{
		title: 'Weather Forecasting Dashboard',
		liveUrl: 'https://example.com/',
		githubUrl: 'https://example.com/',
		description:
			'Interactive weather visualization platform with hourly and weekly forecasts, severe weather alerts, historical data analysis, and customizable location tracking.',
		createdAt: new Date('2024-06-19'),
		updatedAt: new Date('2024-06-19'),
	},
	{
		title: 'Event Management Platform',
		liveUrl: 'https://example.com/',
		githubUrl: 'https://example.com/',
		description:
			'Complete event organization solution with ticketing, attendee registration, venue management, and promotional tools. Includes mobile check-in app and post-event analytics.',
		createdAt: new Date('2024-07-07'),
		updatedAt: new Date('2024-07-07'),
	},
	{
		title: 'Project Portfolio Website',
		liveUrl: 'https://example.com/',
		githubUrl: 'https://example.com/',
		description:
			'Personal portfolio website showcasing creative work with dynamic galleries, case studies, client testimonials, and integrated contact form. Optimized for SEO and fast loading.',
		createdAt: new Date('2024-07-25'),
		updatedAt: new Date('2024-07-25'),
	},
	{
		title: 'Budget Tracking Application',
		liveUrl: 'https://example.com/',
		githubUrl: 'https://example.com/',
		description:
			'Personal finance management tool with expense categorization, budget creation, financial goal tracking, and spending insights. Bank account integration and receipt scanning features.',
		createdAt: new Date('2024-08-11'),
		updatedAt: new Date('2024-08-11'),
	},
	{
		title: 'Content Management System',
		liveUrl: 'https://example.com/',
		githubUrl: 'https://example.com/',
		description:
			'Headless CMS built for modern web applications with flexible content modeling, role-based access control, version history, and multi-language support. REST and GraphQL APIs.',
		createdAt: new Date('2024-08-29'),
		updatedAt: new Date('2024-08-29'),
	},
	{
		title: 'Ride Sharing Application',
		liveUrl: 'https://example.com/',
		githubUrl: 'https://example.com/',
		description:
			'On-demand transportation platform connecting drivers and passengers. Features real-time GPS tracking, fare estimation, payment processing, and driver rating system.',
		createdAt: new Date('2024-09-15'),
		updatedAt: new Date('2024-09-15'),
	},
	{
		title: 'Recipe Sharing Community',
		liveUrl: 'https://example.com/',
		githubUrl: 'https://example.com/',
		description:
			'Social platform for food enthusiasts to share recipes, cooking tips, and meal photos. Includes meal planning tools, ingredient substitution suggestions, and cooking timers.',
		createdAt: new Date('2024-10-03'),
		updatedAt: new Date('2024-10-03'),
	},
	{
		title: 'Hotel Booking System',
		liveUrl: 'https://example.com/',
		githubUrl: 'https://example.com/',
		description:
			'Comprehensive hotel reservation platform with room availability calendar, dynamic pricing, guest reviews, and loyalty program integration. Multi-property management support.',
		createdAt: new Date('2024-10-20'),
		updatedAt: new Date('2024-10-20'),
	},
	{
		title: 'Music Streaming Service',
		liveUrl: 'https://example.com/',
		githubUrl: 'https://example.com/',
		description:
			'Audio streaming platform with curated playlists, personalized recommendations, offline listening, and social sharing features. Artist profiles and concert discovery integration.',
		createdAt: new Date('2024-11-06'),
		updatedAt: new Date('2024-11-06'),
	},
	{
		title: 'Job Board Platform',
		liveUrl: 'https://example.com/',
		githubUrl: 'https://example.com/',
		description:
			'Career portal connecting job seekers with employers. Features advanced job search, resume builder, application tracking, and AI-powered job matching. Includes company profiles and salary insights.',
		createdAt: new Date('2024-11-23'),
		updatedAt: new Date('2024-11-23'),
	},
	{
		title: 'IoT Home Automation Hub',
		liveUrl: 'https://example.com/',
		githubUrl: 'https://example.com/',
		description:
			'Smart home control system integrating various IoT devices. Manages lighting, temperature, security cameras, and appliances through a unified interface. Supports automation routines and voice control.',
		createdAt: new Date('2024-12-10'),
		updatedAt: new Date('2024-12-10'),
	},
]

export async function loadImage(path: string) {
	const buffer = await fs.readFile(path)
	return Buffer.from(buffer)
}

const blob = await loadImage('./app/assets/empty.jpg')

export const images = [
	{
		blob,
		contentType: 'image/jpg',
		altText: 'E-commerce platform dashboard showing product listings',
		createdAt: new Date('2024-01-15'),
		updatedAt: new Date('2024-01-15'),
	},
	{
		blob,
		contentType: 'image/jpg',
		altText: 'AI task manager interface with smart scheduling',
		createdAt: new Date('2024-02-03'),
		updatedAt: new Date('2024-02-03'),
	},
	{
		blob,
		contentType: 'image/jpg',
		altText: 'Real estate listing page with property details',
		createdAt: new Date('2024-02-18'),
		updatedAt: new Date('2024-02-18'),
	},
	{
		blob,
		contentType: 'image/jpg',
		altText: 'Fitness app showing workout progress and statistics',
		createdAt: new Date('2024-03-05'),
		updatedAt: new Date('2024-03-05'),
	},
	{
		blob,
		contentType: 'image/jpg',
		altText: 'Restaurant management dashboard with table layout',
		createdAt: new Date('2024-03-22'),
		updatedAt: new Date('2024-03-22'),
	},
	{
		blob,
		contentType: 'image/jpg',
		altText: 'Online learning platform course catalog',
		createdAt: new Date('2024-04-10'),
		updatedAt: new Date('2024-04-10'),
	},
	{
		blob,
		contentType: 'image/jpg',
		altText: 'Healthcare appointment booking interface',
		createdAt: new Date('2024-04-28'),
		updatedAt: new Date('2024-04-28'),
	},
	{
		blob,
		contentType: 'image/jpg',
		altText: 'Social media analytics dashboard with metrics',
		createdAt: new Date('2024-05-14'),
		updatedAt: new Date('2024-05-14'),
	},
	{
		blob,
		contentType: 'image/jpg',
		altText: 'Inventory management system warehouse view',
		createdAt: new Date('2024-06-02'),
		updatedAt: new Date('2024-06-02'),
	},
	{
		blob,
		contentType: 'image/jpg',
		altText: 'Weather dashboard with interactive maps',
		createdAt: new Date('2024-06-19'),
		updatedAt: new Date('2024-06-19'),
	},
	{
		blob,
		contentType: 'image/jpg',
		altText: 'Event management platform showing attendee list',
		createdAt: new Date('2024-07-07'),
		updatedAt: new Date('2024-07-07'),
	},
	{
		blob,
		contentType: 'image/jpg',
		altText: 'Portfolio website homepage with project gallery',
		createdAt: new Date('2024-07-25'),
		updatedAt: new Date('2024-07-25'),
	},
	{
		blob,
		contentType: 'image/jpg',
		altText: 'Budget tracking app with expense breakdown',
		createdAt: new Date('2024-08-11'),
		updatedAt: new Date('2024-08-11'),
	},
	{
		blob,
		contentType: 'image/jpg',
		altText: 'CMS content editor interface',
		createdAt: new Date('2024-08-29'),
		updatedAt: new Date('2024-08-29'),
	},
	{
		blob,
		contentType: 'image/jpg',
		altText: 'Ride sharing app with map and driver location',
		createdAt: new Date('2024-09-15'),
		updatedAt: new Date('2024-09-15'),
	},
	{
		blob,
		contentType: 'image/jpg',
		altText: 'Recipe sharing platform with food photos',
		createdAt: new Date('2024-10-03'),
		updatedAt: new Date('2024-10-03'),
	},
	{
		blob,
		contentType: 'image/jpg',
		altText: 'Hotel booking system showing available rooms',
		createdAt: new Date('2024-10-20'),
		updatedAt: new Date('2024-10-20'),
	},
	{
		blob,
		contentType: 'image/jpg',
		altText: 'Music streaming app with playlist view',
		createdAt: new Date('2024-11-06'),
		updatedAt: new Date('2024-11-06'),
	},
	{
		blob,
		contentType: 'image/jpg',
		altText: 'Job board platform with search results',
		createdAt: new Date('2024-11-23'),
		updatedAt: new Date('2024-11-23'),
	},
	{
		blob,
		contentType: 'image/jpg',
		altText: 'IoT home automation control panel',
		createdAt: new Date('2024-12-10'),
		updatedAt: new Date('2024-12-10'),
	},
]

async function loadPostContent(path: string) {
	const content = await fs.readFile(path, 'utf-8')
	return content
}

export const posts: Omit<Post, 'id' | 'slug'>[] = [
	// slug is auto-generated in prisma/seed.ts (in prod, we can use slugify in a prisma transaction)
	{
		title: 'Prop Setters Pattern: Empowering Users with Rendering Control',
		description:
			'Learn how to use the prop setters pattern to control the rendering of components in React.',
		content: await loadPostContent('./data/prop-setters-pattern.md'),
		createdAt: new Date('2025-04-28'),
		updatedAt: new Date('2025-04-28'),
	},
	{
		title: 'React Concurrent Model: Revolutionizing Application Performance',
		description:
			'Discover how the React Concurrent Model can improve application performance and user experience.',
		content: await loadPostContent('./data/react-concurrent-model.md'),
		createdAt: new Date('2025-05-15'),
		updatedAt: new Date('2025-05-15'),
	},
	{
		title: 'React Suspense: Unleashing the Power of Lazy Loading',
		description:
			'Learn how to use React Suspense to implement lazy loading and optimize application performance.',
		content: await loadPostContent('./data/react-suspense.md'),
		createdAt: new Date('2025-05-31'),
		updatedAt: new Date('2025-05-31'),
	},
	{
		title: 'Use Sync External Store: Simplifying Data Management',
		description:
			'Learn how to use the useSyncExternalStore hook to simplify data management in React.',
		content: await loadPostContent('./data/use-sync-external-store.md'),
		createdAt: new Date('2025-06-17'),
		updatedAt: new Date('2025-06-17'),
	},
	{
		title: 'Use Deferred Value: Enhancing UI Reactivity and Responsiveness',
		description:
			'Learn how to use the useDeferredValue hook to enhance UI reactivity and responsiveness in React.',
		content: await loadPostContent('./data/use-deferred-value.md'),
		createdAt: new Date('2025-07-03'),
		updatedAt: new Date('2025-07-03'),
	},
]
