import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useCustomizationStore } from "../../store/customizationStore";
import * as THREE from "three";

export const CarModel = ({ autoRotate = false }) => {
  const meshRef = useRef(null);
  const bodyColor = useCustomizationStore((state) => state.bodyColor);

  useFrame((state, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group>
      {/* Thân xe */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[3, 1.5, 1.8]} />
        <meshStandardMaterial
          color={bodyColor}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* 4 bánh xe */}
      <mesh position={[-0.8, -0.5, 0.6]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.8, -0.5, -0.6]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.8, -0.5, 0.6]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.8, -0.5, -0.6]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Đèn xe */}
      <mesh position={[1.2, 0.2, 0.5]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffff00"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[1.2, 0.2, -0.5]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffff00"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Mui xe trong suốt */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1.5, 0.8, 1.6]} />
        <meshStandardMaterial
          color={bodyColor}
          metalness={0.6}
          roughness={0.4}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};
