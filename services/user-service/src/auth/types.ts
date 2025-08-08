export interface User {
  id: string
  name: string
  email: string
  avatar?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface AuthPayload {
  userId: string
  email: string
  name: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface AuthResponse {
  user: User
  tokens: AuthTokens
}
