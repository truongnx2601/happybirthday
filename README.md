Birthday 3D Demo (React + Vite + React-Three-Fiber)
=================================================

This is a sample project demonstrating a full 3D "Happy Birthday" animation using:
- react + vite
- three + @react-three/fiber + @react-three/drei
- framer-motion-3d

Important: This zip includes code only. Please download the following assets into the `public/` folder:

1) 3D font (required for Text3D):
   Download helvetiker_regular.typeface.json and place into:
   public/fonts/helvetiker_regular.typeface.json
   Official source: https://threejs.org/examples/fonts/helvetiker_regular.typeface.json

   Command example:
   curl -o public/fonts/helvetiker_regular.typeface.json https://threejs.org/examples/fonts/helvetiker_regular.typeface.json

2) Background music (optional):
   Place an mp3 at public/bg.mp3
   You can use any short mp3 (for example a "happy birthday" tune).
   Example:
   mkdir -p public
   # then copy your bg.mp3 into public/bg.mp3

Run the project:
---------------
1. Install deps:
   npm install

2. Run dev server:
   npm run dev

3. Open http://localhost:5173

Notes:
- If the browser blocks autoplay for audio, click anywhere on the page to enable sound.
- You can replace simple shapes with GLTF models (put them in public/models/ and load with useGLTF).
- To improve visuals, consider adding postprocessing (bloom, depth-of-field) via @react-three/postprocessing.
