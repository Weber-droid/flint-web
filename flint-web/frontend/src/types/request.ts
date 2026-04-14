export type HttpMethod =
  | 'GET' | 'POST' | 'PUT' | 'DELETE'
  | 'PATCH' | 'HEAD' | 'OPTIONS'

export type BodyType =
  | 'none' | 'json' | 'form-data'
  | 'raw' | 'binary' | 'graphql'

export type AuthType =
  | 'none' | 'bearer' | 'basic'
  | 'api-key' | 'oauth2'

export interface KeyValue {
  id: string
  key: string
  value: string
  enabled: boolean
  secret?: boolean
}

export interface Auth {
  type: AuthType
  bearer?: { token: string }
  basic?: { username: string; password: string }
  apiKey?: { key: string; value: string; in: 'header' | 'query' }
  oauth2?: { accessToken: string; tokenUrl: string; clientId: string }
}

export interface Request {
  id: string
  name: string
  method: HttpMethod
  url: string
  headers: KeyValue[]
  params: KeyValue[]
  body: string
  bodyType: BodyType
  auth: Auth
  preRequestScript: string
  testScript: string
  collectionId?: string
  folderId?: string
  createdAt: number
  updatedAt: number
}
