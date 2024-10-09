export interface DefaultConfig {
  projectCode: string
  workdir: string
  fragments: string
  numGen: string
  numPerGen: string
  seedPerGen: string
  startGen: string
  dockingProgram: string
  cpu: string
  gpu: string
  ruleDb: string
}

export interface DockingConfig {
  target: string
  rmd: string
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
  mode: string
  dlPerGen: string
  dlScoreCutoff: string
}

export interface MolecularPropertiesConfig {
  MW: string
  logPLower: string
  logPUpper: string
  chiralCenter: string
  heteroatomRatio: string
  rdkitRotatableBoundNum: string
  keenRotatableBoundNum: string
  rigidBodyNum: string
  HBD: string
  HBA: string
  TPSA: string
  lipinskiViolation: string
  QED: string
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
