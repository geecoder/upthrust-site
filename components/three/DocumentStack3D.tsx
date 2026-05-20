'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

const DOCUMENTS = [
  { label: 'STAKEHOLDER MAP', sublabel: 'Week 1', y: 0, z: 0, color: '#0F1A2E', tilt: 0 },
  { label: 'BUSINESS CASE', sublabel: 'Week 3', y: 0.14, z: 0.12, color: '#1F2B42', tilt: 0.04 },
  { label: 'BRD v1.0', sublabel: 'Week 4', y: 0.28, z: 0.24, color: '#2D3F5A', tilt: -0.05 },
  { label: 'PROCESS MAP', sublabel: 'Week 5', y: 0.42, z: 0.36, color: '#A05A26', tilt: 0.03 },
  { label: 'UAT PACK', sublabel: 'Week 10', y: 0.56, z: 0.48, color: '#C5743A', tilt: -0.04 },
];

const FLOW_NODES = [
  { label: 'Elicit', x: -1.8, y: 1.2, color: '#0F1A2E' },
  { label: 'Analyse', x: -0.6, y: 1.5, color: '#1F2B42' },
  { label: 'Document', x: 0.6, y: 1.3, color: '#A05A26' },
  { label: 'Validate', x: 1.8, y: 1.4, color: '#4F6A4A' },
];

function DocumentStack() {
  const groupRef = useRef<THREE.Group>(null);
  const hovered = useRef(false);
  const targetExpand = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Gentle hover float
    groupRef.current.position.y = Math.sin(t * 0.7) * 0.06;
    // Expand on hover
    targetExpand.current += (( hovered.current ? 1 : 0) - targetExpand.current) * delta * 4;
  });

  return (
    <group
      ref={groupRef}
      position={[-0.5, -0.5, 0]}
      onPointerEnter={() => { hovered.current = true; }}
      onPointerLeave={() => { hovered.current = false; }}
    >
      {DOCUMENTS.map((doc, i) => {
        const expandY = targetExpand.current * i * 0.08;
        const expandZ = targetExpand.current * i * 0.06;
        return (
          <group key={i} position={[0, doc.y + expandY, doc.z + expandZ]} rotation={[0, 0, doc.tilt]}>
            <RoundedBox args={[2.6, 0.58, 0.06]} radius={0.04}>
              <meshStandardMaterial color={doc.color} roughness={0.15} metalness={0.05} />
            </RoundedBox>
            {/* White left margin */}
            <mesh position={[-1.1, 0, 0.032]}>
              <planeGeometry args={[0.36, 0.44]} />
              <meshStandardMaterial color="#FAF7F1" opacity={0.12} transparent />
            </mesh>
            {/* Document lines */}
            {[0.12, 0, -0.12].map((lineY, j) => (
              <mesh key={j} position={[0.1, lineY, 0.032]}>
                <planeGeometry args={[1.6 - j * 0.2, 0.022]} />
                <meshStandardMaterial color="#FAF7F1" opacity={0.2 - j * 0.04} transparent />
              </mesh>
            ))}
            {/* Label */}
            <Text position={[-0.78, 0, 0.04]} fontSize={0.075}  color={doc.color === '#C5743A' ? '#FAF7F1' : '#F1DEC4'} anchorX="center" anchorY="middle" letterSpacing={0.1}>
              {doc.label}
            </Text>
            {/* Sublabel */}
            <Text position={[0.88, 0, 0.04]} fontSize={0.065}  color={i === 4 ? '#FAF7F1' : '#4A5468'} anchorX="right" anchorY="middle" letterSpacing={0.08}>
              {doc.sublabel}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

function FlowConnector() {
  const points = FLOW_NODES.map(n => new THREE.Vector3(n.x, n.y, 0));
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: '#E7E1D3', linewidth: 1.5, opacity: 0.6, transparent: true });
  const lineObj = new THREE.Line(geometry, material);
  return (
    <>
      <primitive object={lineObj} />
      {FLOW_NODES.map((node, i) => (
        <group key={i} position={[node.x, node.y, 0]}>
          <mesh>
            <sphereGeometry args={[0.1, 20, 20]} />
            <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.4} roughness={0.2} />
          </mesh>
          <Text position={[0, 0.2, 0]} fontSize={0.08}  color={node.color} anchorX="center" letterSpacing={0.1}>
            {node.label.toUpperCase()}
          </Text>
          {/* Arrow to next */}
          {i < FLOW_NODES.length - 1 && (
            <mesh position={[(FLOW_NODES[i + 1].x - node.x) / 2, (FLOW_NODES[i + 1].y - node.y) / 2 - 0.04, 0]}
              rotation={[0, 0, Math.atan2(FLOW_NODES[i + 1].y - node.y, FLOW_NODES[i + 1].x - node.x)]}>
              <coneGeometry args={[0.045, 0.12, 8]} />
              <meshStandardMaterial color="#E7E1D3" />
            </mesh>
          )}
        </group>
      ))}
    </>
  );
}

function Scene() {
  const sceneRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!sceneRef.current) return;
    const t = state.clock.elapsedTime;
    sceneRef.current.rotation.y = Math.sin(t * 0.18) * 0.2;
    sceneRef.current.rotation.x = Math.sin(t * 0.12) * 0.06;
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 8, 4]} intensity={1.2} color="#FAF7F1" />
      <directionalLight position={[-3, -2, -3]} intensity={0.35} color="#F1DEC4" />

      <group ref={sceneRef}>
        <DocumentStack />
        <FlowConnector />
      </group>
    </>
  );
}

export default function DocumentStack3D({ height = 400 }: { height?: number }) {
  return (
    <div style={{ width: '100%', height }}>
      <Canvas camera={{ position: [0, 0.5, 6.5], fov: 46 }} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
