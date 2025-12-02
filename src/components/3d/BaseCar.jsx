import { useMemo } from "react";
import { BASE_CAR_PARTS } from "../../utils/constants";
import { ModelPart } from "./ModelPart";

/**
 * BaseCar Component - Ghép các bộ phận cơ bản của xe VF3
 *
 * Thân xe được chia thành 4 phần từ folder /model/base_car/Thân xe/:
 * 1. Thân.glb - Phần thân chính (đổi màu độc lập theo partColors.body)
 * 2. Thân ko đổi màu.glb - Phần thân cố định (giữ màu gốc)
 * 3. Nóc.glb - Phần nóc xe (đổi màu độc lập theo partColors.roof)
 * 4. Nhựa thân nhám.glb - Phần nhựa thân (đổi màu độc lập theo partColors['body-plastic'])
 *
 * Các bộ phận khác: đèn trước/sau, crom, gương, bánh xe gốc
 */
export const BaseCar = ({
  partColors = {
    body: "#FFFFFF",
    roof: "#FFFFFF",
    "body-plastic": "#718096",
    mirrors: "#718096",
    "front-chrome": "#718096",
    "rear-chrome": "#718096",
  },
  scale = 2.5,
  position = [0, 0, 0],
  hideDefaultWheels = false,
  hideDefaultGrille = false,
}) => {
  // Memoize để tránh re-render không cần thiết
  const basePartsToRender = useMemo(() => {
    return BASE_CAR_PARTS.filter((part) => {
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
    if (partId === "body") {
      // Chỉ "Thân.glb" dùng màu body
      return partColors.body;
    }
    if (partId === "body-roof") {
      // "Nóc.glb" dùng màu roof riêng
      return partColors.roof;
    }
    if (partId === "body-plastic") {
      // "Nhựa thân nhám.glb" dùng màu body-plastic riêng
      return partColors["body-plastic"];
    }
    if (partId === "mirrors") return partColors.mirrors;
    if (partId === "front-chrome") return partColors["front-chrome"];
    if (partId === "rear-chrome") return partColors["rear-chrome"];

    return null; // Không áp dụng màu cho các phần khác
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
