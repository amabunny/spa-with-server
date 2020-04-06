const KEYS = {
  JWT_ACCESS_TOKEN: 'jwt_access_token'
}

export const LocalStorageService = {
  __setOrRemoveValue (key: string, value: string | null) {
    if (value) {
      localStorage.setItem(key, value)
    } else {
      localStorage.removeItem(key)
    }
  },

  getAccessToken () {
    return localStorage.getItem(KEYS.JWT_ACCESS_TOKEN)
  },

  setAccessToken (value: string | null) {
    LocalStorageService.__setOrRemoveValue(KEYS.JWT_ACCESS_TOKEN, value)
  }
}
