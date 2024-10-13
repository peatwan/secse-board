export enum PredictionMode {
  NOT_USE,
  MODELING_PER_GENERATION,
  MODELING_ON_ALL_GENERATION
}
export type DockingProgram = 'vina' | 'glide' | 'autodock-gpu' | 'unidock'

export interface DefaultConfig {
  projectCode: string
  workdir: string
  fragments: string
  numGen: string
  numPerGen: string
  seedPerGen: string
  startGen: string
  dockingProgram: DockingProgram
  cpu: string
  gpu: string
  ruleDb: string
}

export interface DockingConfig {
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

export interface PredictionConfig {
  mode: PredictionMode
  dlPerGen: string
  dlScoreCutoff: string
}

export interface MolecularPropertiesConfig {
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
  defaultConfig: DefaultConfig
  docking: DockingConfig
  prediction: PredictionConfig
  molecularProperties: MolecularPropertiesConfig
}
