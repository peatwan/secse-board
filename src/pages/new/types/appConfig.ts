export enum PredictionMode {
  NOT_USE,
  MODELING_PER_GENERATION,
  MODELING_ON_ALL_GENERATION
}
export type DockingProgram = 'vina' | 'glide' | 'autodock-gpu' | 'unidock'

export interface General {
  projectCode: string
  workdir: string
  fragments: string
  numGen: string
  numPerGen: string
  seedPerGen: string
  startGen: string
  cpu: string
  gpu: string
  ruleDb: string
}

export interface Docking {
  dockingProgram: DockingProgram
  target: string
  rmsd: string
  deltaScore: string
  scoreCutoff: string
  x?: string
  y?: string
  z?: string
  boxSizeX?: string
  boxSizeY?: string
  boxSizeZ?: string
}

export interface Prediction {
  mode: PredictionMode
  dlPerGen: string
  dlScoreCutoff: string
}

export interface Properties {
  mw: string
  logpLower: string
  logpUpper: string
  chiralCenter: string
  heteroatomRatio: string
  rdkitRotatableBoundNum: string
  keenRotatableBoundNum: string
  rigidBodyNum: string
  hbd: string
  hba: string
  tpsa: string
  lipinskiViolation: string
  qed: string
  maxRingSize: string
  maxRingSystemSize: string
  ringSystemCount: string
  bridgedSiteCount: string
  spiroSiteCount: string
  fusedSiteCount: string
  rdkitSaScore: string
  substructureFilter: string
}

export interface AppConfig {
  general: General
  docking: Docking
  prediction: Prediction
  properties: Properties
}
