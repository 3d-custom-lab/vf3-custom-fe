# Commit Message Suggestion

```
feat: Thêm tính năng custom màu sơn xe VF3 với model 3D thật

- Tích hợp VF3.glb model vào CarModel component
- Sử dụng useGLTF từ @react-three/drei để load model
- Tự động phát hiện và apply màu cho body parts
- Nâng cấp ColorPicker với react-color (SketchPicker)
- Cải thiện lighting và shadows trong Scene component
- Thêm ModelInspector component cho debugging
- Tạo modelDebug utils để inspect model structure
- Tối ưu performance với useMemo và material cloning
- Hỗ trợ DEBUG_MODE để debug mesh names
- Cập nhật documentation (README.md, CAR_CUSTOMIZATION_DOCS.md)

Dependencies added:
- react-color ^2.19.3
- @types/react-color ^3.0.12

Files changed:
- src/components/3d/CarModel.jsx (major refactor)
- src/components/ui/ColorPicker.jsx (enhanced UI)
- src/components/3d/Scene.jsx (improved lighting)
- src/components/3d/ModelInspector.jsx (new)
- src/utils/modelDebug.js (new)
- README.md (updated)
- CAR_CUSTOMIZATION_DOCS.md (new)

No breaking changes - all existing features work as before
```

# Git Commands

```powershell
# Stage all changes
git add .

# Commit with message
git commit -m "feat: Thêm tính năng custom màu sơn xe VF3 với model 3D thật"

# Push to remote
git push origin nvdeekay
```

# Alternative Detailed Commit Message

```
feat(3d): Implement VF3.glb model with real-time color customization

🚀 Features:
- Load and render VF3.glb 3D model using React Three Fiber
- Real-time color customization on car body parts
- Advanced color picker with SketchPicker component
- Smart mesh detection for body parts vs accessories
- Debug tools for model inspection

🎨 UI/UX Improvements:
- Enhanced ColorPicker with 3 selection methods:
  * 8 preset colors
  * Advanced SketchPicker
  * Manual hex input
- Smooth animations with Framer Motion
- Improved lighting and shadows

🔧 Technical:
- Material cloning to prevent conflicts
- useMemo optimization for scene cloning
- Shadow quality increased to 2048x2048
- OrbitControls with damping enabled
- Model preloading for better performance

📚 Documentation:
- Comprehensive guide in CAR_CUSTOMIZATION_DOCS.md
- Debug utilities and examples
- Troubleshooting section

✅ Tested:
- No breaking changes
- All existing features intact
- No console errors
- Clean code with proper comments
```
