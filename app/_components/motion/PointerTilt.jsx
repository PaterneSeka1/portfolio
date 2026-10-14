"use client"

import { useEffect, useRef } from "react"

const FINE_POINTER =
  "(hover: hover) and (pointer: fine) and (min-width: 64rem) and (prefers-reduced-motion: no-preference)"

/**
 * Wraps server-rendered children in a perspective stage and writes the pointer
 * position as --tilt-x / --tilt-y (-1…1) on the scene element. Styles in
 * globals.css (.tilt-scene, .tilt-layer) turn them into a very small rotation
 * and parallax. Updates are batched in one animation frame and never trigger
 * a React render. Disabled on touch, small screens and reduced motion.
 */
export default function PointerTilt({ children, className = "" }) {
  const stageRef = useRef(null)
  const sceneRef = useRef(null)

  useEffect(() => {
    const stage = stageRef.current
    const scene = sceneRef.current
    if (!stage || !scene) return

    const query = window.matchMedia(FINE_POINTER)
    let frame = 0
    let next = null

    const write = () => {
      frame = 0
      if (!next) return
      scene.style.setProperty("--tilt-x", next.x.toFixed(3))
      scene.style.setProperty("--tilt-y", next.y.toFixed(3))
    }

    const schedule = (value) => {
      next = value
      if (!frame) frame = requestAnimationFrame(write)
    }

    const onMove = (event) => {
      const rect = stage.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1
      schedule({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) })
    }

    const onLeave = () => schedule({ x: 0, y: 0 })

    const enable = () => {
      stage.addEventListener("pointermove", onMove, { passive: true })
      stage.addEventListener("pointerleave", onLeave)
    }

    const disable = () => {
      stage.removeEventListener("pointermove", onMove)
      stage.removeEventListener("pointerleave", onLeave)
      onLeave()
    }

    const onQueryChange = () => (query.matches ? enable() : disable())

    if (query.matches) enable()
    query.addEventListener("change", onQueryChange)

    return () => {
      disable()
      query.removeEventListener("change", onQueryChange)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={stageRef} className={`tilt-stage ${className}`}>
      <div ref={sceneRef} className="tilt-scene">
        {children}
      </div>
    </div>
  )
}
