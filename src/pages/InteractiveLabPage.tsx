import { useEffect, useRef, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import * as THREE from 'three'
import { mediaQueryMatches, observeResize } from '../utils/browser'

type MaterialChoice = 'Metal' | 'Glass-like' | 'Ceramic' | 'Matte'

function InteractiveLabPage() {
  const hostRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<THREE.Group | null>(null)
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const rotationRef = useRef(32)
  const [material, setMaterial] = useState<MaterialChoice>('Metal')
  const [roughness, setRoughness] = useState(0.24)
  const [metalness, setMetalness] = useState(0.78)
  const [color, setColor] = useState('#73e5d0')
  const [light, setLight] = useState(1.4)
  const [rotation, setRotation] = useState(32)
  const [loading, setLoading] = useState(true)
  const [unavailable, setUnavailable] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    let renderer: THREE.WebGLRenderer | undefined
    let frame = 0
    let resizeObserver: ResizeObserver | undefined
    let scene: THREE.Scene | undefined
    let camera: THREE.PerspectiveCamera | undefined
    let group: THREE.Group | undefined
    let core: THREE.Mesh | undefined
    let ring: THREE.Mesh | undefined

    try {
      const compact = mediaQueryMatches('(max-width: 760px)')
      const reducedMotion = mediaQueryMatches('(prefers-reduced-motion: reduce)')
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !compact, powerPreference: 'low-power' })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.15 : 1.5))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.15
      rendererRef.current = renderer
      host.appendChild(renderer.domElement)

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40)
      camera.position.set(0, 0, 6.5)
      scene.add(new THREE.AmbientLight('#d7f4ee', 1.1))
      const key = new THREE.DirectionalLight('#ffffff', light)
      key.position.set(3, 4, 5)
      scene.add(key)
      keyLightRef.current = key
      const fill = new THREE.PointLight('#6388ff', 22, 12)
      fill.position.set(-3, -1, 3)
      scene.add(fill)

      group = new THREE.Group()
      scene.add(group)
      core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.38, 2), new THREE.MeshPhysicalMaterial({ color, metalness, roughness, clearcoat: 1, clearcoatRoughness: 0.16 }))
      group.add(core)
      ring = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.018, 8, 120), new THREE.MeshStandardMaterial({ color: '#8da6ff', metalness: 0.72, roughness: 0.28 }))
      ring.rotation.set(1.1, 0.2, -0.3)
      group.add(ring)
      groupRef.current = group
      const resize = () => {
        const width = Math.max(host.clientWidth, 1)
        const height = Math.max(host.clientHeight, 1)
        if (!camera || !renderer) return
        camera.aspect = width / height
        camera.position.z = width < 420 ? 7.5 : 6.5
        camera.updateProjectionMatrix()
        renderer.setSize(width, height, false)
        renderer.render(scene!, camera)
      }
      resizeObserver = observeResize(host, resize)
      resize()
      setLoading(false)

      const render = () => {
        frame = window.requestAnimationFrame(render)
        if (group) group.rotation.y = THREE.MathUtils.degToRad(rotationRef.current) + (reducedMotion ? 0 : performance.now() * 0.00012)
        if (scene && camera) renderer?.render(scene, camera)
      }
      frame = window.requestAnimationFrame(render)
    } catch {
      renderer?.dispose()
      renderer?.domElement.remove()
      setLoading(false)
      setUnavailable(true)
    }

    return () => {
      window.cancelAnimationFrame(frame)
      resizeObserver?.disconnect()
      if (scene) scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          const materials = Array.isArray(object.material) ? object.material : [object.material]
          materials.forEach((item) => item.dispose())
        }
      })
      renderer?.dispose()
      renderer?.domElement.remove()
      rendererRef.current = null
      groupRef.current = null
      keyLightRef.current = null
    }
  }, [])

  useEffect(() => {
    const group = groupRef.current
    if (!group) return
    let next: THREE.MeshStandardMaterial
    if (material === 'Glass-like') {
      next = new THREE.MeshPhysicalMaterial({ transparent: true, opacity: 0.78, transmission: 0.55, thickness: 1.1, ior: 1.3, roughness, metalness: 0, clearcoat: 1, color })
    } else if (material === 'Ceramic') {
      next = new THREE.MeshPhysicalMaterial({ color, roughness, metalness: Math.min(metalness, 0.18), clearcoat: 0.85, clearcoatRoughness: 0.12 })
    } else if (material === 'Matte') {
      next = new THREE.MeshStandardMaterial({ color, roughness: Math.max(roughness, 0.68), metalness: 0 })
    } else {
      next = new THREE.MeshStandardMaterial({ color, roughness, metalness })
    }
    const mesh = group.children.find((child): child is THREE.Mesh => child instanceof THREE.Mesh && child.geometry instanceof THREE.IcosahedronGeometry)
    if (mesh) {
      const previous = mesh.material
      mesh.material = next
      if (previous !== next) {
        if (Array.isArray(previous)) previous.forEach((item) => item.dispose())
        else previous.dispose()
      }
    }
    if (keyLightRef.current) keyLightRef.current.intensity = light
  }, [color, light, material, metalness, roughness])

  useEffect(() => {
    rotationRef.current = rotation
  }, [rotation])

  function reset() {
    setMaterial('Metal')
    setRoughness(0.24)
    setMetalness(0.78)
    setColor('#73e5d0')
    setLight(1.4)
    setRotation(32)
  }

  return (
    <main className="lab-page" id="top">
      <section className="lab-page-heading"><div className="route-index">AMITY NODE <span>·</span> INTERACTIVE LAB</div><p className="eyebrow"><span className="eyebrow-dot" /> Material / light / form</p><h1>Make it<br /><span>your own.</span></h1><p>Change the finish, color, light, and orientation of a real-time 3D study. The scene runs locally in your browser.</p></section>
      <section className="lab-workbench" aria-label="Interactive material experiment">
        <div className="lab-canvas-panel"><div className="lab-canvas-label"><span>STUDY 001</span><span>{material.toUpperCase()} / LIVE</span></div><div className="lab-canvas" ref={hostRef}>{loading && <p className="lab-loading">Preparing the material study…</p>}{unavailable && <div className="lab-fallback" role="status"><span /><strong>3D preview unavailable in this browser</strong></div>}</div><div className="lab-canvas-foot"><span>AMITY NODE / MATERIAL STUDY</span><span>WEBGL</span></div></div>
        <div className="lab-controls"><div className="lab-controls-head"><div><span className="eyebrow muted">Object controls</span><h2>Shape the surface.</h2></div><button type="button" className="lab-reset" onClick={reset} aria-label="Reset all controls"><RotateCcw size={16} /><span>Reset</span></button></div>
          <label className="lab-control-select">Material<select value={material} onChange={(event) => setMaterial(event.target.value as MaterialChoice)}><option>Metal</option><option>Glass-like</option><option>Ceramic</option><option>Matte</option></select></label>
          <label className="lab-control-range">Roughness <output>{roughness.toFixed(2)}</output><input type="range" min="0.02" max="1" step="0.01" value={roughness} onChange={(event) => setRoughness(Number(event.target.value))} /></label>
          <label className="lab-control-range">Metallic <output>{metalness.toFixed(2)}</output><input type="range" min="0" max="1" step="0.01" value={metalness} onChange={(event) => setMetalness(Number(event.target.value))} /></label>
          <label className="lab-control-color">Object color <input type="color" value={color} onChange={(event) => setColor(event.target.value)} /><span>{color.toUpperCase()}</span></label>
          <label className="lab-control-range">Light intensity <output>{light.toFixed(1)}×</output><input type="range" min="0.2" max="2.2" step="0.1" value={light} onChange={(event) => setLight(Number(event.target.value))} /></label>
          <label className="lab-control-range">Object rotation <output>{rotation}°</output><input type="range" min="0" max="360" step="1" value={rotation} onChange={(event) => setRotation(Number(event.target.value))} /></label>
          <p className="lab-control-note">Material properties are applied to the rendered object in real time. Appearance varies by display and browser.</p>
        </div>
      </section>
    </main>
  )
}

export default InteractiveLabPage