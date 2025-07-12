'use client';

import { useState } from 'react';

const expertiseData = [
	{
		id: 'development',
		title: 'Développement',
		subtitle: 'Web • Mobile • Desktop',
		description:
			'Création d\'applications modernes avec les dernières technologies',
		technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Rust'],
		icon: '💻',
		color: 'from-blue-500 to-cyan-500',
		projects: 12,
	},
	{
		id: 'emerging-tech',
		title: 'Technologies Émergentes',
		subtitle: 'VR/AR • IA • Impression 3D',
		description:
			'Innovation avec les technologies de pointe et intelligence artificielle',
		technologies: ['Three.js', 'WebXR', 'TensorFlow', 'OpenAI', 'Blender', 'Unity'],
		icon: '🚀',
		color: 'from-purple-500 to-pink-500',
		projects: 8,
	},
	{
		id: 'crypto',
		title: 'Finance & Crypto',
		subtitle: 'DeFi • Blockchain • NFT',
		description:
			'Solutions blockchain et finance décentralisée innovantes',
		technologies: ['Solidity', 'Web3.js', 'Ethereum', 'Polygon', 'IPFS', 'DeFi'],
		icon: '₿',
		color: 'from-yellow-500 to-orange-500',
		projects: 6,
	},
	{
		id: 'business',
		title: 'Entrepreneuriat',
		subtitle: 'Business • Innovation • Strategy',
		description:
			'Accompagnement stratégique et création d\'entreprises innovantes',
		technologies: ['Strategy', 'MVP', 'Funding', 'Marketing', 'Growth', 'Leadership'],
		icon: '📈',
		color: 'from-green-500 to-emerald-500',
		projects: 15,
	},
];

export function ExpertiseSection() {
	const [hoveredCard, setHoveredCard] = useState<string | null>(null);

	return (
		<section className="min-h-screen py-20 px-4 relative overflow-hidden">
			{/* Arrière-plan cohérent */}
			<div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(59,130,246,0.1),transparent_50%)]"></div>
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(147,51,234,0.1),transparent_50%)]"></div>

			<div className="container-responsive relative z-10">
				{/* Header de section unifié */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center gap-3 mb-6">
						<div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
							<span className="text-2xl">⚡</span>
						</div>
						<h2 className="text-title bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent font-bold">
							Expertise
						</h2>
					</div>

					<p className="text-subtitle text-white/80 max-w-3xl mx-auto leading-relaxed">
						Des compétences diversifiées pour transformer vos projets en réalités technologiques innovantes,
						de la conception au déploiement en passant par l'optimisation.
					</p>
				</div>

				{/* Grille de cartes d'expertise - Alignement vertical corrigé */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
					{expertiseData.map((expertise, index) => (
						<div
							key={expertise.id}
							className={`liquid-glass p-6 h-full group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 transform hover:scale-[1.02] ${
								hoveredCard === expertise.id ? 'bg-white/5' : ''
							}`}
							onMouseEnter={() => setHoveredCard(expertise.id)}
							onMouseLeave={() => setHoveredCard(null)}
							style={{
								animationDelay: `${index * 100}ms`
							}}
						>
							{/* Header de carte */}
							<div className="flex items-start justify-between mb-4">
								<div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${expertise.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
									{expertise.icon}
								</div>
								<div className="text-right">
									<div className="text-sm text-white/60">Projets</div>
									<div className="text-xl font-bold text-white">{expertise.projects}</div>
								</div>
							</div>

							{/* Contenu */}
							<div className="space-y-4">
								<div>
									<h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
										{expertise.title}
									</h3>
									<p className="text-sm text-blue-300/80 font-medium">
										{expertise.subtitle}
									</p>
								</div>

								<p className="text-white/80 text-sm leading-relaxed">
									{expertise.description}
								</p>

								{/* Technologies */}
								<div className="space-y-2">
									<div className="text-xs text-white/60 font-medium">Technologies clés :</div>
									<div className="flex flex-wrap gap-1">
										{expertise.technologies.slice(0, 4).map((tech, techIndex) => (
											<span
												key={techIndex}
												className="text-xs px-2 py-1 bg-white/10 text-white/90 rounded hover:bg-white/20 transition-colors"
											>
												{tech}
											</span>
										))}
										{expertise.technologies.length > 4 && (
											<span className="text-xs px-2 py-1 bg-white/5 text-white/70 rounded">
												+{expertise.technologies.length - 4}
											</span>
										)}
									</div>
								</div>
							</div>

							{/* Indicateur de progression */}
							<div className="mt-6 pt-4 border-t border-white/10">
								<div className="flex items-center justify-between text-xs text-white/60 mb-2">
									<span>Maîtrise</span>
									<span>{index === 0 ? '95%' : index === 1 ? '88%' : index === 2 ? '85%' : '92%'}</span>
								</div>
								<div className="w-full bg-white/10 rounded-full h-2">
									<div
										className={`h-2 rounded-full bg-gradient-to-r ${expertise.color} transition-all duration-1000 ease-out`}
										style={{
											width: hoveredCard === expertise.id ?
												(index === 0 ? '95%' : index === 1 ? '88%' : index === 2 ? '85%' : '92%') :
												'0%'
										}}
									></div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Section de statistiques */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
					{[
						{ number: '41+', label: 'Projets réalisés', icon: '🎯' },
						{ number: '4', label: 'Domaines d\'expertise', icon: '🚀' },
						{ number: '25+', label: 'Technologies maîtrisées', icon: '⚡' },
						{ number: '100%', label: 'Satisfaction client', icon: '⭐' }
					].map((stat, index) => (
						<div key={index} className="liquid-glass p-4 text-center group hover:bg-white/5 transition-all duration-300">
							<div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
							<div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
							<div className="text-sm text-white/70">{stat.label}</div>
						</div>
					))}
				</div>
			</div>

			{/* Effets visuels d'arrière-plan */}
			<div className="absolute top-1/3 left-16 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
			<div className="absolute bottom-1/3 right-24 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-40 delay-1000"></div>
			<div className="absolute top-2/3 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse opacity-80 delay-500"></div>
		</section>
	);
}
