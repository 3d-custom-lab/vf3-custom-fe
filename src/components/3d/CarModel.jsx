import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useCustomizationStore } from "../../store/customizationStore";
import { CAR_PARTS } from "../../utils/constants";
import { ModelPart } from "./ModelPart";
import * as THREE from "three";

export const CarModel = ({ autoRotate = false }) => {
  const groupRef = useRef(null);
  
  // Lấy customization state từ store
  const bodyColor = useCustomizationStore((state) => state.bodyColor);
  const selectedWheel = useCustomizationStore((state) => state.selectedWheel);
  const selectedGrille = useCustomizationStore((state) => state.selectedGrille);
  const selectedRoof = useCustomizationStore((state) => state.selectedRoof);
  const selectedChassis = useCustomizationStore((state) => state.selectedChassis);

  // Load model xe chính VF3.glb
  const { scene } = useGLTF("/model/VF3.glb");

  // Clone scene để tránh conflicts khi re-render
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Center the model based on its bounding box
  useEffect(() => {
    if (!clonedScene) return;
    
    // Calculate bounding box to center the model
    const box = new THREE.Box3().setFromObject(clonedScene);
    const center = box.getCenter(new THREE.Vector3());
    
    // Offset model to center it at origin (0,0,0)
    clonedScene.position.x = -center.x;
    clonedScene.position.y = -center.y;
    clonedScene.position.z = -center.z;
  }, [clonedScene]);

  // Auto rotate animation
  useFrame((state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  // Apply color to car body meshes
  useEffect(() => {
    if (!clonedScene) return;

    clonedScene.traverse((child) => {
      if (child.isMesh) {
        // Enable shadows
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          // Clone material để không ảnh hưởng đến các instance khác
          child.material = child.material.clone();

          // Check if it's a window/glass material
          if (
            child.name?.toLowerCase().includes("glass") ||
            child.name?.toLowerCase().includes("window") ||
            child.name?.toLowerCase().includes("kinh")
          ) {
            child.material.transparent = true;
            child.material.opacity = 0.3;
            child.material.metalness = 0.1;
            child.material.roughness = 0.05;
          } 
          // Wheel materials - dark with high metalness
          else if (
            child.name?.toLowerCase().includes("wheel") ||
            child.name?.toLowerCase().includes("tire") ||
            child.name?.toLowerCase().includes("banh") ||
            child.name?.toLowerCase().includes("lop")
          ) {
            child.material.color = new THREE.Color("#1a1a1a");
            child.material.metalness = 0.9;
            child.material.roughness = 0.1;
          } 
          // Light materials - emissive
          else if (
            child.name?.toLowerCase().includes("light") ||
            child.name?.toLowerCase().includes("lamp") ||
            child.name?.toLowerCase().includes("den")
          ) {
            child.material.emissive = new THREE.Color(0xffffaa);
            child.material.emissiveIntensity = 0.5;
          }
          // Apply body color to car body parts
          else {
            child.material.color = new THREE.Color(bodyColor);
            child.material.metalness = 0.8;
            child.material.roughness = 0.2;
          }
          
          child.material.needsUpdate = true;
        }
      }
    });
  }, [clonedScene, bodyColor]);

  // Tìm thông tin bộ phận được chọn
  const selectedWheelData = CAR_PARTS.WHEELS.find(w => w.id === selectedWheel);
  const selectedGrilleData = CAR_PARTS.GRILLES.find(g => g.id === selectedGrille);
  const selectedRoofData = CAR_PARTS.ROOFS.find(r => r.id === selectedRoof);
  const selectedChassisData = CAR_PARTS.CHASSIS.find(c => c.id === selectedChassis);

  return (
    <group ref={groupRef} position={[0, -0.6, 0]} dispose={null}>
      {/* Model xe chính */}
      <primitive object={clonedScene} scale={2.5} position={[0, 0, 0]} />
      
      {/* Vành xe */}
      {selectedWheelData?.modelPath && (
        <ModelPart
          modelPath={selectedWheelData.modelPath}
          position={[0, 0, 0]}
          scale={2.5}
          applyBodyColor={false}
        />
      )}

      {/* Ca-lăng */}
      {selectedGrilleData?.modelPath && (
        <ModelPart
          modelPath={selectedGrilleData.modelPath}
          position={[0, 0, 0]}
          scale={2.5}
          applyBodyColor={false}
        />
      )}

      {/* Nóc xe */}
      {selectedRoofData?.modelPath && (
        <ModelPart
          modelPath={selectedRoofData.modelPath}
          position={[0, 0, 0]}
          scale={2.5}
          applyBodyColor={false}
        />
      )}

      {/* Bệ chân */}
      {selectedChassisData?.modelPath && (
        <ModelPart
          modelPath={selectedChassisData.modelPath}
          position={[0, 0, 0]}
          scale={2.5}
          applyBodyColor={false}
        />
      )}
    </group>
  );
};

// Preload model cho performance tốt hơn
useGLTF.preload("/model/VF3.glb");

