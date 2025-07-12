'use client';

import { useState } from 'react';

const collaborationTypes = [
	{
		id: 'investment',
		title: 'Investissement & Financement',
		description:
			'Recherche d\'investisseurs pour projets innovants et startups tech',
		icon: '💰',
		features: [
			'Pitch deck professionnel',
			'Business plan détaillé',
			'Proof of concept',
			'Roadmap technique',
		],
		gradient: 'from-yellow-500 to-orange-600',
	},
	{
		id: 'project-conception',
		title: 'Conception de projets',
		description: 'Création de solutions IT innovantes sur mesure',
		icon: '🎯',
		features: [
			'Analyse des besoins',
			'Architecture technique',
			'Prototypage rapide',
			'Accompagnement complet',
		],
		gradient: 'from-blue-500 to-purple-600',
	},
	{
		id: 'startup-creation',
		title: 'Création de startups',
		description: 'Développement de nouvelles entreprises tech',
		icon: '🚀',
		features: [
			'Idéation et validation',
			'Équipe technique',
			'MVP development',
			'Go-to-market strategy',
		],
		gradient: 'from-green-500 to-teal-600',
	},
	{
		id: 'commercial',
		title: 'Missions commerciales',
		description: 'Développement d\'applications et solutions business',
		icon: '💼',
		features: [
			'Développement sur mesure',
			'Consulting technique',
			'Formation équipes',
			'Support maintenance',
		],
		gradient: 'from-purple-500 to-pink-600',
	},
];

export function CollaborationSection() {
	const [selectedType, setSelectedType] = useState<string | null>(null);
	const [hoveredCard, setHoveredCard] = useState<string | null>(null);

	return (
		<section className="min-h-screen py-20 px-4 relative overflow-hidden">
			{/* Arrière-plan cohérent */}
			<div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(59,130,246,0.1),transparent_50%)]"></div>
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(147,51,234,0.1),transparent_50%)]"></div>

			<div className="container-responsive relative z-10">
				{/* Header de section unifié */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center gap-3 mb-6">
						<div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
							<span className="text-2xl">🤝</span>
						</div>
						<h2 className="text-title bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent font-bold">
							Collaboration
						</h2>
					</div>

					<p className="text-subtitle text-white/80 max-w-3xl mx-auto leading-relaxed">
						Travaillons ensemble pour donner vie à vos projets les plus ambitieux.
						De l'idée au lancement, je vous accompagne à chaque étape de votre
						transformation digitale.
					</p>
				</div>

				{/* Types de collaboration - Grille verticale corrigée */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
					{collaborationTypes.map((type, index) => (
						<div
							key={type.id}
							className={`liquid-glass p-6 h-full group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 transform hover:scale-[1.02] ${
								hoveredCard === type.id ? 'bg-white/5' : ''
							} ${selectedType === type.id ? 'ring-2 ring-blue-500/50' : ''}`}
							onMouseEnter={() => setHoveredCard(type.id)}
							onMouseLeave={() => setHoveredCard(null)}
							onClick={() =>
								setSelectedType(
									selectedType === type.id ? null : type.id
								)
							}
							style={{
								animationDelay: `${index * 150}ms`,
							}}
						>
							{/* Header de carte */}
							<div className="text-center mb-6">
								<div
									className={`w-16 h-16 rounded-xl bg-gradient-to-r ${type.gradient} flex items-center justify-center text-3xl shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
								>
									{type.icon}
								</div>
								<h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
									{type.title}
								</h3>
								<p className="text-white/80 text-sm leading-relaxed">
									{type.description}
								</p>
							</div>

							{/* Fonctionnalités */}
							<div className="space-y-3">
								<div className="text-xs text-white/60 font-medium text-center">
									Inclus :
								</div>
								<div className="space-y-2">
									{type.features.map((feature, featureIndex) => (
										<div
											key={featureIndex}
											className="flex items-center gap-2 text-sm text-white/90"
										>
											<div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></div>
											<span>{feature}</span>
										</div>
									))}
								</div>
							</div>

							{/* Bouton d'action */}
							<div className="mt-6 pt-4 border-t border-white/10">
								<button
									className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
										selectedType === type.id
											? 'bg-blue-500/20 text-blue-300 border border-blue-500/50'
											: 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white border border-white/20 hover:border-white/40'
									}`}
								>
									{selectedType === type.id
										? 'Sélectionné ✓'
										: 'En savoir plus'}
								</button>
							</div>
						</div>
					))}
				</div>

				{/* Section contact et planning */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
					{/* Formulaire de contact simplifié */}
					<div className="liquid-glass p-8">
						<h3 className="text-2xl font-bold text-white mb-6 text-center">
							📧 Discutons de votre projet
						</h3>
						<div className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm text-white/80 mb-2">
										Nom *
									</label>
									<input
										type="text"
										className="w-full p-3 bg-white/10 text-white rounded-lg border border-white/20 focus:border-blue-500/50 outline-none transition-colors"
										placeholder="Votre nom"
									/>
								</div>
								<div>
									<label className="block text-sm text-white/80 mb-2">
										Email *
									</label>
									<input
										type="email"
										className="w-full p-3 bg-white/10 text-white rounded-lg border border-white/20 focus:border-blue-500/50 outline-none transition-colors"
										placeholder="votre@email.com"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm text-white/80 mb-2">
									Type de collaboration
								</label>
								<select className="w-full p-3 bg-white/10 text-white rounded-lg border border-white/20 focus:border-blue-500/50 outline-none">
									<option value="">Sélectionnez un type</option>
									{collaborationTypes.map((type) => (
										<option key={type.id} value={type.id}>
											{type.title}
										</option>
									))}
								</select>
							</div>

							<div>
								<label className="block text-sm text-white/80 mb-2">
									Message *
								</label>
								<textarea
									rows={4}
									className="w-full p-3 bg-white/10 text-white rounded-lg border border-white/20 focus:border-blue-500/50 outline-none transition-colors resize-none"
									placeholder="Décrivez votre projet et vos besoins..."
								></textarea>
							</div>

							<button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-[1.02]">
								Envoyer le message 🚀
							</button>
						</div>
					</div>

					{/* Planning et disponibilités */}
					<div className="liquid-glass p-8">
						<h3 className="text-2xl font-bold text-white mb-6 text-center">
							📅 Planifier un rendez-vous
						</h3>

						<div className="space-y-6">
							{/* Calendrier simplifié */}
							<div className="bg-white/5 rounded-lg p-4">
								<h4 className="text-lg font-semibold text-white mb-4">
									Disponibilités cette semaine
								</h4>
								<div className="space-y-3">
									{['Lundi 15h-17h', 'Mercredi 14h-16h', 'Vendredi 10h-12h'].map(
										(slot, index) => (
											<button
												key={index}
												className="w-full p-3 bg-white/10 text-white rounded-lg border border-white/20 hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-300 text-left"
											>
												<span className="font-medium">{slot}</span>
												<span className="float-right text-green-400">
													✓ Disponible
												</span>
											</button>
										)
									)}
								</div>
							</div>

							{/* Informations de contact */}
							<div className="space-y-4">
								<div className="text-center">
									<p className="text-white/80 mb-4">
										Ou contactez-moi directement :
									</p>
									<div className="space-y-2">
										<a
											href="mailto:contact@taak61.com"
											className="block text-blue-400 hover:text-blue-300 transition-colors"
										>
											📧 contact@taak61.com
										</a>
										<a
											href="tel:+33123456789"
											className="block text-blue-400 hover:text-blue-300 transition-colors"
										>
											📞 +33 1 23 45 67 89
										</a>
										<div className="text-white/70">
											📍 Paris, France (Remote possible)
										</div>
									</div>
								</div>
							</div>

							<div className="text-center pt-4 border-t border-white/10">
								<p className="text-sm text-white/60">
									⚡ Réponse garantie sous 24h
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Section testimonials/process */}
				<div className="text-center">
					<h3 className="text-2xl font-bold text-white mb-8">
						🌟 Processus de collaboration
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{[
							{
								step: '1',
								title: 'Analyse',
								description:
									'Étude approfondie de votre projet et définition des objectifs',
								icon: '🔍',
							},
							{
								step: '2',
								title: 'Conception',
								description:
									'Création de la solution technique adaptée à vos besoins',
								icon: '⚙️',
							},
							{
								step: '3',
								title: 'Réalisation',
								description:
									'Développement et livraison de votre projet avec accompagnement',
								icon: '🚀',
							},
						].map((process, index) => (
							<div
								key={index}
								className="liquid-glass p-6 text-center group hover:bg-white/5 transition-all duration-300"
							>
								<div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform">
									{process.icon}
								</div>
								<div className="text-sm text-blue-400 font-medium mb-2">
									Étape {process.step}
								</div>
								<h4 className="text-lg font-bold text-white mb-3">
									{process.title}
								</h4>
								<p className="text-white/80 text-sm leading-relaxed">
									{process.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Effets visuels d'arrière-plan */}
			<div className="absolute top-1/4 right-16 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
			<div className="absolute bottom-1/4 left-24 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-40 delay-1000"></div>
			<div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse opacity-80 delay-500"></div>
		</section>
	);
}
