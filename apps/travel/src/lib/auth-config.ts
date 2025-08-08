// Storage keys
export const TOKEN_KEY = 'auth_token'
export const USER_KEY = 'auth_user'

// API base URL
export const API_BASE_URL = 'http://localhost:8011'

// Helper function to get auth token for API requests
export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}
