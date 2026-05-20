'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Sphere, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

// A floating "capability" cube with text on each face
function CapabilityCube({ position, label, color, rotSpeed }: {
  position: [number, number, number];
  label: string;
  color: string;
  rotSpeed: [number, number, number];
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += rotSpeed[0] * delta;
    ref.current.rotation.y += rotSpeed[1] * delta;
    ref.current.rotation.z += rotSpeed[2] * delta;
  });

  return (
    <Float speed={0.8} rotationIntensity={0} floatIntensity={0.3}>
      <group ref={ref} position={position}>
        <RoundedBox args={[0.7, 0.7, 0.7]} radius={0.06}>
          <meshStandardMaterial color={color} roughness={0.15} metalness={0.1} />
        </RoundedBox>
        {/* Face labels */}
        {[
          { pos: [0, 0, 0.37] as [number, number, number], rot: [0, 0, 0] as [number, number, number] },
          { pos: [0, 0, -0.37] as [number, number, number], rot: [0, Math.PI, 0] as [number, number, number] },
        ].map((face, i) => (
          <Text key={i} position={face.pos} rotation={face.rot} fontSize={0.08}  color="#FAF7F1" anchorX="center" anchorY="middle" letterSpacing={0.06}>
            {label.toUpperCase()}
          </Text>
        ))}
      </group>
    </Float>
  );
}

// Connecting orbit ring
function OrbitRing({ radius, color, speed }: { radius: number; color: string; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += speed * delta;
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 4, 0, 0]}>
      <torusGeometry args={[radius, 0.008, 16, 64]} />
      <meshStandardMaterial color={color} opacity={0.2} transparent />
    </mesh>
  );
}

// Central emblem
function CentralEmblem() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.08;
  });

  return (
    <group ref={ref}>
      <Sphere args={[0.5, 32, 32]}>
        <meshStandardMaterial color="#0F1A2E" roughness={0.1} metalness={0.15} />
      </Sphere>
      {/* Upthrust mark SVG approximated in 3D */}
      {/* Vertical spine */}
      <mesh position={[0, 0, 0.52]}>
        <planeGeometry args={[0.04, 0.5]} />
        <meshStandardMaterial color="#C5743A" emissive="#C5743A" emissiveIntensity={0.6} />
      </mesh>
      {/* Left diagonal */}
      <mesh position={[-0.14, -0.06, 0.52]} rotation={[0, 0, 0.4]}>
        <planeGeometry args={[0.04, 0.35]} />
        <meshStandardMaterial color="#FAF7F1" emissive="#FAF7F1" emissiveIntensity={0.3} />
      </mesh>
      {/* Right diagonal */}
      <mesh position={[0.14, -0.06, 0.52]} rotation={[0, 0, -0.4]}>
        <planeGeometry args={[0.04, 0.35]} />
        <meshStandardMaterial color="#FAF7F1" emissive="#FAF7F1" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

function Scene() {
  const sceneRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!sceneRef.current) return;
    sceneRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.0} color="#FAF7F1" />
      <directionalLight position={[-3, -3, -4]} intensity={0.3} color="#F1DEC4" />
      <pointLight position={[0, 0, 3]} intensity={0.5} color="#C5743A" />

      <group ref={sceneRef}>
        <CentralEmblem />
        <OrbitRing radius={1.6} color="#C5743A" speed={0.4} />
        <OrbitRing radius={2.2} color="#4F6A4A" speed={-0.25} />

        <CapabilityCube position={[-2.2, 0.6, 0.2]} label="PM" color="#0F1A2E" rotSpeed={[0.2, 0.4, 0.1]} />
        <CapabilityCube position={[2.2, 0.4, -0.3]} label="BA" color="#A05A26" rotSpeed={[-0.15, 0.3, 0.2]} />
        <CapabilityCube position={[0.4, 1.8, 0.5]} label="UX" color="#4F6A4A" rotSpeed={[0.3, -0.2, 0.1]} />
        <CapabilityCube position={[-1.6, -1.4, 0.4]} label="PRD" color="#1F2B42" rotSpeed={[0.1, 0.35, -0.15]} />
        <CapabilityCube position={[1.8, -1.2, -0.2]} label="BRD" color="#A05A26" rotSpeed={[-0.2, 0.2, 0.3]} />
      </group>
    </>
  );
}

export default function AcceleratorHero3D({ height = 480 }: { height?: number }) {
  return (
    <div style={{ width: '100%', height }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 46 }} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
