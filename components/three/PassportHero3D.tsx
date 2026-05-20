'use client';

import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, Text, Float, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Individual floating skill badge
function SkillBadge({
  position,
  label,
  color,
  speed,
  radius,
  angleOffset,
}: {
  position: [number, number, number];
  label: string;
  color: string;
  speed: number;
  radius: number;
  angleOffset: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const angle = useRef(angleOffset);

  useFrame((_, delta) => {
    if (!ref.current) return;
    angle.current += speed * delta;
    ref.current.position.x = Math.cos(angle.current) * radius;
    ref.current.position.z = Math.sin(angle.current) * radius;
    ref.current.position.y = position[1] + Math.sin(angle.current * 0.7) * 0.15;
    ref.current.rotation.y = -angle.current * 0.5;
  });

  return (
    <group ref={ref} position={position}>
      <RoundedBox args={[1.4, 0.38, 0.06]} radius={0.04}>
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
      </RoundedBox>
      <Text
        position={[0, 0, 0.04]}
        fontSize={0.11}
        
        color="#FAF7F1"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        {label.toUpperCase()}
      </Text>
    </group>
  );
}

// The passport document itself
function PassportDocument() {
  const ref = useRef<THREE.Group>(null);
  const hovered = useRef(false);
  const targetRotY = useRef(0);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    // Gentle idle float
    ref.current.position.y = Math.sin(t * 0.6) * 0.08;
    // Smooth rotation toward target
    ref.current.rotation.y += (targetRotY.current - ref.current.rotation.y) * delta * 3;
    if (!hovered.current) {
      targetRotY.current = Math.sin(t * 0.3) * 0.4;
    }
  });

  return (
    <group
      ref={ref}
      onPointerEnter={() => { hovered.current = true; targetRotY.current = 0.6; }}
      onPointerLeave={() => { hovered.current = false; }}
    >
      {/* Main document body */}
      <RoundedBox args={[2.4, 3.2, 0.1]} radius={0.06} position={[0, 0, 0]}>
        <meshStandardMaterial color="#0F1A2E" roughness={0.1} metalness={0.05} />
      </RoundedBox>

      {/* Dark header band */}
      <mesh position={[0, 1.35, 0.06]}>
        <planeGeometry args={[2.4, 0.5]} />
        <meshStandardMaterial color="#1F2B42" />
      </mesh>

      {/* Amber accent line */}
      <mesh position={[0, 1.08, 0.061]}>
        <planeGeometry args={[2.4, 0.028]} />
        <meshStandardMaterial color="#C5743A" emissive="#C5743A" emissiveIntensity={0.4} />
      </mesh>

      {/* Header text: UPTHRUST */}
      <Text
        position={[-0.6, 1.34, 0.07]}
        fontSize={0.145}
        
        color="#FAF7F1"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.12}
      >
        UPTHRUST
      </Text>

      {/* Small text: CAPABILITY PASSPORT */}
      <Text
        position={[-0.6, 1.18, 0.07]}
        fontSize={0.065}
        
        color="#F1DEC4"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.14}
      >
        CAPABILITY PASSPORT
      </Text>

      {/* Avatar placeholder circle */}
      <mesh position={[-0.72, 0.52, 0.07]}>
        <circleGeometry args={[0.3, 32]} />
        <meshStandardMaterial color="#1F2B42" />
      </mesh>
      <mesh position={[-0.72, 0.52, 0.075]}>
        <circleGeometry args={[0.28, 32]} />
        <meshStandardMaterial color="#2D3F5A" />
      </mesh>

      {/* Name line */}
      <Text
        position={[0.1, 0.68, 0.07]}
        fontSize={0.14}
        
        color="#FAF7F1"
        anchorX="left"
        anchorY="middle"
      >
        Adaeze Okonkwo
      </Text>
      <Text
        position={[0.1, 0.5, 0.07]}
        fontSize={0.065}
        
        color="#C5743A"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.06}
      >
        BUSINESS ANALYSIS
      </Text>

      {/* Capability score bars */}
      {[
        { label: 'Requirements', score: 0.87, y: 0.1 },
        { label: 'Stakeholders', score: 0.83, y: -0.08 },
        { label: 'Process Design', score: 0.71, y: -0.26 },
        { label: 'UAT Planning', score: 0.85, y: -0.44 },
      ].map((item, i) => (
        <group key={i} position={[-0.94, item.y, 0.07]}>
          <Text fontSize={0.055}  color="#B5C0D4" anchorX="left" anchorY="middle" letterSpacing={0.04}>
            {item.label.toUpperCase()}
          </Text>
          {/* Bar background */}
          <mesh position={[0.86, -0.08, 0]}>
            <planeGeometry args={[1.72, 0.028]} />
            <meshStandardMaterial color="#1F2B42" />
          </mesh>
          {/* Bar fill */}
          <mesh position={[0.86 - (1.72 * (1 - item.score)) / 2, -0.08, 0.002]}>
            <planeGeometry args={[1.72 * item.score, 0.028]} />
            <meshStandardMaterial
              color={item.score >= 0.8 ? '#4F6A4A' : '#C5743A'}
              emissive={item.score >= 0.8 ? '#4F6A4A' : '#C5743A'}
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>
      ))}

      {/* VERIFIED stamp */}
      <group position={[0.6, -0.7, 0.072]}>
        <mesh>
          <circleGeometry args={[0.35, 32]} />
          <meshStandardMaterial color="#4F6A4A" opacity={0.15} transparent />
        </mesh>
        <mesh rotation={[0, 0, -0.2]}>
          <ringGeometry args={[0.3, 0.34, 32]} />
          <meshStandardMaterial color="#4F6A4A" />
        </mesh>
        <Text fontSize={0.075}  color="#4F6A4A" anchorX="center" anchorY="middle" letterSpacing={0.1}>
          VERIFIED
        </Text>
      </group>

      {/* Bottom ID line */}
      <Text
        position={[0, -1.42, 0.07]}
        fontSize={0.045}
        
        color="#4A5468"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
      >
        UP-C1-0047-BA · upthrustdigital.com/verify
      </Text>

      {/* Subtle card sheen on hover */}
      <RoundedBox args={[2.4, 3.2, 0.001]} radius={0.06} position={[0, 0, 0.055]}>
        <MeshTransmissionMaterial
          backside={false}
          samples={4}
          thickness={0.01}
          roughness={0.05}
          transmission={0.3}
          ior={1.4}
          chromaticAberration={0.02}
          distortionScale={0}
          temporalDistortion={0}
          color="#FAF7F1"
          opacity={0.08}
          transparent
        />
      </RoundedBox>
    </group>
  );
}

// Scene wrapper
function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#FAF7F1" />
      <directionalLight position={[-4, -2, -4]} intensity={0.3} color="#C5743A" />
      <pointLight position={[0, 0, 4]} intensity={0.5} color="#FAF7F1" />

      <Environment preset="city" />

      <Float speed={0.4} rotationIntensity={0} floatIntensity={0}>
        <PassportDocument />
      </Float>

      {/* Orbiting skill badges */}
      <SkillBadge position={[0, 0.8, 0]} label="PRD Writing" color="#0F1A2E" speed={0.5} radius={2.2} angleOffset={0} />
      <SkillBadge position={[0, 0.2, 0]} label="BRD & Requirements" color="#A05A26" speed={0.4} radius={2.5} angleOffset={2.1} />
      <SkillBadge position={[0, -0.3, 0]} label="Stakeholder Mgmt" color="#0F1A2E" speed={0.45} radius={2.3} angleOffset={4.2} />
      <SkillBadge position={[0, 0.5, 0]} label="UAT Planning" color="#4F6A4A" speed={0.35} radius={2.4} angleOffset={1.05} />
      <SkillBadge position={[0, -0.6, 0]} label="Process Mapping" color="#A05A26" speed={0.42} radius={2.1} angleOffset={3.15} />
    </>
  );
}

// Public component — lazy loaded, with fallback
export default function PassportHero3D({ height = 540 }: { height?: number }) {
  const [canRender, setCanRender] = useState(false);

  // Delay render to avoid SSR/hydration issues
  if (typeof window !== 'undefined' && !canRender) {
    // Use requestAnimationFrame to defer until next frame
    requestAnimationFrame(() => setCanRender(true));
  }

  if (!canRender) {
    return (
      <div style={{
        width: '100%', height,
        background: 'linear-gradient(135deg, #0F1A2E 0%, #1F2B42 100%)',
        borderRadius: 4,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid rgba(197,116,58,0.3)', borderTopColor: '#C5743A', animation: 'spin 800ms linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height, cursor: 'grab' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
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
