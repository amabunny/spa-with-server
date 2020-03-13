import axios from 'axios'
import { EnvService } from '@app/services/env'

export const hostApi = axios.create({
  baseURL: EnvService.getHostUrl()
})
