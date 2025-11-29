import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useCustomizationStore } from "../../store/customizationStore";
import * as THREE from "three";

// Set to true to see model structure in console
const DEBUG_MODE = false;

export const CarModel = ({ autoRotate = false }) => {
  const groupRef = useRef(null);
  const bodyColor = useCustomizationStore((state) => state.bodyColor);

  // Load VF3.glb model
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
    
    if (DEBUG_MODE) {
      console.log("📐 Model centered at:", center);
      console.log("📦 Model size:", box.getSize(new THREE.Vector3()));
    }
  }, [clonedScene]);

  useFrame((state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  // Apply color to car body meshes
  useEffect(() => {
    if (!clonedScene) return;

    // Debug: Log model structure
    if (DEBUG_MODE) {
      console.group("🚗 VF3 Model Debug");
      clonedScene.traverse((child) => {
        if (child.isMesh) {
          console.log("Mesh:", child.name, "| Material:", child.material?.name);
        }
      });
      console.groupEnd();
    }

    clonedScene.traverse((child) => {
      if (child.isMesh) {
        // Enable shadows
        child.castShadow = true;
        child.receiveShadow = true;

        // Apply color to car body parts (excluding wheels, lights, windows, etc.)
        // Common naming conventions for car body parts in 3D models
        const bodyPartNames = [
          "body",
          "Body",
          "BODY",
          "paint",
          "Paint",
          "PAINT",
          "shell",
          "Shell",
          "SHELL",
          "exterior",
          "Exterior",
          "EXTERIOR",
          "hood",
          "Hood",
          "HOOD",
          "door",
          "Door",
          "DOOR",
          "roof",
          "Roof",
          "ROOF",
          "fender",
          "Fender",
          "FENDER",
          "bumper",
          "Bumper",
          "BUMPER",
          "panel",
          "Panel",
          "PANEL",
          "chassis",
          "Chassis",
          "CHASSIS",
          "trunk",
          "Trunk",
          "TRUNK",
          "quarter",
          "Quarter",
          "QUARTER",
        ];

        // Exclude these parts from color application
        const excludePartNames = [
          "wheel",
          "Wheel",
          "WHEEL",
          "tire",
          "Tire",
          "TIRE",
          "glass",
          "Glass",
          "GLASS",
          "window",
          "Window",
          "WINDOW",
          "light",
          "Light",
          "LIGHT",
          "lamp",
          "Lamp",
          "LAMP",
          "chrome",
          "Chrome",
          "CHROME",
          "grill",
          "Grill",
          "GRILL",
          "mirror",
          "Mirror",
          "MIRROR",
        ];

        // Check if mesh name contains any body part keywords
        const isBodyPart = bodyPartNames.some((name) =>
          child.name?.toLowerCase().includes(name.toLowerCase())
        );

        // Check if mesh should be excluded
        const isExcluded = excludePartNames.some((name) =>
          child.name?.toLowerCase().includes(name.toLowerCase())
        );

        // Apply color to body parts that are not excluded
        if (isBodyPart && !isExcluded) {
          if (child.material) {
            // Clone material để không ảnh hưởng đến các instance khác
            child.material = child.material.clone();
            child.material.color = new THREE.Color(bodyColor);
            child.material.metalness = 0.8;
            child.material.roughness = 0.2;
            child.material.needsUpdate = true;

            if (DEBUG_MODE) {
              console.log("✅ Applied color to:", child.name);
            }
          }
        }
        // If no specific body part name found, apply to materials without specific exclusions
        else if (!isExcluded && child.material) {
          child.material = child.material.clone();

          // Check if it's a window/glass material
          if (
            child.name?.toLowerCase().includes("glass") ||
            child.name?.toLowerCase().includes("window")
          ) {
            child.material.transparent = true;
            child.material.opacity = 0.3;
            child.material.metalness = 0.1;
            child.material.roughness = 0.05;
          } else if (
            child.name?.toLowerCase().includes("wheel") ||
            child.name?.toLowerCase().includes("tire")
          ) {
            // Wheel materials - dark with high metalness
            child.material.color = new THREE.Color("#1a1a1a");
            child.material.metalness = 0.9;
            child.material.roughness = 0.1;
          } else if (
            child.name?.toLowerCase().includes("light") ||
            child.name?.toLowerCase().includes("lamp")
          ) {
            // Light materials - emissive
            child.material.emissive = new THREE.Color(0xffffaa);
            child.material.emissiveIntensity = 0.5;
          }
          // Apply body color to meshes without specific names (main body)
          else if (!child.name || child.name === "") {
            child.material.color = new THREE.Color(bodyColor);
            child.material.metalness = 0.8;
            child.material.roughness = 0.2;
            child.material.needsUpdate = true;
          }
        }
      }
    });
  }, [clonedScene, bodyColor]);

  return (
    <group ref={groupRef} position={[0, -0.6, 0]} dispose={null}>
      <primitive object={clonedScene} scale={2.5} position={[0, 0, 0]} />
    </group>
  );
};

// Preload model for better performance
useGLTF.preload("/model/VF3.glb");
