import { useMemo, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const ModelPart = ({
  modelPath,
  bodyColor = "#1E40AF",
  position = [0, 0, 0],
  scale = 2.5,
  applyBodyColor = false,
}) => {
  // Nếu không có modelPath, không render gì
  if (!modelPath) return null;

  // Load model từ file .glb
  const { scene } = useGLTF(modelPath);

  // Clone scene để tránh conflicts khi re-render
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Áp dụng màu sắc và material properties
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

          // Áp dụng màu body nếu được yêu cầu
          if (applyBodyColor && bodyColor) {
            child.material.color = new THREE.Color(bodyColor);
            // Giảm metalness và tăng roughness để màu trông tự nhiên, không bóng lóa
            child.material.metalness = 0.1;
            child.material.roughness = 0.8;
            // Đảm bảo màu được áp dụng chính xác
            child.material.emissive = new THREE.Color(0x000000);
            child.material.emissiveIntensity = 0;
          } else {
            // Giữ màu gốc với độ bóng tự nhiên
            child.material.metalness = child.material.metalness || 0.3;
            child.material.roughness = child.material.roughness || 0.7;
          }

          child.material.needsUpdate = true;
        }
      }
    });
  }, [clonedScene, bodyColor, applyBodyColor]);

  return (
    <primitive
      object={clonedScene}
      position={position}
      scale={scale}
    />
  );
};

// Preload helper function
export const preloadModelPart = (modelPath) => {
  if (modelPath) {
    useGLTF.preload(modelPath);
  }
};
