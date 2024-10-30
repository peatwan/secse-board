import { Status } from 'utils/store'

export interface ProjectStatus {
  status: Status
  project_code: string
  start_time: string
  update_time: string
  generation: { current: number; total: number }
}
