import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export type Status =
  | 'NotCreated'
  | 'Created'
  | 'Running'
  | 'Paused'
  | 'Finished'
  | 'Failed'

interface ProjectState {
  path: string
  status: Status
  setPath: (path: string) => void
  setStatus: (created: Status) => void
}

export const useProjectStore = create<ProjectState>()(
  devtools(
    (set) => ({
      path: '',
      status: 'NotCreated',
      setPath: (path) => set({ path: path }),
      setStatus: (created) => set({ status: created })
    }),
    { name: 'ProjectStore' }
  )
)
