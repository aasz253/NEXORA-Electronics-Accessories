"use client";

import { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  ContactShadows,
  Environment,
  useTexture,
  Lightformer,
} from "@react-three/drei";
import * as THREE from "three";

interface CardPlacement {
  texture: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number];
  float?: boolean;
}

const placements: CardPlacement[] = [
  { texture: "/products/pro-earpods.jpeg", position: [-4.6, 0.9, -1], rotation: [0.1, 0.7, 0.05], scale: [2.4, 1.7], float: true },
  { texture: "/products/power-bank.jpeg", position: [0, 1.5, 1.2], rotation: [-0.05, 0, 0.1], scale: [2.1, 1.5], float: true },
  { texture: "/products/headphones.jpeg", position: [4.5, 0.6, -0.6], rotation: [0.05, -0.6, -0.04], scale: [2.5, 1.8], float: true },
  { texture: "/products/oraimo-earphones-bt.jpeg", position: [-2.2, -0.9, -1.8], rotation: [0.15, 0.4, 0], scale: [1.7, 1.2] },
  { texture: "/products/oraimo-charger.jpeg", position: [2.6, -0.8, -1.6], rotation: [-0.1, -0.4, 0.1], scale: [1.7, 1.2] },
  { texture: "/products/phones-1.jpeg", position: [3.4, 1.5, -1.4], rotation: [0, -0.5, 0], scale: [1.3, 1.0] },
];

function ProductCard({ card }: { card: CardPlacement }) {
  const texture = useTexture(card.texture);
  const mesh = useRef<THREE.Mesh>(null);

  const base = useMemo(
    () => ({ x: card.position[0], y: card.position[1] }),
    [card]
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const m = mesh.current;
    if (!m) return;
    // gentle independent bobbing in depth
    m.position.x = base.x + Math.sin(t * 0.4 + base.x) * 0.12;
    m.position.y = base.y + Math.sin(t * 0.5 + base.y) * 0.08;
  });

  const floatProps = card.float
    ? { speed: 1.4, rotationIntensity: 0.3, floatIntensity: 0.8 }
    : { speed: 1.2, rotationIntensity: 0.1, floatIntensity: 0.4 };

  return (
    <Float {...floatProps}>
      <mesh
        ref={mesh}
        position={card.position}
        rotation={card.rotation}
        scale={[card.scale[0], card.scale[1], 1]}
      >
        <planeGeometry args={[1.9, 1.45, 1, 1]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.25}
          metalness={0.1}
          transparent
        />
      </mesh>
      {/* frame */}
      <mesh position={[card.position[0], card.position[1], card.position[2] - 0.03]}>
        <planeGeometry args={[2, 1.55]} />
        <meshStandardMaterial color="#0f1d13" roughness={0.6} metalness={0.4} />
      </mesh>
    </Float>
  );
}

function GlowOrbs() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });
  const orbs: { pos: [number, number, number]; color: string; size: number }[] = [
    { pos: [-5, 1.5, -3], color: "#ffc400", size: 0.25 },
    { pos: [5, 2, -3], color: "#d4f34a", size: 0.2 },
    { pos: [0, -1.8, -2], color: "#ffb300", size: 0.3 },
  ];
  return (
    <group ref={group}>
      {orbs.map((o, i) => (
        <mesh key={i} position={o.pos}>
          <sphereGeometry args={[o.size, 16, 16]} />
          <meshBasicMaterial color={o.color} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

/** Parallax camera rig that responds to pointer */
function CameraRig() {
  const { camera, pointer } = useThree();
  const scroll = useRef(0);
  const target = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    const t = THREE.MathUtils.damp(
      camera.position.x,
      pointer.x * 0.9,
      1.5,
      state.clock.getDelta()
    );
    const y = THREE.MathUtils.damp(
      camera.position.y,
      pointer.y * 0.5,
      1.5,
      state.clock.getDelta()
    );
    scroll.current = THREE.MathUtils.damp(
      scroll.current,
      window.scrollY / window.innerHeight,
      2,
      state.clock.getDelta()
    );
    const z = 9 + scroll.current * (typeof window === "undefined" ? 0 : 3);
    camera.position.set(t, y, z);
    camera.lookAt(target.current);
  });
  return null;
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 6, 4]} intensity={1.1} color="#e8f7c2" />
        <pointLight position={[-4, 2, 2]} intensity={1.6} color="#ffc400" />
        <pointLight position={[4, -1, 3]} intensity={1.4} color="#e6ff7a" />
        <pointLight position={[0, 3, -2]} intensity={0.8} color="#ffb300" />

        <GlowOrbs />

        {placements.map((c) => (
          <ProductCard key={c.texture} card={c} />
        ))}

        <ContactShadows
          position={[0, -2.6, 0]}
          opacity={0.55}
          scale={20}
          blur={2.6}
          far={5}
          color="#000000"
        />

        <Environment resolution={256}>
          <Lightformer
            form="rect"
            intensity={2}
            position={[0, 4, 2]}
            scale={[8, 4, 1]}
            color="#e6ff7a"
          />
          <Lightformer
            form="rect"
            intensity={1.4}
            position={[-5, 0, 2]}
            scale={[3, 6, 1]}
            color="#ffc400"
          />
        </Environment>
        <CameraRig />
      </Suspense>
    </Canvas>
  );
}
