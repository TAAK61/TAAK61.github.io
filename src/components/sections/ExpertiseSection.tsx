'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 3 domaines principaux selon votre nouvelle orientation
const expertiseData = [
	{
		id: 'development',
		title: 'Développement',
		subtitle: 'Web/Mobile',
		icon: '🌐',
		description: 'Applications web et mobile modernes avec technologies de pointe',
		technologies: ['React', 'Next.js', 'React Native', 'TypeScript', 'Node.js'],
		projects: '25+ projets',
		gradient: 'from-blue-400/30 to-cyan-400/30',
		crystalColor: 'rgba(59, 130, 246, 0.3)',
	},
	{
		id: 'emerging',
		title: 'Technologies Émergentes',
		subtitle: 'VR/AR, IA, 3D',
		icon: '🥽',
		description: 'Réalité virtuelle, intelligence artificielle et expériences immersives',
		technologies: ['Three.js', 'WebXR', 'TensorFlow', 'OpenAI', 'Unity', 'Blender'],
		projects: '18+ projets',
		gradient: 'from-purple-400/30 to-pink-400/30',
		crystalColor: 'rgba(147, 51, 234, 0.3)',
	},
	{
		id: 'entrepreneurship',
		title: 'Entrepreneuriat',
		subtitle: 'Business, Innovation',
		icon: '🚀',
		description: 'Création de startups et innovation business avec solutions tech',
		technologies: ['Strategy', 'Business Model', 'Innovation', 'Leadership', 'Growth Hacking'],
		projects: '12+ startups',
		gradient: 'from-green-400/30 to-emerald-400/30',
		crystalColor: 'rgba(34, 197, 94, 0.3)',
	},
];

export default function ExpertiseSection() {
	const [activeExpertise, setActiveExpertise] = useState<string | null>(null);
	const [isVisible, setIsVisible] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry && entry.isIntersecting) {
					setIsVisible(true);
				}
			},
			{ threshold: 0.1 }
		);

		const section = document.getElementById('expertise');
		if (section) observer.observe(section);

		// Mouse tracking pour les effets de réfraction
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({
				x: (e.clientX / window.innerWidth) * 100,
				y: (e.clientY / window.innerHeight) * 100,
			});
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			observer.disconnect();
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	return (
		<section
			id="expertise"
			className="min-h-screen py-20 relative overflow-hidden"
		>
			{/* Liquid Glass Background avec distorsion */}
			<div
				className="absolute inset-0"
				style={{
					background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(255,255,255,0.05) 0%, 
              rgba(255,255,255,0.02) 30%, 
              transparent 60%),
            linear-gradient(180deg, 
              rgba(0, 0, 0, 0.9) 0%, 
              rgba(30, 30, 50, 0.95) 50%, 
              rgba(0, 0, 0, 0.9) 100%)
          `,
					backdropFilter: 'blur(30px) saturate(150%)',
					WebkitBackdropFilter: 'blur(30px) saturate(150%)',
				}}
			>
				{/* Effet de réfraction liquide */}
				<svg className="absolute inset-0 w-full h-full opacity-20">
					<defs>
						<filter id="expertiseDistortion">
							<feTurbulence
								type="fractalNoise"
								baseFrequency="0.01"
								numOctaves="4"
								result="noise"
							/>
							<feDisplacementMap
								in="SourceGraphic"
								in2="noise"
								scale="15"
							/>
						</filter>
					</defs>
					<rect
						width="100%"
						height="100%"
						filter="url(#expertiseDistortion)"
						fill="rgba(147, 51, 234, 0.05)"
					/>
				</svg>
			</div>

			{/* Particules cristallines optimisées - Réduites de 20 à 6 */}
			<div className="absolute inset-0 pointer-events-none">
				{[...Array(6)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-1 h-1 bg-white/10 rounded-full"
						style={{
							left: `${20 + (i * 15)}%`,
							top: `${30 + (i * 8)}%`,
						}}
						animate={{
							y: [0, -30, 0],
							opacity: [0, 0.6, 0],
							scale: [0.5, 1, 0.5],
						}}
						transition={{
							duration: 4 + Math.random() * 2,
							repeat: Infinity,
							delay: Math.random() * 2,
							ease: 'easeInOut',
						}}
					/>
				))}
			</div>

			<div className="container mx-auto px-6 relative z-10">
				{/* Header avec effet liquid glass */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
					transition={{ duration: 1 }}
					className="text-center mb-16"
				>
					<motion.div
						className="inline-block p-8 rounded-3xl mb-8"
						style={{
							background: `
                linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.1) 0%, 
                  rgba(255, 255, 255, 0.05) 100%)
              `,
							backdropFilter: 'blur(20px) saturate(180%)',
							border: '1px solid rgba(255, 255, 255, 0.2)',
							boxShadow: `
                inset 0 1px 0 rgba(255, 255, 255, 0.3),
                0 20px 40px rgba(0, 0, 0, 0.2),
                0 0 80px rgba(147, 51, 234, 0.2)
              `,
						}}
					>
						<h2
							className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4"
							style={{
								textShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
							}}
						>
							Mon Expertise
						</h2>
						<p className="text-xl text-white/80 max-w-3xl mx-auto">
							3 domaines d'excellence • Équilibre technique-business-innovation
						</p>
					</motion.div>
				</motion.div>

				{/* Grille des expertises avec Cards Liquid Glass */}
				<div className="grid lg:grid-cols-2 gap-8 mb-16">
					{expertiseData.map((expertise, index) => (
						<motion.div
							key={expertise.id}
							initial={{ opacity: 0, y: 50, scale: 0.9 }}
							animate={{
								opacity: isVisible ? 1 : 0,
								y: isVisible ? 0 : 50,
								scale: isVisible ? 1 : 0.9,
							}}
							transition={{ duration: 0.8, delay: index * 0.2 }}
							className="group relative cursor-pointer"
							onMouseEnter={() => setActiveExpertise(expertise.id)}
							onMouseLeave={() => setActiveExpertise(null)}
						>
							{/* Card Liquid Glass avec effet cristal */}
							<motion.div
								className="relative p-8 rounded-3xl h-full"
								style={{
									background: `
                    linear-gradient(135deg, 
                      rgba(255, 255, 255, 0.12) 0%, 
                      rgba(255, 255, 255, 0.06) 50%,
                      rgba(255, 255, 255, 0.08) 100%)
                  `,
									backdropFilter: 'blur(25px) saturate(200%)',
									WebkitBackdropFilter: 'blur(25px) saturate(200%)',
									border: '1px solid rgba(255, 255, 255, 0.25)',
									boxShadow: `
                    inset 0 1px 0 rgba(255, 255, 255, 0.4),
                    inset 0 -1px 0 rgba(255, 255, 255, 0.1),
                    0 20px 40px rgba(0, 0, 0, 0.3),
                    0 0 60px ${expertise.crystalColor}
                  `,
								}}
								whileHover={{
									scale: 1.02,
									y: -10,
									rotateY: 5,
									boxShadow: `
                    inset 0 1px 0 rgba(255, 255, 255, 0.5),
                    0 30px 60px rgba(0, 0, 0, 0.4),
                    0 0 100px ${expertise.crystalColor}
                  `,
								}}
								transition={{ duration: 0.3 }}
							>
								{/* Highlights spéculaires dynamiques */}
								<div
									className="absolute inset-0 rounded-3xl opacity-60"
									style={{
										background: `
                      linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.4) 0%, 
                        transparent 25%, 
                        transparent 75%, 
                        rgba(255, 255, 255, 0.2) 100%)
                    `,
									}}
								/>

								{/* Effet cristal coloré */}
								<div
									className={`absolute inset-0 rounded-3xl opacity-20 bg-gradient-to-br ${expertise.gradient}`}
								/>

								{/* Contenu de la card */}
								<div className="relative z-10">
									{/* Header avec icône */}
									<div className="flex items-center mb-6">
										<motion.div
											className="text-6xl mr-6 p-4 rounded-2xl"
											style={{
												background: `
                          linear-gradient(135deg, 
                            rgba(255, 255, 255, 0.2) 0%, 
                            rgba(255, 255, 255, 0.1) 100%)
                        `,
												backdropFilter: 'blur(10px)',
												border: '1px solid rgba(255, 255, 255, 0.3)',
												boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.4)',
											}}
											animate={{
												rotateY: [0, 10, 0],
												scale: [1, 1.05, 1],
											}}
											transition={{
												duration: 4,
												repeat: Infinity,
												delay: index * 0.5,
											}}
										>
											{expertise.icon}
										</motion.div>
										<div>
											<h3
												className="text-2xl font-bold text-white mb-1"
												style={{
													textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
												}}
											>
												{expertise.title}
											</h3>
											<p className="text-white/70 font-medium">
												{expertise.subtitle}
											</p>
											<span className="text-sm text-white/50">
												{expertise.projects}
											</span>
										</div>
									</div>

									{/* Description */}
									<p className="text-white/80 mb-6 leading-relaxed">
										{expertise.description}
									</p>

									{/* Technologies avec effet liquid */}
									<div className="space-y-3">
										<h4 className="text-sm font-semibold text-white/90 uppercase tracking-wide">
											Technologies clés
										</h4>
										<div className="flex flex-wrap gap-2">
											{expertise.technologies.map((tech, techIndex) => (
												<motion.span
													key={tech}
													className="px-3 py-1 text-sm text-white/80 rounded-full"
													style={{
														background: `
                              linear-gradient(135deg, 
                                rgba(255, 255, 255, 0.15) 0%, 
                                rgba(255, 255, 255, 0.08) 100%)
                            `,
														backdropFilter: 'blur(10px)',
														border: '1px solid rgba(255, 255, 255, 0.2)',
														boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3)',
													}}
													initial={{ scale: 0, opacity: 0 }}
													animate={{ scale: 1, opacity: 1 }}
													transition={{
														delay:
															isVisible ? index * 0.1 + techIndex * 0.05 : 0,
														duration: 0.3,
													}}
													whileHover={{ scale: 1.05, y: -2 }}
												>
													{tech}
												</motion.span>
											))}
										</div>
									</div>
								</div>

								{/* Effet de hover avec animation liquide */}
								<AnimatePresence>
									{activeExpertise === expertise.id && (
										<motion.div
											initial={{ opacity: 0, scale: 0.8 }}
											animate={{ opacity: 1, scale: 1 }}
											exit={{ opacity: 0, scale: 0.8 }}
											className="absolute inset-0 rounded-3xl"
											style={{
												background: `
                          linear-gradient(135deg, 
                            ${expertise.crystalColor} 0%, 
                            rgba(255, 255, 255, 0.1) 50%,
                            ${expertise.crystalColor} 100%)
                        `,
												border: `2px solid ${expertise.crystalColor}`,
											}}
										/>
									)}
								</AnimatePresence>
							</motion.div>
						</motion.div>
					))}
				</div>

				{/* Veille technologique avec contenu dynamique */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
					transition={{ duration: 1, delay: 0.8 }}
					className="relative p-8 rounded-3xl"
					style={{
						background: `
              linear-gradient(135deg, 
                rgba(255, 255, 255, 0.08) 0%, 
                rgba(255, 255, 255, 0.04) 100%)
            `,
						backdropFilter: 'blur(20px) saturate(180%)',
						border: '1px solid rgba(255, 255, 255, 0.2)',
						boxShadow: `
              inset 0 1px 0 rgba(255, 255, 255, 0.3),
              0 20px 40px rgba(0, 0, 0, 0.2)
            `,
					}}
				>
					<h3
						className="text-2xl font-bold text-white mb-6 text-center"
						style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}
					>
						Veille Technologique Continue
					</h3>

					<div className="grid md:grid-cols-4 gap-6">
						{[
							{ domain: 'IA Générative', trend: 'Multimodal AI', growth: '+234%' },
							{ domain: 'Métaverse', trend: 'Spatial Computing', growth: '+89%' },
							{ domain: 'Green Tech', trend: 'Carbon Credits', growth: '+127%' },
							{ domain: 'Edge & Cloud', trend: 'Edge Inference', growth: '+142%' },
						].map((item, index) => (
							<motion.div
								key={item.domain}
								className="text-center p-4 rounded-2xl"
								style={{
									background: `
                    linear-gradient(135deg, 
                      rgba(255, 255, 255, 0.1) 0%, 
                      rgba(255, 255, 255, 0.05) 100%)
                  `,
									backdropFilter: 'blur(10px)',
									border: '1px solid rgba(255, 255, 255, 0.2)',
								}}
								animate={{
									scale: [1, 1.02, 1],
									opacity: [0.8, 1, 0.8],
								}}
								transition={{
									duration: 3,
									delay: index * 0.5,
									repeat: Infinity,
								}}
							>
								<h4 className="text-white font-semibold mb-1">
									{item.domain}
								</h4>
								<p className="text-white/70 text-sm mb-2">
									{item.trend}
								</p>
								<span className="text-green-400 font-bold text-sm">
									{item.growth}
								</span>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
