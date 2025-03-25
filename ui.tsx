import { useState, useRef, useEffect } from "react"
import { HexColorPicker } from "react-colorful"
import Image from "next/image"
import { Palette } from "lucide-react"

export function UI({ onColorChange }: { onColorChange: (color: string) => void }) {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [color, setColor] = useState("#ffffff")
  const colorPickerRef = useRef<HTMLDivElement>(null)

  const handleColorChange = (newColor: string) => {
    setColor(newColor)
    onColorChange(newColor)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="absolute top-4 left-4 z-10">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Image
            src="https://10web.io/wp-content/uploads/2024/08/v0_by_Vercel_logo.png"
            alt="v0 Logo"
            width={40}
            height={40}
          />
        </div>
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="flex items-center gap-2 bg-black backdrop-blur-sm text-white px-3 py-1.5 rounded-md text-sm font-mono hover:bg-white/20 transition-colors"
        >
          <span>color</span>
        </button>
      </div>
      {showColorPicker && (
        <div ref={colorPickerRef} className="absolute mt-2 bg-black/10 text-white p-2 rounded-lg">
          <HexColorPicker color={color} onChange={handleColorChange} />
        </div>
      )}
    </div>
  )
}

