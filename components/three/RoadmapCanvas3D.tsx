'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const MILESTONES = [
  { label: 'Discovery', sublabel: 'Problem Brief', x: -2.6, color: '#C5743A', done: true },
  { label: 'Define', sublabel: 'PRD v1', x: -1.3, color: '#0F1A2E', done: true },
  { label: 'Build', sublabel: 'Sprint 1', x: 0, color: '#4F6A4A', done: false, active: true },
  { label: 'Launch', sublabel: 'UAT', x: 1.3, color: '#1F2B42', done: false },
  { label: 'Iterate', sublabel: 'Metrics', x: 2.6, color: '#1F2B42', done: false },
];

const FEATURE_CARDS = [
  { label: 'User Auth', width: 1.0, x: -1.8, y: 0.8, z: 0.6, track: 'Q1', color: '#0F1A2E' },
  { label: 'Onboarding Flow', width: 1.3, x: -0.3, y: 0.8, z: 0.3, track: 'Q1', color: '#0F1A2E' },
  { label: 'Dashboard v1', width: 1.1, x: 1.2, y: 0.8, z: 0.5, track: 'Q2', color: '#4F6A4A' },
  { label: 'Notifications', width: 0.9, x: 2.5, y: 0.8, z: 0.4, track: 'Q2', color: '#4F6A4A' },
  { label: 'Analytics', width: 1.0, x: -1.4, y: 1.5, z: 0.7, track: 'Q3', color: '#C5743A' },
  { label: 'API Integration', width: 1.2, x: 0.4, y: 1.5, z: 0.5, track: 'Q3', color: '#C5743A' },
];

function RoadmapLine() {
  const points = MILESTONES.map(m => new THREE.Vector3(m.x, -0.2, 0));
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: '#E7E1D3', linewidth: 2 });
  const lineObj = new THREE.Line(geometry, material);
  return <primitive object={lineObj} />;
}

function Milestone({ m, index }: { m: typeof MILESTONES[0]; index: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    if (m.active) {
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2.5) * 0.06);
    }
  });

  return (
    <group ref={ref} position={[m.x, -0.2, 0]}>
      {/* Node sphere */}
      <mesh>
        <sphereGeometry args={[m.active ? 0.14 : 0.1, 24, 24]} />
        <meshStandardMaterial
          color={m.color}
          emissive={m.color}
          emissiveIntensity={m.active ? 0.5 : m.done ? 0.2 : 0.05}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
      {/* Active glow ring */}
      {m.active && (
        <mesh>
          <ringGeometry args={[0.18, 0.22, 32]} />
          <meshStandardMaterial color="#C5743A" emissive="#C5743A" emissiveIntensity={0.6} side={THREE.DoubleSide} />
        </mesh>
      )}
      {/* Label below */}
      <Text position={[0, -0.28, 0]} fontSize={0.085}  color={m.done ? '#0F1A2E' : '#4A5468'} anchorX="center" letterSpacing={0.08}>
        {m.label.toUpperCase()}
      </Text>
      <Text position={[0, -0.41, 0]} fontSize={0.07}  color={m.active ? '#C5743A' : '#9AA5B4'} anchorX="center">
        {m.sublabel}
      </Text>
    </group>
  );
}

function FeatureCard({ card }: { card: typeof FEATURE_CARDS[0] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = card.y + Math.sin(state.clock.elapsedTime * 0.8 + card.x) * 0.04;
  });

  return (
    <group ref={ref} position={[card.x, card.y, card.z]}>
      <RoundedBox args={[card.width, 0.32, 0.06]} radius={0.03}>
        <meshStandardMaterial color={card.color} roughness={0.15} metalness={0.05} />
      </RoundedBox>
      <Text position={[0, 0, 0.04]} fontSize={0.075}  color="#FAF7F1" anchorX="center" anchorY="middle" letterSpacing={0.05}>
        {card.label.toUpperCase()}
      </Text>
      {/* Track badge */}
      <RoundedBox args={[0.28, 0.16, 0.03]} radius={0.02} position={[card.width / 2 - 0.18, 0.22, 0.02]}>
        <meshStandardMaterial color="#FAF7F1" opacity={0.15} transparent />
      </RoundedBox>
      <Text position={[card.width / 2 - 0.18, 0.22, 0.04]} fontSize={0.055}  color="#F1DEC4" anchorX="center" anchorY="middle" letterSpacing={0.1}>
        {card.track}
      </Text>
    </group>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x = -0.18 + Math.sin(state.clock.elapsedTime * 0.25) * 0.04;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 8, 5]} intensity={1.2} color="#FAF7F1" />
      <directionalLight position={[-3, -2, -3]} intensity={0.3} color="#F1DEC4" />
      <pointLight position={[0, 2, 3]} intensity={0.6} color="#FAF7F1" />

      <group ref={groupRef}>
        <RoadmapLine />
        {MILESTONES.map((m, i) => <Milestone key={i} m={m} index={i} />)}
        {FEATURE_CARDS.map((card, i) => <FeatureCard key={i} card={card} />)}

        {/* Grid base plane */}
        <mesh position={[0, -0.65, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[7, 3.5, 14, 7]} />
          <meshStandardMaterial color="#E7E1D3" wireframe opacity={0.2} transparent />
        </mesh>
      </group>
    </>
  );
}

export default function RoadmapCanvas3D({ height = 400 }: { height?: number }) {
  return (
    <div style={{ width: '100%', height }}>
      <Canvas camera={{ position: [0, 2.5, 6], fov: 46 }} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
