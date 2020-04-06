import { AxiosRequestConfig } from 'axios'
import { LocalStorageService } from '@app/services/local-storage'

export const createAxiosInterceptors = () => {
  const requestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
    const Authorization = LocalStorageService.getAccessToken()

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: Authorization ? `Bearer ${Authorization}` : undefined
      }
    }
  }

  return {
    requestInterceptor
  }
}
