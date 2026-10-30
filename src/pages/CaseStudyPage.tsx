import { useEffect, useRef } from 'react'

const articlePath = '/articles/oman-telecom-network-infrastructure-case-study.html'

function CaseStudyPage() {
  const frameRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    let observer: ResizeObserver | undefined
    const updateHeight = () => {
      const articleDocument = frame.contentDocument
      if (!articleDocument?.documentElement || !articleDocument.body) return

      const height = Math.max(articleDocument.documentElement.scrollHeight, articleDocument.body.scrollHeight)
      if (Math.abs(frame.getBoundingClientRect().height - height) > 1) frame.style.height = `${height}px`
    }
    const observeArticle = () => {
      const articleDocument = frame.contentDocument
      if (!articleDocument?.documentElement || !articleDocument.body) return

      observer?.disconnect()
      if (typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(updateHeight)
        observer.observe(articleDocument.documentElement)
        observer.observe(articleDocument.body)
      } else {
        window.addEventListener('resize', updateHeight)
      }
      updateHeight()
    }

    frame.addEventListener('load', observeArticle)
    if (frame.contentDocument?.readyState === 'complete') observeArticle()

    return () => {
      frame.removeEventListener('load', observeArticle)
      window.removeEventListener('resize', updateHeight)
      observer?.disconnect()
    }
  }, [])

  return (
    <main className="case-study-page" id="top">
      <iframe
        ref={frameRef}
        className="case-study-frame"
        src={articlePath}
        title="Oman Telecom Network Infrastructure Case Study"
        loading="eager"
      />
    </main>
  )
}

export default CaseStudyPage
