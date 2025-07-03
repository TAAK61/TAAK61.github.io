'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Composant pour les objets 3D flottants représentant les compétences
function FloatingSkillObject({ position, skill, color, icon }: {
  position: [number, number, number];
  skill: string;
  color: string;
  icon: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;

      // Animation au survol
      const scale = hovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        {/* Géométrie cristalline pour représenter les compétences */}
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.8}
          roughness={0.1}
          metalness={0.9}
          envMapIntensity={1}
        />

        {/* Texte 3D pour le nom de la compétence */}
        {hovered && (
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.2}
            height={0.02}
            position={[0, -1.5, 0]}
          >
            {skill}
            <meshStandardMaterial color="white" />
          </Text3D>
        )}
      </mesh>
    </Float>
  );
}

// Système de particules avancé
function ParticleSystem() {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.rotation.x += 0.0005;
    }
  });

  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="white"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Scene 3D principale
function ThreeScene() {
  const skills = [
    { name: 'React/Next.js', position: [-3, 2, 0], color: '#61DAFB', icon: '⚛️' },
    { name: 'Three.js', position: [3, 1, -1], color: '#000000', icon: '🎯' },
    { name: 'Blockchain', position: [-2, -1, 1], color: '#FFD700', icon: '₿' },
    { name: 'WebXR/AR', position: [2, -2, 0], color: '#FF6B6B', icon: '🥽' },
    { name: 'AI/ML', position: [0, 3, -2], color: '#4ECDC4', icon: '🤖' },
    { name: 'TypeScript', position: [-1, 0, 2], color: '#3178C6', icon: '📘' },
  ];

  return (
    <>
      {/* Éclairage avancé */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0099ff" />

      {/* Environnement pour les reflets */}
      <Environment preset="city" />

      {/* Objets flottants des compétences */}
      {skills.map((skill, index) => (
        <FloatingSkillObject
          key={index}
          position={skill.position as [number, number, number]}
          skill={skill.name}
          color={skill.color}
          icon={skill.icon}
        />
      ))}

      {/* Système de particules */}
      <ParticleSystem />

      {/* Contrôles de caméra subtils */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
}

export function ThreeJSScene() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        className="pointer-events-auto"
      >
        <ThreeScene />
      </Canvas>
    </div>
  );
}
