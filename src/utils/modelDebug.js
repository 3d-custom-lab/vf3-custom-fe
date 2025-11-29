/**
 * Debug utility để kiểm tra cấu trúc của 3D model
 * Sử dụng trong development để xem tên các meshes và materials
 */

export const logModelStructure = (scene) => {
  console.group("🚗 VF3 Model Structure");
  
  const meshes = [];
  const materials = new Set();
  
  scene.traverse((child) => {
    if (child.isMesh) {
      meshes.push({
        name: child.name,
        type: child.type,
        materialName: child.material?.name,
        materialColor: child.material?.color?.getHexString(),
        geometry: child.geometry.type,
      });
      
      if (child.material?.name) {
        materials.add(child.material.name);
      }
    }
  });
  
  console.log("📦 Total Meshes:", meshes.length);
  console.log("🎨 Unique Materials:", Array.from(materials));
  console.table(meshes);
  
  console.groupEnd();
  
  return { meshes, materials: Array.from(materials) };
};

/**
 * Tìm các mesh có tên chứa keyword
 */
export const findMeshesByKeyword = (scene, keyword) => {
  const results = [];
  
  scene.traverse((child) => {
    if (child.isMesh && child.name?.toLowerCase().includes(keyword.toLowerCase())) {
      results.push(child);
    }
  });
  
  return results;
};

/**
 * Apply màu cho các mesh được chọn theo tên
 */
export const applyColorToMeshes = (scene, meshNames, color) => {
  let count = 0;
  
  scene.traverse((child) => {
    if (child.isMesh && meshNames.some(name => 
      child.name?.toLowerCase().includes(name.toLowerCase())
    )) {
      if (child.material) {
        child.material = child.material.clone();
        child.material.color.set(color);
        child.material.needsUpdate = true;
        count++;
      }
    }
  });
  
  console.log(`✅ Applied color to ${count} meshes`);
  return count;
};
