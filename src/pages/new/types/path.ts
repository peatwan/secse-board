import { AppConfig } from './appConfig'

type GeneralPaths = keyof AppConfig['general']
type DockingPaths = keyof AppConfig['docking']
type PredictionPaths = keyof AppConfig['prediction']
type PropertiesPaths = keyof AppConfig['properties']

// Combine all paths with their respective parent keys
export type AppConfigPaths =
  | `general.${GeneralPaths}`
  | `docking.${DockingPaths}`
  | `prediction.${PredictionPaths}`
  | `properties.${PropertiesPaths}`
