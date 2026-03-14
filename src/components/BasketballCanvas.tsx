import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Float } from "@react-three/drei";
import * as THREE from "three";

function BasketballMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Procedural Pebble Texture
  const pebbleTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#FF3C00";
      ctx.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 5000; i++) {
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        const r = Math.random() * 1.5;
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 4);
    return tex;
  }, []);

  // Slow rotation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Main Ball Body */}
      <Sphere args={[1, 64, 64]}>
        <meshStandardMaterial
          color="#FF3C00"
          map={pebbleTexture}
          bumpMap={pebbleTexture}
          bumpScale={0.02}
          roughness={0.9}
          metalness={0.1}
        />
      </Sphere>

      {/* Grooves */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[1.001, 0.015, 16, 100]} />
        <meshBasicMaterial color="#111" />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.001, 0.015, 16, 100]} />
        <meshBasicMaterial color="#111" />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[1.001, 0.015, 16, 100]} />
        <meshBasicMaterial color="#111" />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[1.001, 0.01, 16, 100]} />
        <meshBasicMaterial color="#111" />
      </mesh>
    </group>
  );
}

export default function BasketballCanvas() {
  return (
    <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
          <BasketballMesh />
        </Float>
      </Canvas>
    </div>
  );
}
