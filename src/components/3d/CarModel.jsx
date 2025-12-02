import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useCustomizationStore } from "../../store/customizationStore";
import { CAR_PARTS } from "../../utils/constants";
import { ModelPart } from "./ModelPart";
import { BaseCar } from "./BaseCar";

export const CarModel = ({ autoRotate = false }) => {
  const groupRef = useRef(null);
  
  // Lấy customization state từ store
  const partColors = useCustomizationStore((state) => state.partColors);
  const selectedWheel = useCustomizationStore((state) => state.selectedWheel);
  const selectedGrille = useCustomizationStore((state) => state.selectedGrille);
  const selectedRoof = useCustomizationStore((state) => state.selectedRoof);
  const selectedChassis = useCustomizationStore((state) => state.selectedChassis);

  // Auto rotate animation
  useFrame((state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  // Tìm thông tin bộ phận được chọn
  const selectedWheelData = CAR_PARTS.WHEELS.find(w => w.id === selectedWheel);
  const selectedGrilleData = CAR_PARTS.GRILLES.find(g => g.id === selectedGrille);
  const selectedRoofData = CAR_PARTS.ROOFS.find(r => r.id === selectedRoof);
  const selectedChassisData = CAR_PARTS.CHASSIS.find(c => c.id === selectedChassis);

  return (
    <group ref={groupRef} position={[0, -0.6, 0]} dispose={null}>
      {/* Các bộ phận cơ bản của xe được lắp ráp từ base_car */}
      <BaseCar 
        partColors={partColors}
        scale={2.5}
        position={[0, 0, 0]}
        hideDefaultWheels={!!selectedWheelData?.modelPath}
        hideDefaultGrille={!!selectedGrilleData?.modelPath}
      />
      
      {/* Vành xe tùy chỉnh - thay thế bánh gốc */}
      {selectedWheelData?.modelPath && (
        <ModelPart
          modelPath={selectedWheelData.modelPath}
          position={[0, 0, 0]}
          scale={2.5}
          applyBodyColor={false}
        />
      )}

      {/* Ca-lăng tùy chỉnh */}
      {selectedGrilleData?.modelPath && (
        <ModelPart
          modelPath={selectedGrilleData.modelPath}
          position={[0, 0, 0]}
          scale={2.5}
          applyBodyColor={false}
        />
      )}

      {/* Phụ kiện nóc xe */}
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

