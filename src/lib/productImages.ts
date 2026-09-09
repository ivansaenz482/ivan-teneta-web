export function placeholderImage(emoji: string): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#101a2f'/><stop offset='1' stop-color='#0e7490'/></linearGradient></defs><rect width='400' height='400' fill='url(#g)'/><text x='200' y='250' font-size='170' text-anchor='middle'>${emoji}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Imagen inválida'))
    img.src = src
  })
}

function drawScaled(img: HTMLImageElement, maxSize: number, quality: number): string {
  let { width, height } = img
  const scale = Math.min(1, maxSize / Math.max(width, height))
  width = Math.max(1, Math.round(width * scale))
  height = Math.max(1, Math.round(height * scale))
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return img.src
  ctx.drawImage(img, 0, 0, width, height)
  return canvas.toDataURL('image/jpeg', quality)
}

export async function fileToDataUri(file: File, maxSize = 512, quality = 0.8): Promise<string> {
  const data = await readFile(file)
  const img = await loadImage(data)
  return drawScaled(img, maxSize, quality)
}

export function isImageDataUri(value: string): boolean {
  return /^data:image\/(png|jpe?g|webp|gif);base64,/.test(value)
}

export async function recompressDataUri(
  dataUri: string,
  maxSize = 512,
  quality = 0.8
): Promise<string> {
  if (!isImageDataUri(dataUri)) return dataUri
  try {
    const img = await loadImage(dataUri)
    return drawScaled(img, maxSize, quality)
  } catch {
    return dataUri
  }
}