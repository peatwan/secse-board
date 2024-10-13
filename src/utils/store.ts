import { DockingProgram } from 'pages/new/types/appConfig'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type Status = 'NotCreated' | 'Created'

interface ProjectState {
  path: string
  status: Status
  dockingProgram: DockingProgram
  setPath: (path: string) => void
  setStatus: (created: Status) => void
  setDockingProgram: (dockingProgram: DockingProgram) => void
}

export const useProjectStore = create<ProjectState>()(
  devtools(
    (set) => ({
      path: '',
      status: 'NotCreated',
      dockingProgram: 'vina',
      setPath: (path) => set({ path: path }),
      setStatus: (created) => set({ status: created }),
      setDockingProgram: (dockingProgram) =>
        set({ dockingProgram: dockingProgram })
    }),
    { name: 'ProjectStore' }
  )
)
