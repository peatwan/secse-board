import { AppConfig } from './appConfig'

type DefaultConfigPaths = keyof AppConfig['defaultConfig']
type DockingConfigPaths = keyof AppConfig['docking']
type PredictionConfigPaths = keyof AppConfig['prediction']
type MolecularPropertiesConfigPaths = keyof AppConfig['molecularProperties']

// Combine all paths with their respective parent keys
export type AppConfigPaths =
  | `defaultConfig.${DefaultConfigPaths}`
  | `docking.${DockingConfigPaths}`
  | `prediction.${PredictionConfigPaths}`
  | `molecularProperties.${MolecularPropertiesConfigPaths}`
