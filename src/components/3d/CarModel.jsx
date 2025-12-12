import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useCustomizationStore } from "../../store/customizationStore";
import { CUSTOM_CAR_PARTS } from "../../utils/constants";
import { ModelPart } from "./ModelPart";
import { BaseCar } from "./BaseCar";

export const CarModel = ({ autoRotate = false }) => {
  const groupRef = useRef(null);

  // Lấy customization state từ store
  const partColors = useCustomizationStore((state) => state.partColors);
  const selectedWheel = useCustomizationStore((state) => state.selectedWheel);
  const selectedGrille = useCustomizationStore((state) => state.selectedGrille);
  const selectedBumper = useCustomizationStore((state) => state.selectedBumper);
  const selectedRoofAccessory = useCustomizationStore((state) => state.selectedRoofAccessory);
  const selectedChassis = useCustomizationStore((state) => state.selectedChassis);
  const selectedBodyAccessory = useCustomizationStore((state) => state.selectedBodyAccessory);
  const selectedRearAccessory = useCustomizationStore((state) => state.selectedRearAccessory);

  // Auto rotate animation
  useFrame((state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  // Tìm thông tin bộ phận được chọn từ CUSTOM_CAR_PARTS
  const selectedWheelData = CUSTOM_CAR_PARTS.WHEELS.find(w => w.id === selectedWheel);
  const selectedGrilleData = CUSTOM_CAR_PARTS.FRONT.GRILLES.find(g => g.id === selectedGrille);
  const selectedBumperData = CUSTOM_CAR_PARTS.FRONT.BUMPERS.find(b => b.id === selectedBumper);
  const selectedRoofData = CUSTOM_CAR_PARTS.ROOF.ACCESSORIES.find(r => r.id === selectedRoofAccessory);
  const selectedChassisData = CUSTOM_CAR_PARTS.BODY.CHASSIS.find(c => c.id === selectedChassis);
  const selectedBodyAccData = CUSTOM_CAR_PARTS.BODY.ACCESSORIES.find(a => a.id === selectedBodyAccessory);
  const selectedRearData = CUSTOM_CAR_PARTS.REAR.ACCESSORIES.find(r => r.id === selectedRearAccessory);

  return (
    <group ref={groupRef} position={[0, -0.6, 0]} dispose={null}>
      {/* Base Car - Các bộ phận cơ bản từ base_car */}
      <BaseCar
        partColors={partColors}
        scale={2.5}
        position={[0, 0, 0]}
        hideDefaultWheels={!!selectedWheelData?.modelPath && (selectedWheelData?.modelPath?.includes("Lốp") || !selectedWheelData?.modelPath?.includes("Ốp Lazang"))}
        hideDefaultGrille={!!selectedGrilleData?.modelPath}
        hideDefaultLights={selectedGrilleData?.hidesOriginalLights}
        hideDefaultRim={!!selectedWheelData?.modelPath && selectedWheelData?.modelPath?.includes("Ốp Lazang")}
      />

      {/* === VÀNH XE (ỐP MÂM) === */}
      {/* Giữ nguyên bánh gốc (lốp), chỉ thêm phần ốp mâm custom */}
      {selectedWheelData?.modelPath && selectedWheel !== "wheel-default" && (
        <ModelPart
          key={`wheel-${selectedWheel}`}
          modelPath={selectedWheelData.modelPath}
          position={[0, 0, 0]}
          scale={2.5}
          applyBodyColor={false}
        />
      )}

      {/* === MẶT XE === */}
      {/* Ca-lăng */}
      {selectedGrilleData?.modelPath && (
        <ModelPart
          key={`grille-${selectedGrille}`}
          modelPath={selectedGrilleData.modelPath}
          position={[0, 0, 0]}
          scale={2.5}
          applyBodyColor={false}
        />
      )}
      {/* Cản trước + sau */}
      {selectedBumperData?.modelPath && (
        <ModelPart
          key={`bumper-${selectedBumper}`}
          modelPath={selectedBumperData.modelPath}
          position={[0, 0, 0]}
          scale={2.5}
          applyBodyColor={false}
        />
      )}

      {/* === NÓC XE === */}
      {selectedRoofData?.modelPath && (
        <ModelPart
          key={`roof-${selectedRoofAccessory}`}
          modelPath={selectedRoofData.modelPath}
          position={[0, 0, 0]}
          scale={2.5}
          applyBodyColor={false}
        />
      )}

      {/* === THÂN XE === */}
      {/* Bệ chân */}
      {selectedChassisData?.modelPath && (
        <ModelPart
          key={`chassis-${selectedChassis}`}
          modelPath={selectedChassisData.modelPath}
          position={[0, 0, 0]}
          scale={2.5}
          applyBodyColor={false}
        />
      )}
      {/* Phụ kiện thân */}
      {selectedBodyAccData?.modelPath && (
        <ModelPart
          key={`body-acc-${selectedBodyAccessory}`}
          modelPath={selectedBodyAccData.modelPath}
          position={[0, 0, 0]}
          scale={2.5}
          applyBodyColor={false}
        />
      )}

      {/* === ĐUÔI XE === */}
      {selectedRearData?.modelPath && (
        <ModelPart
          key={`rear-${selectedRearAccessory}`}
          modelPath={selectedRearData.modelPath}
          position={[0, 0, 0]}
          scale={2.5}
          applyBodyColor={false}
        />
      )}
    </group>
  );
};

