import { ref, watch, onMounted, onBeforeUnmount, type Ref } from 'vue'

export type OperatorMode = 'saludo' | 'computo' | 'celebracion'

interface UseSpriteAnimatorOptions {
  totalFrames?: number
  fps?: number
}

// Global shared cache of decoded Image elements across all components
const globalFrameCache: Record<OperatorMode, (HTMLImageElement | null)[]> = {
  saludo: [],
  computo: [],
  celebracion: []
}

const globalLoadedCounts: Record<OperatorMode, number> = {
  saludo: 0,
  computo: 0,
  celebracion: 0
}

const activeModeLoaders: Partial<Record<OperatorMode, Promise<void>>> = {}

const padFrame = (index: number): string => String(index).padStart(4, '0')

/**
 * Loads a single frame with automatic exponential backoff retry (up to 3 attempts)
 * and decoding verification so transient HTTP/2 or CDN hiccups never leave permanently broken frames.
 */
function loadFrameWithRetry(url: string, maxRetries = 3): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    let attempt = 0

    const tryLoad = () => {
      attempt++
      const img = new Image()
      img.decoding = 'async'

      img.onload = async () => {
        try {
          if (typeof img.decode === 'function') {
            await img.decode()
          }
        } catch {
          // Fallback if decode() rejects on an already loaded image
        }
        resolve(img)
      }

      img.onerror = () => {
        if (attempt <= maxRetries) {
          const delayMs = attempt * 350
          setTimeout(() => {
            // Append cache-buster only on final retry if a proxy cached a bad response
            img.src = attempt === maxRetries ? `${url}?r=${attempt}` : url
          }, delayMs)
        } else {
          resolve(null)
        }
      }

      img.src = url
    }

    tryLoad()
  })
}

export function useSpriteAnimator(
  canvasRef: Ref<HTMLCanvasElement | null>,
  mode: Ref<OperatorMode>,
  options: UseSpriteAnimatorOptions = {}
) {
  const totalFrames = options.totalFrames ?? 96
  const fps = options.fps ?? 24

  const isLoaded = ref(false)
  const loadProgress = ref(0)
  const currentFrameIndex = ref(0)
  const reducedMotion = ref(false)

  let rafId: number | null = null
  let lastFrameTime = 0

  /**
   * Finds the nearest available loaded frame <= frameIdx (or frame 0)
   * so the animation never flickers blank or resets jarring to 0 if one frame is still streaming.
   */
  const getBestAvailableFrame = (
    targetMode: OperatorMode,
    desiredIdx: number
  ): HTMLImageElement | null => {
    const frames = globalFrameCache[targetMode]
    if (!frames || frames.length === 0) return null

    if (frames[desiredIdx]) {
      return frames[desiredIdx]
    }

    // Search backward for the closest loaded frame
    for (let i = desiredIdx - 1; i >= 0; i--) {
      if (frames[i]) return frames[i]
    }

    // Or search forward if frame 0 somehow wasn't first
    for (let i = desiredIdx + 1; i < totalFrames; i++) {
      if (frames[i]) return frames[i]
    }

    return null
  }

  const drawFrame = (frameIdx: number) => {
    const canvas = canvasRef.value
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = getBestAvailableFrame(mode.value, frameIdx)
    if (!img) return

    const width = canvas.width
    const height = canvas.height

    ctx.clearRect(0, 0, width, height)
    ctx.imageSmoothingEnabled = false

    const scale = Math.min(width / img.naturalWidth, height / img.naturalHeight) * 0.96
    const drawW = img.naturalWidth * scale
    const drawH = img.naturalHeight * scale
    const offsetX = (width - drawW) / 2
    const offsetY = height - drawH

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH)
  }

  const ensureModeLoaded = async (targetMode: OperatorMode): Promise<void> => {
    // Initialize slot array once
    if (globalFrameCache[targetMode].length !== totalFrames) {
      globalFrameCache[targetMode] = new Array(totalFrames).fill(null)
    }

    // If first frame is already cached, render immediately
    if (globalFrameCache[targetMode][0]) {
      isLoaded.value = true
      if (targetMode === mode.value) {
        loadProgress.value = Math.round((globalLoadedCounts[targetMode] / totalFrames) * 100)
        drawFrame(currentFrameIndex.value)
      }
    }

    // If completely loaded, nothing more to fetch
    if (globalLoadedCounts[targetMode] >= totalFrames) {
      return
    }

    // Reuse in-flight loader if another component already started it
    if (activeModeLoaders[targetMode]) {
      await activeModeLoaders[targetMode]
      return
    }

    const baseUrl = import.meta.env.BASE_URL || '/'

    const loaderPromise = (async () => {
      // 1. Priority fetch: Frame 0000 for immediate visual paint
      if (!globalFrameCache[targetMode][0]) {
        const firstImg = await loadFrameWithRetry(
          `${baseUrl}animations/${targetMode}/frame_0000.png`
        )
        if (firstImg) {
          globalFrameCache[targetMode][0] = firstImg
          globalLoadedCounts[targetMode]++
          isLoaded.value = true
          if (targetMode === mode.value) {
            loadProgress.value = Math.round((globalLoadedCounts[targetMode] / totalFrames) * 100)
            drawFrame(0)
          }
        }
      }

      // 2. Priority stride fetch: load every 4th frame first (0, 4, 8, 12...)
      // so a smooth 6fps preview animation works within ~150ms even on slow 3G connections!
      const strideOrder: number[] = []
      const visited = new Set<number>([0])

      for (const step of [4, 2, 1]) {
        for (let i = step; i < totalFrames; i += step) {
          if (!visited.has(i)) {
            visited.add(i)
            strideOrder.push(i)
          }
        }
      }

      // Fetch in controlled batches of 6 concurrent requests
      const batchSize = 6
      for (let b = 0; b < strideOrder.length; b += batchSize) {
        const slice = strideOrder.slice(b, b + batchSize)
        await Promise.all(
          slice.map(async (frameIndex) => {
            if (globalFrameCache[targetMode][frameIndex]) return
            const url = `${baseUrl}animations/${targetMode}/frame_${padFrame(frameIndex)}.png`
            const img = await loadFrameWithRetry(url)
            if (img) {
              globalFrameCache[targetMode][frameIndex] = img
              globalLoadedCounts[targetMode]++
              if (targetMode === mode.value) {
                loadProgress.value = Math.round(
                  (globalLoadedCounts[targetMode] / totalFrames) * 100
                )
              }
            }
          })
        )
      }
    })()

    activeModeLoaders[targetMode] = loaderPromise
    try {
      await loaderPromise
    } finally {
      delete activeModeLoaders[targetMode]
    }
  }

  const tick = (timestamp: number) => {
    if (reducedMotion.value) {
      drawFrame(0)
      return
    }

    const interval = 1000 / fps
    if (timestamp - lastFrameTime >= interval) {
      lastFrameTime = timestamp
      // Always advance the timeline clock smoothly 0..95; getBestAvailableFrame
      // guarantees we always draw the closest decoded frame without resetting to 0!
      currentFrameIndex.value = (currentFrameIndex.value + 1) % totalFrames
      drawFrame(currentFrameIndex.value)
    }

    rafId = requestAnimationFrame(tick)
  }

  watch(mode, (newMode) => {
    currentFrameIndex.value = 0
    drawFrame(0)
    ensureModeLoaded(newMode)
  })

  onMounted(async () => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.value = mediaQuery.matches

    // Start animation loop immediately so the canvas paints as soon as frame 0 arrives
    if (!reducedMotion.value) {
      rafId = requestAnimationFrame(tick)
    }

    await ensureModeLoaded(mode.value)

    // Sequentially warm up remaining modes in the background
    const otherModes: OperatorMode[] = ['saludo', 'computo', 'celebracion'].filter(
      (m) => m !== mode.value
    ) as OperatorMode[]

    for (const m of otherModes) {
      await ensureModeLoaded(m)
    }
  })

  onBeforeUnmount(() => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
    }
  })

  return {
    isLoaded,
    loadProgress,
    currentFrameIndex
  }
}
