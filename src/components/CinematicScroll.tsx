import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Observer } from 'gsap/Observer'
import * as THREE from 'three'
import { mediaQueryMatches, observeResize } from '../utils/browser'

gsap.registerPlugin(ScrollTrigger, Observer)

const chapters = [
  {
    number: '01',
    label: 'INDEPENDENT DIGITAL TECHNOLOGY STUDIO',
    title: 'Your business. Connected to what’s next.',
    description: 'Software, infrastructure, and automation — designed to work together.',
    camera: { x: -30, y: 13, z: 53 },
    target: { x: 0, y: 13, z: 0 },
  },
  {
    number: '02',
    label: 'DIGITAL EXPERIENCES',
    title: 'Make the first impression work harder.',
    description: 'Thoughtful websites and applications help people find their way, understand your offer, and take the next step.',
    camera: { x: 36, y: 12, z: 36 },
    target: { x: 0, y: 11, z: 0 },
  },
  {
    number: '03',
    label: 'SOFTWARE / SYSTEMS / WORKFLOWS',
    title: 'Connect the everyday pieces.',
    description: 'Useful business systems and clear workflows reduce avoidable friction between teams, information, and tools.',
    camera: { x: -31, y: 23, z: 25 },
    target: { x: 0, y: 16, z: 0 },
  },
  {
    number: '04',
    label: 'HOSTING / CLOUD / INFRASTRUCTURE',
    title: 'Build on a steadier foundation.',
    description: 'Right-sized hosting, cloud choices, and practical planning for the technology your business relies on.',
    camera: { x: 5, y: 39, z: 19 },
    target: { x: 0, y: 20, z: 0 },
  },
  {
    number: '05',
    label: 'DEVICES / NETWORKS / SUPPORT',
    title: 'Keep the important things connected.',
    description: 'From devices and Wi-Fi to ongoing maintenance, get help that starts with the real issue.',
    camera: { x: 31, y: 27, z: -29 },
    target: { x: 0, y: 15, z: 0 },
  },
  {
    number: '06',
    label: 'OMAN / WORKING WORLDWIDE',
    title: 'A clearer next step starts here.',
    description: 'Bring the question, the constraint, or the idea. We can shape a practical direction together.',
    camera: { x: 0, y: 16, z: -58 },
    target: { x: 0, y: 15, z: 0 },
  },
]

function createCity(scene: THREE.Scene) {
  const city = new THREE.Group()
  scene.add(city)

  const towerMaterial = new THREE.MeshStandardMaterial({ color: '#101923', metalness: 0.72, roughness: 0.3 })
  const secondaryMaterial = new THREE.MeshStandardMaterial({ color: '#11151e', metalness: 0.65, roughness: 0.38 })
  const edgeMaterial = new THREE.LineBasicMaterial({ color: '#59d9e6', transparent: true, opacity: 0.36 })
  const mainTower = new THREE.Mesh(new THREE.BoxGeometry(7.4, 34, 6.6, 1, 1, 1), towerMaterial)
  mainTower.position.y = 17
  city.add(mainTower)

  const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 1.35, 8, 5), new THREE.MeshStandardMaterial({ color: '#15212d', metalness: 0.78, roughness: 0.25 }))
  crown.position.set(0, 38, 0)
  city.add(crown)
  const crownLine = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 10, 6), new THREE.MeshBasicMaterial({ color: '#7ef5f0' }))
  crownLine.position.set(0, 43, 0)
  city.add(crownLine)

  const edge = new THREE.LineSegments(new THREE.EdgesGeometry(mainTower.geometry), edgeMaterial)
  edge.position.copy(mainTower.position)
  city.add(edge)

  const windowGeometry = new THREE.BoxGeometry(0.14, 0.34, 0.035)
  const windowMaterial = new THREE.MeshBasicMaterial({ color: '#50dbe3', transparent: true, opacity: 0.72 })
  const frontWindows = new THREE.InstancedMesh(windowGeometry, windowMaterial, 6 * 25)
  const sideWindows = new THREE.InstancedMesh(windowGeometry, windowMaterial, 5 * 25)
  const transform = new THREE.Object3D()
  let frontIndex = 0
  let sideIndex = 0
  for (let row = 0; row < 25; row += 1) {
    for (let column = 0; column < 6; column += 1) {
      if ((row * 7 + column * 3) % 5 !== 0) {
        transform.position.set(-2.7 + column * 1.08, 1.1 + row * 1.25, 3.33)
        transform.updateMatrix()
        frontWindows.setMatrixAt(frontIndex, transform.matrix)
        frontIndex += 1
      }
    }
    for (let column = 0; column < 5; column += 1) {
      if ((row * 3 + column * 5) % 6 !== 0) {
        transform.position.set(3.75, 1.1 + row * 1.25, -2.45 + column * 1.08)
        transform.rotation.y = Math.PI / 2
        transform.updateMatrix()
        sideWindows.setMatrixAt(sideIndex, transform.matrix)
        sideIndex += 1
      }
    }
  }
  frontWindows.count = frontIndex
  sideWindows.count = sideIndex
  city.add(frontWindows, sideWindows)

  const surroundingTowers = [
    [-12, 0, -7, 5, 17, 5], [-13, 0, 7, 4, 12, 4], [12, 0, -9, 5, 23, 5],
    [13, 0, 6, 4, 15, 4], [-21, 0, -2, 4, 11, 4], [21, 0, 0, 5, 18, 5],
    [-8, 0, -18, 4, 14, 4], [9, 0, -20, 4, 19, 4], [-19, 0, 17, 5, 21, 5],
    [19, 0, 17, 4, 13, 4], [-29, 0, -12, 5, 16, 5], [29, 0, 12, 5, 22, 5],
  ]
  surroundingTowers.forEach(([x, y, z, width, height, depth], index) => {
    const geometry = new THREE.BoxGeometry(width, height, depth)
    const tower = new THREE.Mesh(geometry, index % 3 === 0 ? towerMaterial : secondaryMaterial)
    tower.position.set(x, y + height / 2, z)
    city.add(tower)
    const towerEdges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), edgeMaterial)
    towerEdges.position.copy(tower.position)
    city.add(towerEdges)
  })

  const ground = new THREE.GridHelper(110, 70, '#24505b', '#13242c')
  ground.position.y = 0.04
  const gridMaterials = Array.isArray(ground.material) ? ground.material : [ground.material]
  gridMaterials.forEach((material) => {
    material.transparent = true
    material.opacity = 0.34
  })
  scene.add(ground)

  const orbit = new THREE.Mesh(new THREE.TorusGeometry(15, 0.025, 6, 180), new THREE.MeshBasicMaterial({ color: '#4b92cb', transparent: true, opacity: 0.42 }))
  orbit.rotation.set(1.04, 0.18, -0.4)
  orbit.position.y = 17
  scene.add(orbit)
  return city
}

export default function CinematicScroll() {
  const wrapperRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const chapterRefs = useRef<(HTMLElement | null)[]>([])
  const progressRef = useRef<HTMLDivElement>(null)
  const progressTextRef = useRef<HTMLSpanElement>(null)
  const cameraPath = useRef({ ...chapters[0].camera })
  const targetPath = useRef({ ...chapters[0].target })
  const activeChapterRef = useRef(0)
  const [webglUnavailable, setWebglUnavailable] = useState(false)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const host = canvasRef.current
    if (!wrapper || !host) return

    const reducedMotion = mediaQueryMatches('(prefers-reduced-motion: reduce)')
    if (reducedMotion) wrapper.classList.add('is-reduced-motion')

    let renderer: THREE.WebGLRenderer | undefined
    let scene: THREE.Scene | undefined
    let camera: THREE.PerspectiveCamera | undefined
    let resizeObserver: ResizeObserver | undefined
    let frame = 0
    let context: gsap.Context | undefined
    let inputObserver: Observer | undefined
    let navigationTimer = 0
    let navigating = false

    try {
      const compact = mediaQueryMatches('(max-width: 760px)')
      renderer = new THREE.WebGLRenderer({ alpha: false, antialias: !compact, powerPreference: 'low-power' })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.2 : 1.55))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.06
      host.appendChild(renderer.domElement)

      scene = new THREE.Scene()
      scene.background = new THREE.Color('#05070a')
      scene.fog = new THREE.FogExp2('#05070a', 0.0075)
      camera = new THREE.PerspectiveCamera(43, 1, 0.1, 180)
      camera.position.set(cameraPath.current.x, cameraPath.current.y, cameraPath.current.z)
      scene.add(new THREE.AmbientLight('#b6d1e8', 0.62))
      const key = new THREE.DirectionalLight('#d9eeff', 2.4)
      key.position.set(12, 32, 18)
      scene.add(key)
      const cyanLight = new THREE.PointLight('#22d3ee', 160, 90)
      cyanLight.position.set(-14, 20, 20)
      scene.add(cyanLight)
      const blueLight = new THREE.PointLight('#5484ff', 110, 85)
      blueLight.position.set(16, 25, -18)
      scene.add(blueLight)
      createCity(scene)

      const resize = () => {
        if (!renderer || !camera || !host) return
        const width = Math.max(host.clientWidth, 1)
        const height = Math.max(host.clientHeight, 1)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height, false)
        renderer.render(scene!, camera)
      }
      resizeObserver = observeResize(host, resize)
      resize()

      const render = () => {
        frame = window.requestAnimationFrame(render)
        if (!camera || !renderer || !scene) return
        camera.position.set(cameraPath.current.x, cameraPath.current.y, cameraPath.current.z)
        camera.lookAt(targetPath.current.x, targetPath.current.y, targetPath.current.z)
        renderer.render(scene, camera)
      }
      if (!reducedMotion) frame = window.requestAnimationFrame(render)

      if (!reducedMotion) {
        context = gsap.context(() => {
          const meter = progressRef.current
          const value = progressTextRef.current
          const textNodes = chapterRefs.current.filter((chapter): chapter is HTMLElement => chapter !== null)
          gsap.set(textNodes, { autoAlpha: 0, y: 26 })

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: wrapper,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.8,
              invalidateOnRefresh: true,
              onUpdate: (trigger) => {
                activeChapterRef.current = Math.min(Math.floor(trigger.progress * chapters.length), chapters.length - 1)
                if (meter) meter.style.width = `${trigger.progress * 100}%`
                if (value) value.textContent = `${Math.round(trigger.progress * 100).toString().padStart(3, '0')}%`
              },
            },
          })

          chapters.forEach((chapter, index) => {
            const start = index
            timeline.to(cameraPath.current, { ...chapter.camera, duration: 1, ease: 'none' }, start)
            timeline.to(targetPath.current, { ...chapter.target, duration: 1, ease: 'none' }, start)
            const textNode = textNodes[index]
            if (textNode) {
              timeline.to(textNode, { autoAlpha: 1, y: 0, duration: 0.18, ease: 'power2.out' }, start)
              if (index < chapters.length - 1) timeline.to(textNode, { autoAlpha: 0, y: -22, duration: 0.18, ease: 'power2.in' }, start + 0.82)
            }
          })
        }, wrapper)

        const navigateChapter = (direction: number) => {
          if (navigating) return
          const current = activeChapterRef.current
          const next = THREE.MathUtils.clamp(current + direction, 0, chapters.length - 1)

          if (next === current) {
            inputObserver?.disable()
            window.scrollBy({ top: direction * window.innerHeight * 0.9, behavior: 'smooth' })
            navigationTimer = window.setTimeout(() => inputObserver?.enable(), 850)
            return
          }

          navigating = true
          const scrollRange = Math.max(wrapper.offsetHeight - window.innerHeight, 0)
          const scrollTop = wrapper.getBoundingClientRect().top + window.scrollY + scrollRange * (next / chapters.length)
          window.scrollTo({ top: scrollTop, behavior: 'smooth' })
          navigationTimer = window.setTimeout(() => { navigating = false }, 850)
        }

        inputObserver = Observer.create({
          target: wrapper,
          type: 'wheel,touch',
          tolerance: 42,
          preventDefault: true,
          onUp: () => navigateChapter(-1),
          onDown: () => navigateChapter(1),
        })
      } else {
        chapterRefs.current.forEach((chapter) => {
          if (chapter) gsap.set(chapter, { clearProps: 'all' })
        })
      }
    } catch {
      renderer?.dispose()
      renderer?.domElement.remove()
      setWebglUnavailable(true)
    }

    return () => {
      window.clearTimeout(navigationTimer)
      inputObserver?.kill()
      context?.revert()
      window.cancelAnimationFrame(frame)
      resizeObserver?.disconnect()
      if (scene) scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments || object instanceof THREE.GridHelper) {
          object.geometry.dispose()
          const materials = Array.isArray(object.material) ? object.material : [object.material]
          materials.forEach((material) => material.dispose())
        }
      })
      renderer?.dispose()
      renderer?.domElement.remove()
    }
  }, [])

  return (
    <section className="cinematic-scroll" ref={wrapperRef} aria-label="Amity Node cinematic introduction">
      <div className="cinematic-stage">
        <div className="cinematic-canvas" ref={canvasRef} aria-hidden="true">{webglUnavailable && <div className="cinematic-fallback"><span /><i /><b /></div>}</div>
        <div className="cinematic-vignette" aria-hidden="true" />
        <div className="cinematic-topline"><Link to="/" className="cinematic-wordmark"><span className="cinematic-mark" />AMITY NODE</Link><span>SOFTWARE / SYSTEMS / INFRASTRUCTURE</span></div>
        <div className="cinematic-scenes">
          {chapters.map((chapter, index) => <article className={`cinematic-chapter cinematic-chapter-${index + 1}`} key={chapter.number} ref={(element) => { chapterRefs.current[index] = element }}>
            <span className="cinematic-chapter-label"><i />{chapter.label}</span>
            <span className="cinematic-number">{chapter.number} <i>/ 06</i></span>
            {index === 0
              ? <h1>Your business.<br />Connected to<br /><span>what’s next.</span></h1>
              : <h2>{chapter.title}</h2>}
            <p>{chapter.description}</p>
            {index === 0 && <div className="cinematic-actions"><Link to="/services" className="cinematic-action-primary">Explore what we build <ArrowRight size={16} /></Link><Link to="/contact" className="cinematic-action-secondary">Start a conversation <ArrowUpRight size={15} /></Link></div>}
            {index === chapters.length - 1 && <div className="cinematic-actions"><Link to="/contact" className="cinematic-action-primary">Start a conversation <ArrowUpRight size={15} /></Link><Link to="/about" className="cinematic-action-secondary">About Amity Node <ArrowRight size={14} /></Link></div>}
          </article>)}
        </div>
        <div className="cinematic-progress"><span className="cinematic-scroll-hint"><ArrowDown size={13} /> SCROLL TO EXPLORE</span><span className="cinematic-progress-value" ref={progressTextRef}>000%</span><div className="cinematic-progress-track"><i ref={progressRef} /></div><span className="cinematic-progress-end">A MORE CONNECTED WAY TO WORK</span></div>
        <span className="cinematic-coordinate">AN / DIGITAL INFRASTRUCTURE / 001</span>
      </div>
    </section>
  )
}