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
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
        {/* Camera */}
        <PerspectiveCamera makeDefault position={[10, 6, 10]} fov={40} />

        {/* Ánh sáng được cải thiện cho 3D model */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <spotLight position={[-8, 10, -5]} intensity={0.5} angle={0.3} penumbra={1} />
        <hemisphereLight intensity={0.3} groundColor="#444444" />

        {/* Xe */}
        <CarModel autoRotate={autoRotate} />

        {/* Bóng đổ */}
        <ContactShadows
          position={[0, -1.2, 0]}
          opacity={1.8}
          scale={15}
          blur={2.5}
          far={6}
        />

        {/* Môi trường */}
        <Environment preset="city" />

        {/* Điều khiển camera */}
        {enableControls && (
          <OrbitControls
            target={[0, 0, 0]}
            enablePan={false}
            minDistance={8}
            maxDistance={20}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.2}
            enableDamping
            dampingFactor={0.05}
          />
        )}
      </Canvas>
    </div>
  );
};
