"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing"
import { RayMarchingScene } from "./ray-marching-scene"
import { UI } from "./ui"
import { useState } from "react"

export default function Scene() {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")

  return (
    <div className="w-full h-screen bg-black relative">
      <UI onColorChange={setBackgroundColor} />
      <Canvas camera={{ position: [0, 0, 7], fov: 75 }}>
        <color attach="background" args={[backgroundColor]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        <RayMarchingScene backgroundColor={backgroundColor} />
        <OrbitControls />
        <Environment preset="sunset" />

        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
          <ChromaticAberration offset={[0.002, 0.002]} />
          <Vignette eskil={false} offset={0.1} darkness={0.8} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

