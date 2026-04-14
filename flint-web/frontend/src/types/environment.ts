export interface EnvironmentVariable {
  id: string
  key: string
  value: string
  enabled: boolean
  secret: boolean
}

export interface Environment {
  id: string
  name: string
  variables: EnvironmentVariable[]
  isActive: boolean
  createdAt: number
  updatedAt: number
}
