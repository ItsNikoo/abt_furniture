export {}

declare global {
  interface Window {
    ym?: (counterId: number, action: string, target: string, params?: Record<string, unknown>) => void
  }
}