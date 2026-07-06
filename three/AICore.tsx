"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Instances, Instance, Environment } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

class InfinityCurve extends THREE.Curve<THREE.Vector3> {
  scale: number;
  constructor(scale = 1) {
    super();
    this.scale = scale;
  }
  getPoint(t: number, optionalTarget = new THREE.Vector3()) {
    const t2 = 2 * Math.PI * t;
    const x = Math.sin(t2) * 2.5;
    const y = Math.sin(t2) * Math.cos(t2) * 1.5;
    const z = Math.cos(t2) * 0.8;
    return optionalTarget.set(x, y, z).multiplyScalar(this.scale);
  }
}

export default function AICore() {
  const lightGroupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const particlesCount = 100;
  
  // Scale down on mobile if viewport width is narrow
  const responsiveScale = viewport.width < 6 ? viewport.width / 6 : 1;
  
  const infinityGeo = useMemo(() => {
    const path = new InfinityCurve(1.6);
    // Thinner tube for an elegant, premium look
    return new THREE.TubeGeometry(path, 256, 0.08, 64, true);
  }, []);
  
  useFrame((state) => {
    if (lightGroupRef.current) {
      // Slower, elegant light sweep
      lightGroupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      lightGroupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <>
      <color attach="background" args={["#000000"]} />
      
      {/* Studio Environment for highly realistic silver reflections */}
      <Environment preset="studio" />
      
      {/* Extremely low ambient light so the background stays pitch black */}
      <ambientLight intensity={0.1} />

      {/* Rotating Light Rig for dynamic premium highlights */}
      <group ref={lightGroupRef}>
        <pointLight position={[5, 2, 5]} intensity={5} color="#aaccff" />
        <pointLight position={[-5, -2, -5]} intensity={5} color="#c088ff" />
        <spotLight position={[0, 8, 0]} intensity={8} color="#ffffff" penumbra={1} angle={0.5} />
      </group>
      
      <group scale={responsiveScale}>
        <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1}>
          <mesh geometry={infinityGeo}>
            <meshPhysicalMaterial
              color="#333333" // Darker base so only reflections pop
              metalness={1}
              roughness={0.1}
              envMapIntensity={2}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </mesh>
        </Float>
      </group>

      {/* Premium ambient dust */}
      <Particles count={particlesCount} />

      <EffectComposer>
        {/* Bloom tuned down to only hit absolute peaks, preventing wash-out */}
        <Bloom luminanceThreshold={2.5} mipmapBlur intensity={0.4} />
      </EffectComposer>
    </>
  );
}

function Particles({ count }: { count: number }) {
  const group = useRef<THREE.Group>(null);
  const data = useMemo(() => {
    return new Array(count).fill(0).map(() => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5,
      ] as [number, number, number],
      scale: Math.random() * 0.02 + 0.005,
      color: Math.random() > 0.5 ? "#ffffff" : "#aaccff",
    }));
  }, [count]);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={group}>
      <Instances range={count} material={new THREE.MeshBasicMaterial({ color: "#ffffff" })} geometry={new THREE.SphereGeometry(1, 8, 8)}>
        {data.map((props, i) => (
          <Instance key={i} position={props.position} scale={props.scale} color={props.color} />
        ))}
      </Instances>
    </group>
  );
}
