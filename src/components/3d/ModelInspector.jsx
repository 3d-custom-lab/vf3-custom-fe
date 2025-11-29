/**
 * DEBUG COMPONENT - ModelInspector
 * 
 * Component này giúp debug và inspect cấu trúc của VF3.glb model
 * Sử dụng để xem tên các meshes, materials và adjust color mapping
 * 
 * CÁCH SỬ DỤNG:
 * 1. Import vào StudioPage.jsx hoặc bất kỳ page nào
 * 2. Render <ModelInspector /> trong page
 * 3. Mở DevTools Console để xem thông tin
 * 4. Nhấn nút "Log Model Structure" để xem chi tiết
 */

import { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { Search, Info, Eye } from "lucide-react";

export const ModelInspector = () => {
  const [modelPath] = useState("/model/VF3.glb");
  const [meshList, setMeshList] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [showInspector, setShowInspector] = useState(false);

  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    if (!scene) return;

    const meshes = [];
    scene.traverse((child) => {
      if (child.isMesh) {
        meshes.push({
          name: child.name || "(unnamed)",
          type: child.type,
          materialName: child.material?.name || "(no material)",
          materialType: child.material?.type || "",
          hasColor: !!child.material?.color,
          color: child.material?.color?.getHexString() || "",
          geometryType: child.geometry?.type || "",
          vertexCount: child.geometry?.attributes?.position?.count || 0,
        });
      }
    });

    setMeshList(meshes);
    
    // Auto log structure on mount
    console.group("🚗 VF3 Model Inspector");
    console.log(`Total meshes found: ${meshes.length}`);
    console.log(`Model path: ${modelPath}`);
    console.table(meshes);
    console.groupEnd();
  }, [scene, modelPath]);

  const filteredMeshes = meshList.filter((mesh) =>
    mesh.name.toLowerCase().includes(filterText.toLowerCase()) ||
    mesh.materialName.toLowerCase().includes(filterText.toLowerCase())
  );

  const logDetailedStructure = () => {
    console.group("🔍 Detailed Model Structure");
    
    const bodyParts = filteredMeshes.filter(m => 
      ["body", "hood", "door", "roof", "fender", "bumper", "panel"].some(keyword => 
        m.name.toLowerCase().includes(keyword)
      )
    );
    
    const wheels = filteredMeshes.filter(m => 
      ["wheel", "tire"].some(keyword => m.name.toLowerCase().includes(keyword))
    );
    
    const glass = filteredMeshes.filter(m => 
      ["glass", "window"].some(keyword => m.name.toLowerCase().includes(keyword))
    );
    
    const lights = filteredMeshes.filter(m => 
      ["light", "lamp"].some(keyword => m.name.toLowerCase().includes(keyword))
    );

    console.log("📦 Body Parts:", bodyParts);
    console.log("🛞 Wheels:", wheels);
    console.log("🪟 Glass:", glass);
    console.log("💡 Lights:", lights);
    console.log("❓ Others:", filteredMeshes.filter(m => 
      ![...bodyParts, ...wheels, ...glass, ...lights].includes(m)
    ));
    
    console.groupEnd();
  };

  if (!showInspector) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowInspector(true)}
          className="p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg transition-all"
          title="Open Model Inspector"
        >
          <Eye className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 z-50 max-h-[600px] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-purple-600" />
          <h3 className="font-bold text-slate-800 dark:text-white">Model Inspector</h3>
        </div>
        <button
          onClick={() => setShowInspector(false)}
          className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          ✕
        </button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search meshes..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          onClick={logDetailedStructure}
          className="mt-2 w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-all"
        >
          Log Detailed Structure
        </button>
      </div>

      {/* Mesh List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">
          Found {filteredMeshes.length} meshes
        </div>
        {filteredMeshes.map((mesh, idx) => (
          <div
            key={idx}
            className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg text-xs space-y-1"
          >
            <div className="font-semibold text-slate-800 dark:text-white">
              {mesh.name}
            </div>
            <div className="text-slate-600 dark:text-slate-300">
              Material: {mesh.materialName}
            </div>
            {mesh.hasColor && (
              <div className="flex items-center gap-2">
                <span className="text-slate-600 dark:text-slate-300">Color:</span>
                <div
                  className="w-4 h-4 rounded border border-slate-300 dark:border-slate-600"
                  style={{ backgroundColor: `#${mesh.color}` }}
                />
                <span className="text-slate-500">#{mesh.color}</span>
              </div>
            )}
            <div className="text-slate-500 dark:text-slate-400">
              Vertices: {mesh.vertexCount.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Preload model
useGLTF.preload("/model/VF3.glb");

/*
USAGE EXAMPLE:

In StudioPage.jsx, add at the bottom:

import { ModelInspector } from "../../components/3d/ModelInspector";

// Then in the component JSX:
{process.env.NODE_ENV === 'development' && <ModelInspector />}

*/
