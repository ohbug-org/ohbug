export interface OhbugAction {
  type: string
  timestamp: string
  message?: string
  metaData?: Record<string, any>
}
