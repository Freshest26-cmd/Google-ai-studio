import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GravityPhysics, PhysicsObject } from "./GravityPhysics";
// @ts-ignore
import vertexShader from "../shaders/gravitySphere.vert?raw";
// @ts-ignore
import fragmentShader from "../shaders/gravitySphere.frag?raw";

const OBJECT_COUNT = 8;

export default function GravityScene() {
  const { mouse, camera } = useThree();
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const physics = useMemo(() => new GravityPhysics(), []);

  const spheres = useMemo(() => {
    const data: PhysicsObject[] = [];
    for (let i = 0; i < OBJECT_COUNT; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      );
      data.push({
        position: pos.clone(),
        initialPosition: pos.clone(),
        velocity: new THREE.Vector3(),
        oscillationOffset: Math.random() * Math.PI * 2,
        oscillationSpeed: 0.5 + Math.random() * 0.7,
      });
    }
    return data;
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color("#FF3C00") },
    uColor2: { value: new THREE.Color("#FFD700") },
    uEdgeIntensity: { value: 1.4 },
    uGlowStrength: { value: 0.6 },
    uColorShiftSpeed: { value: 0.2 },
  }), []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    uniforms.uTime.value = state.clock.elapsedTime;

    // Convert mouse to 3D space
    const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    const mousePos = camera.position.clone().add(dir.multiplyScalar(distance));

    // Update Physics
    physics.update(spheres, mousePos, state.clock.elapsedTime, delta);

    // Update Mesh Matrices
    const tempMatrix = new THREE.Matrix4();
    spheres.forEach((sphere, i) => {
      tempMatrix.setPosition(sphere.position);
      meshRef.current!.setMatrixAt(i, tempMatrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, OBJECT_COUNT]}>
      <sphereGeometry args={[0.6, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </instancedMesh>
  );
}
