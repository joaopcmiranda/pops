import { useEffect, useState, useRef, useCallback } from 'react'
import { useIsMobile } from './use-mobile'

/**
 * Hook for optimizing performance on mobile devices
 */
export function useMobilePerformance() {
  const isMobile = useIsMobile()
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [connectionSpeed, setConnectionSpeed] = useState<'slow' | 'fast' | 'unknown'>('unknown')

  useEffect(() => {
    if (!isMobile) return

    // Detect low-end device based on hardware concurrency and memory
    const navigator = window.navigator as Navigator & {
      hardwareConcurrency?: number
      deviceMemory?: number
    }
    const hardwareConcurrency = navigator.hardwareConcurrency || 2
    const deviceMemory = navigator.deviceMemory || 4

    // Consider low-end if less than 4 cores or less than 2GB RAM
    if (hardwareConcurrency < 4 || deviceMemory < 2) {
      setIsLowEndDevice(true)
    }

    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(prefersReducedMotion.matches)

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    prefersReducedMotion.addEventListener('change', handleMotionChange)

    // Detect connection speed
    const connection =
      (
        navigator as Navigator & {
          connection?: { effectiveType: string }
          mozConnection?: { effectiveType: string }
          webkitConnection?: { effectiveType: string }
        }
      ).connection ||
      (
        navigator as Navigator & {
          mozConnection?: { effectiveType: string }
        }
      ).mozConnection ||
      (
        navigator as Navigator & {
          webkitConnection?: { effectiveType: string }
        }
      ).webkitConnection
    if (connection) {
      const effectiveType = connection.effectiveType
      if (effectiveType === 'slow-2g' || effectiveType === '2g' || effectiveType === '3g') {
        setConnectionSpeed('slow')
      } else {
        setConnectionSpeed('fast')
      }
    }

    return () => {
      prefersReducedMotion.removeEventListener('change', handleMotionChange)
    }
  }, [isMobile])

  return {
    isMobile,
    isLowEndDevice,
    reducedMotion,
    connectionSpeed,
    shouldLimitAnimations: reducedMotion || isLowEndDevice,
    shouldLimitImages: connectionSpeed === 'slow',
    shouldUseVirtualization: isMobile && isLowEndDevice,
  }
}

/**
 * Hook for intersection observer with mobile optimizations
 */
export function useIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) {
  const { isLowEndDevice } = useMobilePerformance()
  const observer = useRef<IntersectionObserver>()

  const observe = useCallback(
    (element: Element) => {
      if (observer.current) observer.current.disconnect()

      // Use larger root margin on low-end devices to reduce calculations
      const rootMargin = isLowEndDevice ? '100px' : '50px'

      observer.current = new IntersectionObserver(callback, {
        rootMargin,
        threshold: isLowEndDevice ? 0.1 : 0.25,
        ...options,
      })

      if (element) observer.current.observe(element)
    },
    [callback, options, isLowEndDevice]
  )

  const disconnect = useCallback(() => {
    if (observer.current) observer.current.disconnect()
  }, [])

  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [disconnect])

  return { observe, disconnect }
}

/**
 * Hook for lazy loading components with mobile optimizations
 */
export function useLazyLoad<T extends HTMLElement>(
  threshold = 0.1
): [React.RefCallback<T>, boolean] {
  const [isInView, setIsInView] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const { isLowEndDevice } = useMobilePerformance()

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (entry.isIntersecting && !hasLoaded) {
        setIsInView(true)
        setHasLoaded(true)
      }
    },
    [hasLoaded]
  )

  const { observe, disconnect } = useIntersectionObserver(callback, {
    threshold: isLowEndDevice ? 0.05 : threshold,
  })

  const ref = useCallback(
    (node: T) => {
      if (node) {
        observe(node)
      } else {
        disconnect()
      }
    },
    [observe, disconnect]
  )

  return [ref, isInView]
}

/**
 * Hook for debouncing expensive operations on mobile
 */
export function useMobileDebounce<T extends (...args: never[]) => void>(
  callback: T,
  delay: number = 300
): T {
  const { isLowEndDevice } = useMobilePerformance()
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Increase delay on low-end devices
  const actualDelay = isLowEndDevice ? delay * 1.5 : delay

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args)
      }, actualDelay)
    },
    [callback, actualDelay]
  ) as T

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return debouncedCallback
}

/**
 * Hook for throttling scroll events on mobile
 */
export function useMobileThrottle<T extends (...args: never[]) => void>(
  callback: T,
  delay: number = 16
): T {
  const { isLowEndDevice } = useMobilePerformance()
  const lastRun = useRef(Date.now())

  // Reduce frequency on low-end devices
  const actualDelay = isLowEndDevice ? delay * 2 : delay

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      if (Date.now() - lastRun.current >= actualDelay) {
        callback(...args)
        lastRun.current = Date.now()
      }
    },
    [callback, actualDelay]
  ) as T

  return throttledCallback
}

/**
 * Hook for optimizing render cycles on mobile
 */
export function useMobileOptimizedRender() {
  const { isLowEndDevice, shouldLimitAnimations } = useMobilePerformance()
  const [shouldRender, setShouldRender] = useState(true)
  const lastRenderTime = useRef(Date.now())

  const requestRender = useCallback(() => {
    const now = Date.now()
    const timeSinceLastRender = now - lastRenderTime.current

    // Limit render frequency on low-end devices
    const minRenderInterval = isLowEndDevice ? 33 : 16 // 30fps vs 60fps

    if (timeSinceLastRender >= minRenderInterval) {
      setShouldRender(true)
      lastRenderTime.current = now
    } else {
      setTimeout(() => {
        setShouldRender(true)
        lastRenderTime.current = Date.now()
      }, minRenderInterval - timeSinceLastRender)
    }
  }, [isLowEndDevice])

  return {
    shouldRender,
    requestRender,
    shouldLimitAnimations,
    isLowEndDevice,
  }
}
