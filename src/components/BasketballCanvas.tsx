import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Float } from "@react-three/drei";
import * as THREE from "three";
import { useWebGL } from "../hooks/useWebGL";

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
    <group ref={meshRef} rotation={[0.4, 0, 0]}>
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
  const { isSupported: webGLSupported, setIsSupported: setWebGLSupported } = useWebGL();

  if (webGLSupported === false) {
    return (
      <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] flex items-center justify-center">
        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-[#FF3C00] shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.4),0_20px_40px_rgba(255,60,0,0.3)] overflow-hidden">
          {/* Static Grooves Fallback */}
          <div className="absolute inset-0 border-[2px] border-black/20 rounded-full" />
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-black/30 -translate-y-1/2" />
          <div className="absolute top-0 left-1/2 w-[2px] h-full bg-black/30 -translate-x-1/2" />
          <div className="absolute inset-4 border-[2px] border-black/20 rounded-full" />
        </div>
      </div>
    );
  }

  // Show nothing while checking support to avoid flicker
  if (webGLSupported === null) {
    return <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px]" />;
  }

  return (
    <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
      <Canvas 
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        onError={(error) => {
          console.warn("WebGL Canvas Error:", error);
          setWebGLSupported(false);
        }}
      >
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
