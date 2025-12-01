# 🚗 VF3 3D Customization System - Documentation

## 📋 Tổng quan

Hệ thống customization 3D cho phép người dùng tùy chỉnh xe VF3 với các bộ phận thực tế từ file .glb. Hệ thống được xây dựng với React Three Fiber và có khả năng:

- ✅ Load và hiển thị model 3D từ file .glb
- ✅ Thay đổi màu sắc thân xe realtime
- ✅ Ghép các bộ phận: Vành xe, Ca-lăng, Nóc xe, Bệ chân
- ✅ Preview tức thì khi chọn bộ phận
- ✅ Code clean, dễ bảo trì và mở rộng

---

## 🏗️ Kiến trúc hệ thống

### 1. **Store Management** (`src/store/customizationStore.js`)

Sử dụng Zustand để quản lý state:

```javascript
{
  bodyColor: string,           // Màu thân xe
  selectedWheel: string,       // ID vành xe được chọn
  selectedGrille: string,      // ID ca-lăng được chọn
  selectedRoof: string,        // ID nóc xe được chọn
  selectedChassis: string,     // ID bệ chân được chọn
}
```

### 2. **Constants** (`src/utils/constants.js`)

Định nghĩa tất cả các bộ phận có sẵn:

```javascript
CAR_PARTS = {
  WHEELS: [...],    // 4 loại vành
  GRILLES: [...],   // 4 loại ca-lăng
  ROOFS: [...],     // 6 loại nóc/phụ kiện nóc
  CHASSIS: [...],   // 2 lựa chọn bệ chân
}
```

Mỗi bộ phận có cấu trúc:
```javascript
{
  id: "unique-id",
  name: "Tên hiển thị",
  description: "Mô tả",
  modelPath: "/model/path/to/file.glb",  // null = không hiển thị
  thumbnail: "/path/to/thumbnail"          // Có thể dùng cho sau
}
```

### 3. **3D Components**

#### `ModelPart.jsx` - Component load bộ phận
- Load file .glb từ `modelPath`
- Áp dụng material properties
- Hỗ trợ `applyBodyColor` để nhuộm màu theo thân xe

#### `CarModel.jsx` - Component model xe chính
- Load model VF3.glb (thân xe)
- Áp dụng màu sắc cho thân xe
- Render các bộ phận được chọn từ store
- Tự động center model

#### `Scene.jsx` - Canvas 3D
- Setup camera, lighting
- OrbitControls để xoay/zoom
- Environment và shadows

### 4. **UI Components**

#### `PartSelector.jsx`
- Hiển thị danh sách bộ phận có thể chọn
- Animation khi hover/click
- Visual indicator cho item được chọn

#### `ColorPicker.jsx`
- Chọn màu sắc cho thân xe
- Preset colors + custom color

### 5. **Main Page** (`StudioPage.jsx`)

Trang chính với 5 tabs:
1. 🎨 **Màu sắc** - Chọn màu thân xe
2. ⚙️ **Vành xe** - 4 loại vành
3. 🔲 **Ca-lăng** - 4 kiểu ca-lăng
4. 🏔️ **Nóc xe** - 6 loại phụ kiện nóc
5. 🛡️ **Bệ chân** - Có/không bệ chân

---

## 📁 Cấu trúc file model

```
public/model/
├── VF3.glb                    # Model xe chính (bắt buộc)
├── Vành/
│   ├── Lốp Vành 1.glb
│   ├── Lốp Vành 2.glb
│   ├── Lốp Vành 3.glb
│   └── Lốp MâmX.glb
├── Calang/
│   ├── Calang1.glb
│   ├── Calang2.glb
│   ├── Calang3.glb
│   └── Calang4.glb
├── Nóc/
│   ├── Giá nóc.glb
│   ├── Giá nóc + Thang + Cốp hông.glb
│   ├── Tai1.glb
│   ├── Tai2.glb
│   └── Tai3.glb
└── Bệ chân/
    └── Bệ chân1.glb
```

---

## 🔧 Cách thêm bộ phận mới

### Bước 1: Thêm file .glb vào `public/model/`

### Bước 2: Cập nhật `constants.js`

```javascript
// Ví dụ thêm vành mới
export const CAR_PARTS = {
  WHEELS: [
    // ... existing wheels
    {
      id: "wheel-new",
      name: "Vành mới",
      description: "Mô tả vành mới",
      modelPath: "/model/Vành/Lốp Vành Mới.glb",
      thumbnail: "/model/Vành/Lốp Vành Mới.glb",
    },
  ],
  // ...
};
```

### Bước 3: Không cần code thêm!
Hệ thống tự động:
- Hiển thị trong UI
- Load model khi được chọn
- Apply materials và lighting

---

## 🎨 Tùy chỉnh màu sắc

### Màu thân xe
- Thay đổi realtime qua `bodyColor` state
- Áp dụng cho tất cả mesh không phải glass/wheel/light

### Màu bộ phận
- Hiện tại giữ màu gốc từ file .glb
- Có thể enable `applyBodyColor={true}` trong `CarModel.jsx` để nhuộm màu theo thân xe

```jsx
<ModelPart
  modelPath={selectedWheelData.modelPath}
  applyBodyColor={false}  // true = nhuộm màu theo bodyColor
/>
```

---

## 🚀 Performance Tips

1. **Model Optimization**
   - Giữ file .glb < 5MB mỗi file
   - Optimize geometry và texture
   - Sử dụng Draco compression nếu cần

2. **Preloading**
   - Models được preload tự động khi component mount
   - Có thể thêm preload cho tất cả models:

```javascript
// Thêm vào cuối file
CAR_PARTS.WHEELS.forEach(wheel => {
  if (wheel.modelPath) useGLTF.preload(wheel.modelPath);
});
```

3. **Scene cloning**
   - Mỗi model được clone để tránh conflicts
   - Materials được clone riêng để không ảnh hưởng lẫn nhau

---

## 🔄 Flow hoạt động

```
User clicks part → 
  Store updates selectedX → 
    CarModel re-renders → 
      ModelPart loads new .glb → 
        Preview updates realtime
```

---

## 🧪 Testing

### Manual Testing Checklist:
- [ ] Thay đổi màu sắc hoạt động mượt
- [ ] Mỗi vành hiển thị đúng khi click
- [ ] Ca-lăng thay đổi không bị lỗi
- [ ] Nóc xe render đúng vị trí
- [ ] Bệ chân on/off hoạt động
- [ ] Reset về mặc định
- [ ] Model không bị lag khi switch parts

---

## 🐛 Troubleshooting

### Model không hiển thị?
- Kiểm tra đường dẫn file .glb
- Check console cho CORS errors
- Verify file không bị corrupt

### Màu không apply?
- Check mesh naming trong file .glb
- Xem logic trong `CarModel.jsx` line 60-90

### Performance issues?
- Giảm polycount của models
- Compress textures
- Limit shadow quality

---

## 📝 TODO - Future Enhancements

- [ ] Thêm thumbnail preview cho parts
- [ ] Export configuration as JSON
- [ ] Share customization via URL
- [ ] 3D snapshot/screenshot
- [ ] Undo/Redo functionality
- [ ] Animation khi swap parts
- [ ] Mobile touch controls optimization
- [ ] Backend integration cho lưu config

---

## 🎯 Best Practices

1. **Naming Convention**
   - Component: PascalCase
   - Functions: camelCase
   - Constants: UPPER_SNAKE_CASE

2. **Code Organization**
   - Mỗi component một responsibility
   - Reusable logic vào hooks/utils
   - Constants tách riêng

3. **Performance**
   - Memo heavy components
   - Debounce color picker
   - Lazy load models

---

**Created by**: Senior Frontend Developer
**Tech Stack**: React, Three.js, React Three Fiber, Zustand, Framer Motion
**Version**: 1.0.0
