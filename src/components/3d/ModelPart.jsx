import { useMemo, useEffect, useRef } from "react";
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

  // Lưu màu gốc của các materials
  const originalColorsRef = useRef(new Map());

  // Clone scene để tránh conflicts khi re-render
  const clonedScene = useMemo(() => {
    const cloned = scene.clone();
    // Lưu màu gốc từ scene clone
    cloned.traverse((child) => {
      if (child.isMesh && child.material) {
        const color = child.material.color.clone();
        const metalness = child.material.metalness;
        const roughness = child.material.roughness;
        originalColorsRef.current.set(child.uuid, { color, metalness, roughness });
      }
    });
    return cloned;
  }, [scene]);

  // Áp dụng màu sắc và material properties
  useEffect(() => {
    if (!clonedScene) return;

    clonedScene.traverse((child) => {
      if (child.isMesh) {
        // Enable shadows
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          // Clone material lần đầu tiên
          if (!child.material.userData.isCloned) {
            child.material = child.material.clone();
            child.material.userData.isCloned = true;
          }

          // Áp dụng màu body nếu được yêu cầu và có màu
          if (applyBodyColor && bodyColor) {
            child.material.color = new THREE.Color(bodyColor);
            // Giảm metalness và tăng roughness để màu trông tự nhiên, không bóng lóa
            child.material.metalness = 0.1;
            child.material.roughness = 0.8;
            // Đảm bảo màu được áp dụng chính xác
            child.material.emissive = new THREE.Color(0x000000);
            child.material.emissiveIntensity = 0;
          } else if (applyBodyColor && !bodyColor) {
            // Reset về màu gốc khi bodyColor là null
            const originalData = originalColorsRef.current.get(child.uuid);
            if (originalData) {
              child.material.color.copy(originalData.color);
              child.material.metalness = originalData.metalness || 0.3;
              child.material.roughness = originalData.roughness || 0.7;
              child.material.emissive = new THREE.Color(0x000000);
              child.material.emissiveIntensity = 0;
            }
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
