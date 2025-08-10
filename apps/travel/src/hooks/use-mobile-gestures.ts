import { useEffect, useRef, useState } from 'react'

interface SwipeGesture {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  threshold?: number
  preventScroll?: boolean
}

export function useSwipeGesture(options: SwipeGesture) {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold = 50,
    preventScroll = false,
  } = options

  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const touchEnd = useRef<{ x: number; y: number } | null>(null)

  const handleTouchStart = (e: TouchEvent) => {
    touchEnd.current = null
    touchStart.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    }
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (preventScroll) {
      e.preventDefault()
    }
    touchEnd.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    }
  }

  const handleTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return

    const distanceX = touchStart.current.x - touchEnd.current.x
    const distanceY = touchStart.current.y - touchEnd.current.y
    const isLeftSwipe = distanceX > threshold
    const isRightSwipe = distanceX < -threshold
    const isUpSwipe = distanceY > threshold
    const isDownSwipe = distanceY < -threshold

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft()
    }
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight()
    }
    if (isUpSwipe && onSwipeUp) {
      onSwipeUp()
    }
    if (isDownSwipe && onSwipeDown) {
      onSwipeDown()
    }
  }

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  }
}

export function useMobileSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)

  const handleTouchStart = (e: TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setCurrentX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return

    const currentTouch = e.touches[0].clientX
    setCurrentX(currentTouch)

    // Prevent scrolling while dragging sidebar
    if (Math.abs(currentTouch - startX) > 10) {
      e.preventDefault()
    }
  }

  const handleTouchEnd = () => {
    if (!isDragging) return

    setIsDragging(false)

    const deltaX = currentX - startX
    const threshold = 100

    if (deltaX > threshold && !isOpen) {
      setIsOpen(true)
    } else if (deltaX < -threshold && isOpen) {
      setIsOpen(false)
    }
  }

  const swipeGestures = useSwipeGesture({
    onSwipeRight: () => {
      if (!isOpen) setIsOpen(true)
    },
    onSwipeLeft: () => {
      if (isOpen) setIsOpen(false)
    },
    threshold: 75,
  })

  return {
    isOpen,
    setIsOpen,
    isDragging,
    swipeGestures,
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  }
}

export function useInfiniteScroll(
  callback: () => void,
  options: { threshold?: number; enabled?: boolean } = {}
) {
  const { threshold = 100, enabled = true } = options
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!enabled) return

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight

      if (scrollHeight - scrollTop - clientHeight < threshold && !isLoading) {
        setIsLoading(true)
        callback()
        setTimeout(() => setIsLoading(false), 1000)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [callback, threshold, enabled, isLoading])

  return { isLoading }
}
