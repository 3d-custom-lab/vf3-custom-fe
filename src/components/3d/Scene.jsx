import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  PerspectiveCamera,
} from "@react-three/drei";
import { CarModel } from "./CarModel";

export const Scene = ({ autoRotate = false, enableControls = true }) => {
  return (
    <div className="w-full h-full">
      <Canvas shadows>
        {/* Camera */}
        <PerspectiveCamera makeDefault position={[5, 3, 5]} fov={50} />

        {/* Ánh sáng */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <spotLight position={[-10, 10, -5]} intensity={0.3} />

        {/* Xe */}
        <CarModel autoRotate={autoRotate} />

        {/* Bóng đổ */}
        <ContactShadows
          position={[0, -1.2, 0]}
          opacity={0.5}
          scale={10}
          blur={2}
          far={4}
        />

        {/* Môi trường */}
        <Environment preset="city" />

        {/* Điều khiển camera */}
        {enableControls && (
          <OrbitControls
            enablePan={false}
            minDistance={4}
            maxDistance={12}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />
        )}
      </Canvas>
    </div>
  );
};
