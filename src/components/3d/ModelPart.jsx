import { useMemo, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

/**
 * Component để load và hiển thị một bộ phận của xe từ file .glb
 * @param {string} modelPath - Đường dẫn đến file .glb
 * @param {string} bodyColor - Màu sắc áp dụng cho bộ phận (nếu có)
 * @param {array} position - Vị trí của bộ phận [x, y, z]
 * @param {number} scale - Tỷ lệ scale của bộ phận
 * @param {boolean} applyBodyColor - Có áp dụng màu thân xe không
 */
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
          if (applyBodyColor) {
            child.material.color = new THREE.Color(bodyColor);
            child.material.metalness = 0.8;
            child.material.roughness = 0.2;
          } else {
            // Giữ màu gốc nhưng cải thiện material properties
            child.material.metalness = child.material.metalness || 0.5;
            child.material.roughness = child.material.roughness || 0.5;
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
