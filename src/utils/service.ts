import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  AxiosError
} from 'axios'
import { get, merge } from 'lodash-es'
import { toast } from 'sonner'

/** Create request instance */
function createService(
  baseURL: string = import.meta.env.VITE_BASE_API
): AxiosInstance {
  const service = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 5000
  })

  // Request interceptor
  service.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  )

  // Response interceptor (can be adjusted according to specific business requirements)
  service.interceptors.response.use(
    (response) => response.data,
    (error: AxiosError) => {
      const status = get(error, 'response.status')
      switch (status) {
        case 400:
          error.message = get(error, 'response.data.error') || 'Request error'
          break
        case 401:
          error.message = 'Unauthorized, please log in'
          // Handle logout
          break
        case 403:
          error.message = 'Access denied'
          break
        case 404:
          error.message = 'Request address error'
          break
        case 500:
          error.message = 'Internal server error'
          break
        // Add additional status cases if needed
        default:
          error.message = 'Network error, please try again later'
          break
      }
      toast.error(error.message)
      return Promise.reject(error)
    }
  )
  return service
}

/** Create request method */
function createRequest(service: AxiosInstance) {
  return function <T>(config: AxiosRequestConfig): Promise<T> {
    const defaultConfig: AxiosRequestConfig = {
      headers: { 'Content-Type': 'application/json' },
      timeout: 60000,
      baseURL: import.meta.env.VITE_BASE_API,
      data: {}
    }
    // Merge defaultConfig with the custom config passed in to create mergeConfig
    const mergeConfig = merge(defaultConfig, config)
    return service(mergeConfig)
  }
}

const service = createService()
export const request = createRequest(service)
