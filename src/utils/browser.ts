export function mediaQueryMatches(query: string): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }

  return window.matchMedia(query).matches
}

export function observeResize(element: Element, callback: ResizeObserverCallback) {
  if (typeof ResizeObserver === 'undefined') {
    return undefined
  }

  const observer = new ResizeObserver(callback)
  observer.observe(element)
  return observer
}
