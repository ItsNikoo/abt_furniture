// Centralized API base URL resolution and helpers

export function getApiBaseUrl(): string {
  // Browser: use public URL (nginx on host)
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || '/api'
  }
  // Server (inside Docker network): prefer env, fallback to Docker DNS
  return process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://backend:8000/api'
}

export function apiUrl(path: string): string {
  const base = getApiBaseUrl().replace(/\/$/, '')
  const segment = path.startsWith('/') ? path : `/${path}`
  return `${base}${segment}`
}
