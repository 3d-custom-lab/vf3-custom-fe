import { useMemo } from "react";
import { BASE_CAR_PARTS } from "../../utils/constants";
import { ModelPart } from "./ModelPart";

/**
 * Component render các bộ phận cơ bản của xe VF3
 * Các bộ phận này luôn hiển thị và được lắp ráp từ các file .glb riêng lẻ
 * @param {string} bodyColor - Màu sắc thân xe
 * @param {number} scale - Tỷ lệ scale của xe
 * @param {array} position - Vị trí của group xe
 * @param {boolean} hideDefaultWheels - Ẩn bánh mặc định khi user chọn vành tùy chỉnh
 */
export const BaseCar = ({ 
  bodyColor = "#1E40AF", 
  scale = 2.5, 
  position = [0, 0, 0],
  hideDefaultWheels = false 
}) => {
  // Memoize để tránh re-render không cần thiết
  const basePartsToRender = useMemo(() => {
    return BASE_CAR_PARTS.filter(part => {
      // Ẩn bánh gốc nếu user chọn vành tùy chỉnh
      if (hideDefaultWheels && part.id === "default-wheels") {
        return false;
      }
      return true;
    });
  }, [hideDefaultWheels]);

  return (
    <group position={position}>
      {basePartsToRender.map((part) => (
        <ModelPart
          key={part.id}
          modelPath={part.modelPath}
          bodyColor={bodyColor}
          position={[0, 0, 0]}
          scale={scale}
          applyBodyColor={part.applyBodyColor}
        />
      ))}
    </group>
  );
};
