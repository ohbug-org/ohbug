export interface OhbugAction {
  type: string
  timestamp: string
  message?: string
  data?: Record<string, any>
}
