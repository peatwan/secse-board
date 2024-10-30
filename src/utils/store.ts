import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export type Status =
  | 'NotCreated'
  | 'Created'
  | 'Running'
  | 'Paused'
  | 'Finished'
  | 'Failed'
  | 'Stopped'

interface ProjectState {
  path: string
  status: Status
  startTime: string
  updateTime: string
  currentGeneration: number
  totalGeneration: number
  setPath: (path: string) => void
  setStatus: (created: Status) => void
  setStartTime: (time: string) => void
  setUpdateTime: (time: string) => void
  setCurrentGeneration: (generation: number) => void
  setTotalGeneration: (generation: number) => void
}

export const useProjectStore = create<ProjectState>()(
  devtools(
    (set) => ({
      path: '',
      status: 'NotCreated',
      startTime: '',
      updateTime: '',
      currentGeneration: 0,
      totalGeneration: 0,
      setPath: (path) => set({ path: path }),
      setStatus: (created) => set({ status: created }),
      setStartTime: (time) => set({ startTime: time }),
      setUpdateTime: (time) => set({ updateTime: time }),
      setCurrentGeneration: (generation) =>
        set({ currentGeneration: generation }),
      setTotalGeneration: (generation) => set({ totalGeneration: generation })
    }),

    { name: 'ProjectStore' }
  )
)
