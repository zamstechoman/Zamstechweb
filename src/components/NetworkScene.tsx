import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { mediaQueryMatches, observeResize } from '../utils/browser'

export default function NetworkScene() {
  const hostRef = useRef<HTMLDivElement>(null)
  const [webglUnavailable, setWebglUnavailable] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let renderer: THREE.WebGLRenderer | undefined
    let animationFrame = 0
    let resizeObserver: ResizeObserver | undefined

    try {
      const compact = mediaQueryMatches('(max-width: 760px)')
      const reducedMotion = mediaQueryMatches('(prefers-reduced-motion: reduce)')
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !compact, powerPreference: 'low-power' })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.2 : 1.6))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.12
      host.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50)
      camera.position.set(0, 0, 8.2)

      scene.add(new THREE.AmbientLight('#9de9dc', 1.15))
      const keyLight = new THREE.DirectionalLight('#effffb', 3.1)
      keyLight.position.set(4, 5, 6)
      scene.add(keyLight)
      const rimLight = new THREE.PointLight('#557cff', 18, 12)
      rimLight.position.set(-3, -2, 3)
      scene.add(rimLight)

      const structure = new THREE.Group()
      scene.add(structure)

      const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.18, 1),
        new THREE.MeshPhysicalMaterial({
          color: '#6edec9',
          metalness: 0.72,
          roughness: 0.22,
          clearcoat: 1,
          clearcoatRoughness: 0.16,
          emissive: '#0a332e',
          emissiveIntensity: 0.7,
        }),
      )
      structure.add(core)

      const wireframe = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.32, 1),
        new THREE.MeshBasicMaterial({ color: '#a4fff0', wireframe: true, transparent: true, opacity: 0.16 }),
      )
      structure.add(wireframe)

      const ringMaterial = new THREE.MeshStandardMaterial({ color: '#62d8c5', metalness: 0.8, roughness: 0.28, transparent: true, opacity: 0.62 })
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.012, 6, 160), ringMaterial)
      ring.rotation.set(1.02, 0.3, -0.32)
      structure.add(ring)
      const secondRing = new THREE.Mesh(
        new THREE.TorusGeometry(2.42, 0.008, 5, 160),
        new THREE.MeshBasicMaterial({ color: '#809dff', transparent: true, opacity: 0.48 }),
      )
      secondRing.rotation.set(0.38, -0.82, 0.54)
      structure.add(secondRing)

      const nodePositions: THREE.Vector3[] = []
      const nodeCount = compact ? 18 : 30
      const goldenAngle = Math.PI * (3 - Math.sqrt(5))
      for (let index = 0; index < nodeCount; index += 1) {
        const y = 1 - (index / (nodeCount - 1)) * 2
        const radius = Math.sqrt(1 - y * y)
        const angle = goldenAngle * index
        nodePositions.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius).multiplyScalar(2.55))
      }

      const nodeGeometry = new THREE.SphereGeometry(0.045, 10, 8)
      const nodeMaterial = new THREE.MeshBasicMaterial({ color: '#a5fff2' })
      const nodes = new THREE.InstancedMesh(nodeGeometry, nodeMaterial, nodePositions.length)
      const nodeTransform = new THREE.Object3D()
      nodePositions.forEach((position, index) => {
        nodeTransform.position.copy(position)
        nodeTransform.scale.setScalar(index % 5 === 0 ? 1.55 : 1)
        nodeTransform.updateMatrix()
        nodes.setMatrixAt(index, nodeTransform.matrix)
      })
      nodes.instanceMatrix.needsUpdate = true
      structure.add(nodes)

      const connectionPoints: number[] = []
      nodePositions.forEach((point, index) => {
        nodePositions.slice(index + 1).forEach((otherPoint) => {
          if (point.distanceTo(otherPoint) < 1.12) {
            connectionPoints.push(point.x, point.y, point.z, otherPoint.x, otherPoint.y, otherPoint.z)
          }
        })
      })
      const connectionGeometry = new THREE.BufferGeometry()
      connectionGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connectionPoints, 3))
      structure.add(new THREE.LineSegments(connectionGeometry, new THREE.LineBasicMaterial({ color: '#75ead4', transparent: true, opacity: 0.2 })))

      const particlePositions = new Float32Array((compact ? 55 : 105) * 3)
      for (let index = 0; index < particlePositions.length; index += 3) {
        const radius = 2.8 + Math.random() * 1.7
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        particlePositions[index] = radius * Math.sin(phi) * Math.cos(theta)
        particlePositions[index + 1] = radius * Math.sin(phi) * Math.sin(theta)
        particlePositions[index + 2] = radius * Math.cos(phi)
      }
      const particleGeometry = new THREE.BufferGeometry()
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
      scene.add(new THREE.Points(particleGeometry, new THREE.PointsMaterial({ color: '#8df8e4', size: compact ? 0.025 : 0.032, transparent: true, opacity: 0.62, sizeAttenuation: true })))

      const pointer = { x: 0, y: 0 }
      const onPointerMove = (event: PointerEvent) => {
        const bounds = host.getBoundingClientRect()
        pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
        pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
      }
      const onPointerLeave = () => { pointer.x = 0; pointer.y = 0 }
      if (!reducedMotion) {
        host.addEventListener('pointermove', onPointerMove, { passive: true })
        host.addEventListener('pointerleave', onPointerLeave, { passive: true })
      }

      const resize = () => {
        const width = Math.max(host.clientWidth, 1)
        const height = Math.max(host.clientHeight, 1)
        camera.aspect = width / height
        camera.position.z = width < 420 ? 9 : 8.2
        camera.updateProjectionMatrix()
        renderer?.setSize(width, height, false)
        renderer?.render(scene, camera)
      }
      resizeObserver = observeResize(host, resize)
      resize()

      const render = () => {
        animationFrame = window.requestAnimationFrame(render)
        structure.rotation.y += 0.0018
        structure.rotation.x += (pointer.y * 0.13 - structure.rotation.x) * 0.025
        structure.rotation.z += (-pointer.x * 0.12 - structure.rotation.z) * 0.025
        renderer?.render(scene, camera)
      }
      if (!reducedMotion) animationFrame = window.requestAnimationFrame(render)

      return () => {
        window.cancelAnimationFrame(animationFrame)
        resizeObserver?.disconnect()
        host.removeEventListener('pointermove', onPointerMove)
        host.removeEventListener('pointerleave', onPointerLeave)
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments || object instanceof THREE.Points) {
            object.geometry.dispose()
            const materials = Array.isArray(object.material) ? object.material : [object.material]
            materials.forEach((material) => material.dispose())
          }
        })
        renderer?.dispose()
        renderer?.domElement.remove()
      }
    } catch {
      renderer?.dispose()
      renderer?.domElement.remove()
      setWebglUnavailable(true)
    }
  }, [])

  return (
    <div className={`scene-canvas${webglUnavailable ? ' is-fallback' : ''}`} ref={hostRef} aria-hidden="true">
      {webglUnavailable && <div className="scene-fallback"><span /><i /><b /></div>}
    </div>
  )
}