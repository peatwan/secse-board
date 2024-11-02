import { Status } from 'utils/store'

export interface ProjectStatus {
  status: Status
  project_code: string
  start_time: string
  update_time: string
  generation: { current: number; total: number }
}

export interface Scores {
  dockingScore: number[]
  scoreCutoff: number[]
}

export interface MoleculeNumber {
  generated: number[]
  filtered: number[]
}

export interface GenerationDetails {
  id: string
}

export interface GenerationResult extends GenerationDetails {
  smiles: string
  dockingScore: string
  deltaDockingScore: string
  rmsd: string
}
