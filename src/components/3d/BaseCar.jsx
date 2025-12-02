import { useMemo } from "react";
import { BASE_CAR_PARTS } from "../../utils/constants";
import { ModelPart } from "./ModelPart";

export const BaseCar = ({ 
  partColors = { body: "#FFFFFF", mirrors: "#718096", "front-chrome": "#718096", "rear-chrome": "#718096" },
  scale = 2.5, 
  position = [0, 0, 0],
  hideDefaultWheels = false,
  hideDefaultGrille = false 
}) => {
  // Memoize để tránh re-render không cần thiết
  const basePartsToRender = useMemo(() => {
    return BASE_CAR_PARTS.filter(part => {
      // Ẩn bánh gốc nếu user chọn vành tùy chỉnh
      if (hideDefaultWheels && part.id === "default-wheels") {
        return false;
      }
      // Ẩn crom trước gốc khi user chọn ca-lăng tùy chỉnh
      if (hideDefaultGrille && part.isGrillePart) {
        return false;
      }
      return true;
    });
  }, [hideDefaultWheels, hideDefaultGrille]);

  // Hàm lấy màu cho từng part
  const getPartColor = (partId) => {
    // Ánh xạ part id từ BASE_CAR_PARTS sang partColors keys
    if (partId === "body") return partColors.body;
    if (partId === "mirrors") return partColors.mirrors;
    if (partId === "front-chrome") return partColors["front-chrome"];
    if (partId === "rear-chrome") return partColors["rear-chrome"];
    
    return partColors.body; // Default fallback
  };

  return (
    <group position={position}>
      {basePartsToRender.map((part) => (
        <ModelPart
          key={part.id}
          modelPath={part.modelPath}
          bodyColor={part.applyBodyColor ? getPartColor(part.id) : null}
          position={[0, 0, 0]}
          scale={scale}
          applyBodyColor={part.applyBodyColor}
        />
      ))}
    </group>
  );
};
