'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Line, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

type Track = 'PM' | 'BA' | 'Design';

const NODES: Array<{
  label: string;
  track: Track;
  position: [number, number, number];
  size: number;
}> = [
  // Central node
  { label: 'You', track: 'PM', position: [0, 0, 0], size: 0.28 },
  // PM cluster
  { label: 'Strategy', track: 'PM', position: [1.8, 0.6, 0.4], size: 0.18 },
  { label: 'Roadmap', track: 'PM', position: [1.6, -0.5, -0.3], size: 0.15 },
  { label: 'Metrics', track: 'PM', position: [2.1, 0.1, 0.2], size: 0.13 },
  // BA cluster
  { label: 'Requirements', track: 'BA', position: [-1.7, 0.7, 0.3], size: 0.18 },
  { label: 'Process', track: 'BA', position: [-1.9, -0.3, -0.2], size: 0.16 },
  { label: 'UAT', track: 'BA', position: [-1.5, 0.2, 0.5], size: 0.13 },
  // Design cluster
  { label: 'Journey', track: 'Design', position: [0.2, 1.8, 0.5], size: 0.17 },
  { label: 'Prototype', track: 'Design', position: [-0.4, 1.6, -0.3], size: 0.14 },
  { label: 'UX', track: 'Design', position: [0.5, 2.1, 0.1], size: 0.13 },
];

const COLORS = {
  PM: '#0F1A2E',
  BA: '#C5743A',
  Design: '#4F6A4A',
};

const EMISSIVE = {
  PM: '#1F2B42',
  BA: '#A05A26',
  Design: '#3A5036',
};

function Node({ node, t }: { node: typeof NODES[0]; t: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const isCenter = node.label === 'You';
  const pulseScale = isCenter ? 1 + Math.sin(t * 2) * 0.08 : 1 + Math.sin(t * 1.5 + node.position[0]) * 0.05;

  useFrame(() => {
    if (ref.current) {
      ref.current.scale.setScalar(pulseScale);
    }
  });

  return (
    <group position={node.position}>
      <Sphere ref={ref} args={[node.size, 32, 32]}>
        <meshStandardMaterial
          color={isCenter ? '#FAF7F1' : COLORS[node.track]}
          emissive={isCenter ? '#FAF7F1' : EMISSIVE[node.track]}
          emissiveIntensity={isCenter ? 0.2 : 0.4}
          roughness={0.2}
          metalness={0.1}
        />
      </Sphere>
      {node.label !== 'You' && (
        <Text
          position={[0, node.size + 0.1, 0]}
          fontSize={0.08}
          
          color={COLORS[node.track]}
          anchorX="center"
          anchorY="bottom"
          letterSpacing={0.08}
        >
          {node.label.toUpperCase()}
        </Text>
      )}
      {isCenter && (
        <Text
          position={[0, node.size + 0.12, 0]}
          fontSize={0.11}
          
          color="#0F1A2E"
          anchorX="center"
          anchorY="bottom"
        >
          You
        </Text>
      )}
    </group>
  );
}

function ConnectionLines() {
  const connections = [
    // Center to PM
    { from: NODES[0].position, to: NODES[1].position, track: 'PM' as Track },
    { from: NODES[0].position, to: NODES[2].position, track: 'PM' as Track },
    { from: NODES[0].position, to: NODES[3].position, track: 'PM' as Track },
    // Center to BA
    { from: NODES[0].position, to: NODES[4].position, track: 'BA' as Track },
    { from: NODES[0].position, to: NODES[5].position, track: 'BA' as Track },
    { from: NODES[0].position, to: NODES[6].position, track: 'BA' as Track },
    // Center to Design
    { from: NODES[0].position, to: NODES[7].position, track: 'Design' as Track },
    { from: NODES[0].position, to: NODES[8].position, track: 'Design' as Track },
    { from: NODES[0].position, to: NODES[9].position, track: 'Design' as Track },
  ];

  return (
    <>
      {connections.map((conn, i) => (
        <Line
          key={i}
          points={[conn.from, conn.to]}
          color={COLORS[conn.track]}
          lineWidth={1}
          opacity={0.3}
          transparent
        />
      ))}
    </>
  );
}

function TrackLabel({
  position,
  label,
  track,
  t,
}: {
  position: [number, number, number];
  label: string;
  track: Track;
  t: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(t * 0.8 + position[0]) * 0.1;
    }
  });

  return (
    <group ref={ref} position={position}>
      <Text
        fontSize={0.14}
        
        color={COLORS[track]}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.12}
      >
        {label}
      </Text>
    </group>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const t = useRef(0);

  useFrame((state, delta) => {
    t.current = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t.current * 0.2) * 0.3;
      groupRef.current.rotation.x = Math.sin(t.current * 0.15) * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 4]} intensity={1.0} color="#FAF7F1" />
      <directionalLight position={[-4, -2, -2]} intensity={0.4} color="#F1DEC4" />

      <group ref={groupRef}>
        <ConnectionLines />
        {NODES.map((node, i) => (
          <Node key={i} node={node} t={t.current} />
        ))}
        <TrackLabel position={[2.4, 0.2, 0]} label="PM" track="PM" t={t.current} />
        <TrackLabel position={[-2.4, 0.2, 0]} label="BA" track="BA" t={t.current} />
        <TrackLabel position={[0, 2.5, 0]} label="Design" track="Design" t={t.current} />
      </group>
    </>
  );
}

export default function AssessmentBrain3D({ height = 420 }: { height?: number }) {
  return (
    <div style={{ width: '100%', height }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
