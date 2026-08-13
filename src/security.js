export function safeHttpUrl(rawUrl) {
  if (typeof rawUrl !== 'string') return null
  try {
    const url = new URL(rawUrl)
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : null
  } catch {
    return null
  }
}
