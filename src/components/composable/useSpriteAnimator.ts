import { ref, watch, onMounted, onBeforeUnmount, type Ref } from 'vue'

export type OperatorMode = 'saludo' | 'computo' | 'celebracion'

interface UseSpriteAnimatorOptions {
  totalFrames?: number
  fps?: number
}

// Global shared singleton cache so multiple OperatorMonitor instances never duplicate network requests
const globalFrameCache: Record<OperatorMode, HTMLCanvasElement[]> = {
  saludo: [],
  computo: [],
  celebracion: []
}

const globalPreloadPromises: Partial<Record<OperatorMode, Promise<void>>> = {}

export function useSpriteAnimator(
  canvasRef: Ref<HTMLCanvasElement | null>,
  mode: Ref<OperatorMode>,
  options: UseSpriteAnimatorOptions = {}
) {
  const totalFrames = options.totalFrames ?? 96
  const fps = options.fps ?? 24

  const isLoaded = ref(false)
  const currentFrameIndex = ref(0)
  const reducedMotion = ref(false)

  let rafId: number | null = null
  let lastFrameTime = 0

  const padFrame = (index: number): string => String(index).padStart(4, '0')

  const cutoutSpriteFrame = (img: HTMLImageElement): HTMLCanvasElement => {
    const offscreen = document.createElement('canvas')
    const w = img.width
    const h = img.height
    offscreen.width = w
    offscreen.height = h
    const ctx = offscreen.getContext('2d', { willReadFrequently: true })
    if (!ctx) return offscreen

    ctx.drawImage(img, 0, 0)
    const imageData = ctx.getImageData(0, 0, w, h)
    const data = imageData.data
    const visited = new Uint8Array(w * h)
    const stack: number[] = []

    const isExteriorWhite = (idx: number): boolean => {
      const r = data[idx]
      const g = data[idx + 1]
      const b = data[idx + 2]
      const a = data[idx + 3]
      if (a < 20) return true
      return r > 234 && g > 234 && b > 234
    }

    for (let x = 0; x < w; x++) {
      stack.push(x)
      stack.push((h - 1) * w + x)
    }
    for (let y = 0; y < h; y++) {
      stack.push(y * w)
      stack.push(y * w + (w - 1))
    }

    while (stack.length > 0) {
      const pos = stack.pop()!
      if (pos < 0 || pos >= w * h || visited[pos]) continue
      visited[pos] = 1

      const pixelIdx = pos * 4
      if (isExteriorWhite(pixelIdx)) {
        data[pixelIdx + 3] = 0
        const x = pos % w
        const y = (pos - x) / w
        if (x > 0) stack.push(pos - 1)
        if (x < w - 1) stack.push(pos + 1)
        if (y > 0) stack.push(pos - w)
        if (y < h - 1) stack.push(pos + w)
      }
    }

    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] === 0) continue
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      if (g > 190 && r < 70 && b < 70) {
        data[i + 3] = 0
      }
    }

    ctx.putImageData(imageData, 0, 0)
    return offscreen
  }

  const preloadMode = async (targetMode: OperatorMode): Promise<void> => {
    if (globalFrameCache[targetMode].length === totalFrames && globalFrameCache[targetMode][0]) {
      isLoaded.value = true
      drawFrame(0)
      return
    }

    if (globalPreloadPromises[targetMode]) {
      await globalPreloadPromises[targetMode]
      isLoaded.value = true
      drawFrame(0)
      return
    }

    const promise = (async () => {
      const processedFrames: HTMLCanvasElement[] = new Array(totalFrames)
      globalFrameCache[targetMode] = processedFrames

      const baseUrl = import.meta.env.BASE_URL || '/'

      await new Promise<void>((resolve) => {
        const firstImg = new Image()
        firstImg.src = `${baseUrl}animations/${targetMode}/frame_0000.png`
        firstImg.onload = () => {
          processedFrames[0] = cutoutSpriteFrame(firstImg)
          isLoaded.value = true
          drawFrame(0)
          resolve()
        }
        firstImg.onerror = () => resolve()
      })

      // Load remaining frames in controlled concurrent batches of 8 to prevent HTTP/2 queue drops
      const batchSize = 8
      for (let start = 1; start < totalFrames; start += batchSize) {
        const end = Math.min(totalFrames, start + batchSize)
        const batchPromises: Promise<void>[] = []

        for (let i = start; i < end; i++) {
          batchPromises.push(
            new Promise<void>((resolve) => {
              const img = new Image()
              img.src = `${baseUrl}animations/${targetMode}/frame_${padFrame(i)}.png`
              img.onload = () => {
                processedFrames[i] = cutoutSpriteFrame(img)
                resolve()
              }
              img.onerror = () => resolve()
            })
          )
        }

        await Promise.all(batchPromises)
      }
    })()

    globalPreloadPromises[targetMode] = promise
    await promise
  }

  const drawFrame = (frameIdx: number) => {
    const canvas = canvasRef.value
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const activeFrames = globalFrameCache[mode.value]
    const frameCanvas = activeFrames[frameIdx] || activeFrames[0]
    if (!frameCanvas) return

    const width = canvas.width
    const height = canvas.height

    ctx.clearRect(0, 0, width, height)
    ctx.imageSmoothingEnabled = false

    const scale = Math.min(width / frameCanvas.width, height / frameCanvas.height) * 0.96
    const drawW = frameCanvas.width * scale
    const drawH = frameCanvas.height * scale
    const offsetX = (width - drawW) / 2
    const offsetY = height - drawH

    ctx.drawImage(frameCanvas, offsetX, offsetY, drawW, drawH)
  }

  const tick = (timestamp: number) => {
    if (reducedMotion.value) {
      drawFrame(0)
      return
    }

    const interval = 1000 / fps
    if (timestamp - lastFrameTime >= interval) {
      lastFrameTime = timestamp
      const activeFrames = globalFrameCache[mode.value]
      const nextIndex = (currentFrameIndex.value + 1) % totalFrames
      currentFrameIndex.value = activeFrames[nextIndex] ? nextIndex : 0
      drawFrame(currentFrameIndex.value)
    }

    rafId = requestAnimationFrame(tick)
  }

  watch(mode, async (newMode) => {
    currentFrameIndex.value = 0
    await preloadMode(newMode)
    drawFrame(0)
  })

  onMounted(async () => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.value = mediaQuery.matches

    await preloadMode(mode.value)
    setTimeout(async () => {
      await preloadMode('computo')
      await preloadMode('celebracion')
    }, 400)

    if (!reducedMotion.value) {
      rafId = requestAnimationFrame(tick)
    }
  })

  onBeforeUnmount(() => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
    }
  })

  return {
    isLoaded,
    currentFrameIndex
  }
}
