import { useMemo } from "react";
import { BASE_CAR_PARTS } from "../../utils/constants";
import { ModelPart } from "./ModelPart";

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
  hideDefaultLights = false,
  hideDefaultRim = false,
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
      // Ẩn đèn trước nếu grille custom yêu cầu
      if (hideDefaultLights && part.id === "front-lights") {
        return false;
      }
      return true;
    });
  }, [hideDefaultWheels, hideDefaultGrille, hideDefaultLights]);

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
          hiddenNodes={
            part.id === "default-wheels" && hideDefaultRim
              ? ["Lazang", "Vành", "Rim", "Op_Lazang", "Hubcap"]
              : []
          }
        />
      ))}
    </group>
  );
};
