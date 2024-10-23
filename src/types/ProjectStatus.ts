import { Status } from 'utils/store'

export interface ProjectStatus {
  status: Status
  project_code: string
  timestamp: string
}
