# Tài Liệu Tính Năng Custom Màu Sơn VF3

## 📋 Tổng Quan

Tính năng này cho phép người dùng tự do tùy chỉnh màu sơn xe VF3 bằng cách sử dụng model 3D thực tế (VF3.glb) với Three.js và React Three Fiber.

## 🚀 Các Thay Đổi Đã Thực Hiện

### 1. **Dependencies Mới**
- ✅ `react-color`: Library chọn màu nâng cao
- ✅ `@types/react-color`: TypeScript types cho react-color

### 2. **File Đã Cập Nhật**

#### `src/components/3d/CarModel.jsx`
**Thay đổi chính:**
- ✅ Thay thế 3D model cứng bằng GLB loader (`useGLTF`)
- ✅ Load file VF3.glb từ `/public/model/VF3.glb`
- ✅ Tự động phát hiện và apply màu sắc cho các bộ phận thân xe
- ✅ Xử lý materials đặc biệt (kính, đèn, bánh xe)
- ✅ Hỗ trợ DEBUG_MODE để debug structure của model
- ✅ Tối ưu performance với `useMemo` và material cloning

**Cách hoạt động:**
```javascript
// Model được load và clone để tránh conflicts
const { scene } = useGLTF("/model/VF3.glb");
const clonedScene = useMemo(() => scene.clone(), [scene]);

// Tự động phát hiện body parts theo tên
const bodyPartNames = ["body", "hood", "door", "roof", "fender", "bumper", ...];

// Apply màu cho các mesh phù hợp
child.material.color = new THREE.Color(bodyColor);
```

#### `src/components/ui/ColorPicker.jsx`
**Thay đổi chính:**
- ✅ Tích hợp SketchPicker từ react-color
- ✅ UI/UX được cải thiện với animations
- ✅ Hiển thị màu hiện tại
- ✅ Cho phép nhập mã màu hex thủ công
- ✅ Preset colors với tên màu

**Features:**
- 8 màu preset đẹp mắt
- Bảng màu nâng cao với SketchPicker
- Input hex color thủ công
- Smooth animations với Framer Motion

#### `src/components/3d/Scene.jsx`
**Thay đổi chính:**
- ✅ Cải thiện lighting cho 3D model
- ✅ Tăng shadow quality (2048x2048)
- ✅ Thêm hemisphereLight cho ambient lighting tốt hơn
- ✅ Enable damping cho OrbitControls (smooth camera)
- ✅ Tối ưu rendering với dpr và antialias

#### `src/utils/modelDebug.js` (Mới)
**Utility functions:**
- `logModelStructure()`: Log cấu trúc model ra console
- `findMeshesByKeyword()`: Tìm meshes theo keyword
- `applyColorToMeshes()`: Apply màu cho specific meshes

### 3. **File Không Thay Đổi**
- ✅ `src/pages/customer/StudioPage.jsx` - Không cần thay đổi
- ✅ `src/store/customizationStore.js` - Hoạt động tốt
- ✅ `src/utils/constants.js` - PRESET_COLORS đã có sẵn
- ✅ Tất cả các tính năng khác (forum, auth, admin) - Không bị ảnh hưởng

## 🎨 Cách Sử Dụng

### Cho Người Dùng:
1. Vào trang Studio (/studio)
2. Chọn tab "Màu sắc"
3. Có 3 cách chọn màu:
   - Click vào 8 màu preset
   - Mở bảng màu nâng cao (SketchPicker)
   - Nhập mã hex thủ công

### Cho Developer:
```javascript
// Bật DEBUG_MODE trong CarModel.jsx để xem structure
const DEBUG_MODE = true; // Set to true

// Model sẽ log tất cả mesh names ra console
// Giúp bạn điều chỉnh bodyPartNames nếu cần
```

## 🔧 Customization

### Thêm Body Part Names
Nếu model VF3.glb có mesh names khác, thêm vào array:

```javascript
const bodyPartNames = [
  "body", "hood", "door", // ... existing
  "YOUR_MESH_NAME_HERE", // Add new name
];
```

### Thêm Exclude Names
Để loại trừ parts khỏi color application:

```javascript
const excludePartNames = [
  "wheel", "tire", "glass", // ... existing
  "YOUR_EXCLUDE_NAME", // Add new exclusion
];
```

### Điều Chỉnh Material Properties
```javascript
// Trong CarModel.jsx, tìm phần apply color
child.material.metalness = 0.8; // 0.0 - 1.0
child.material.roughness = 0.2; // 0.0 - 1.0
```

### Thêm Màu Preset
Trong `src/utils/constants.js`:

```javascript
export const PRESET_COLORS = [
  // ... existing colors
  { name: "Your Color Name", value: "#HEX_CODE" },
];
```

## 🐛 Debug & Troubleshooting

### Model không hiển thị màu đúng?
1. Bật DEBUG_MODE trong CarModel.jsx
2. Mở console và xem mesh names
3. Cập nhật bodyPartNames hoặc excludePartNames

### Model bị tối hoặc sáng quá?
Điều chỉnh lighting trong Scene.jsx:
```javascript
<ambientLight intensity={0.6} /> // Tăng/giảm intensity
<directionalLight intensity={1.5} /> // Tăng/giảm intensity
```

### Performance issues?
- Model VF3.glb đã được preload
- Shadow quality có thể giảm từ 2048 xuống 1024
- Giảm dpr từ [1, 2] xuống [1, 1]

## 📦 Dependencies

```json
{
  "three": "^0.181.0",
  "@react-three/fiber": "^9.4.0",
  "@react-three/drei": "^10.7.6",
  "react-color": "^2.19.3",
  "@types/react-color": "^3.0.12"
}
```

## ✅ Testing Checklist

- [x] Model VF3.glb loads successfully
- [x] Màu preset hoạt động
- [x] SketchPicker hoạt động
- [x] Hex input hoạt động
- [x] Auto-rotate hoạt động
- [x] OrbitControls smooth
- [x] Shadows render correctly
- [x] No console errors
- [x] Không ảnh hưởng đến features khác

## 🎯 Next Steps (Optional)

1. **Save/Load Customization**: Lưu màu vào database
2. **Share Designs**: Chia sẻ thiết kế với link
3. **Export Image**: Chụp ảnh thiết kế
4. **More Customization**: Thêm decals, patterns
5. **Multiple Views**: Camera presets (front, side, back)

## 🔗 Useful Links

- [Three.js Docs](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [React Three Drei](https://github.com/pmndrs/drei)
- [React Color](https://casesandberg.github.io/react-color/)

---

**Phiên bản:** 1.0.0  
**Ngày cập nhật:** 29/11/2025  
**Người thực hiện:** GitHub Copilot
