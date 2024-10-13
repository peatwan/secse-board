import {
  AppConfig,
  DefaultConfig,
  DockingConfig,
  MolecularPropertiesConfig,
  PredictionConfig,
  PredictionMode
} from './appConfig'

export class AppConfigImpl implements AppConfig {
  defaultConfig: DefaultConfig
  docking: DockingConfig
  prediction: PredictionConfig
  molecularProperties: MolecularPropertiesConfig

  // Default constructor
  constructor(config?: Partial<AppConfig>) {
    this.defaultConfig = {
      projectCode: config?.defaultConfig?.projectCode || '',
      workdir: config?.defaultConfig?.workdir || '',
      fragments: config?.defaultConfig?.fragments || '',
      numGen: config?.defaultConfig?.numGen || '',
      numPerGen: config?.defaultConfig?.numPerGen || '',
      seedPerGen: config?.defaultConfig?.seedPerGen || '',
      startGen: config?.defaultConfig?.startGen || '',
      dockingProgram: config?.defaultConfig?.dockingProgram || 'vina',
      cpu: config?.defaultConfig?.cpu || '',
      gpu: config?.defaultConfig?.gpu || '',
      ruleDb: config?.defaultConfig?.ruleDb || ''
    }

    this.docking = {
      target: config?.docking?.target || '',
      rmsd: config?.docking?.rmsd || '',
      deltaScore: config?.docking?.deltaScore || '',
      scoreCutoff: config?.docking?.scoreCutoff || '',
      x: config?.docking?.x || '',
      y: config?.docking?.y || '',
      z: config?.docking?.z || '',
      boxSizeX: config?.docking?.boxSizeX || '',
      boxSizeY: config?.docking?.boxSizeY || '',
      boxSizeZ: config?.docking?.boxSizeZ || ''
    }

    this.prediction = {
      mode: config?.prediction?.mode || PredictionMode.NOT_USE,
      dlPerGen: config?.prediction?.dlPerGen || '',
      dlScoreCutoff: config?.prediction?.dlScoreCutoff || ''
    }

    this.molecularProperties = {
      mw: config?.molecularProperties?.mw || '',
      logpLower: config?.molecularProperties?.logpLower || '',
      logpUpper: config?.molecularProperties?.logpUpper || '',
      chiralCenter: config?.molecularProperties?.chiralCenter || '',
      heteroatomRatio: config?.molecularProperties?.heteroatomRatio || '',
      rdkitRotatableBoundNum:
        config?.molecularProperties?.rdkitRotatableBoundNum || '',
      keenRotatableBoundNum:
        config?.molecularProperties?.keenRotatableBoundNum || '',
      rigidBodyNum: config?.molecularProperties?.rigidBodyNum || '',
      hbd: config?.molecularProperties?.hbd || '',
      hba: config?.molecularProperties?.hba || '',
      tpsa: config?.molecularProperties?.tpsa || '',
      lipinskiViolation: config?.molecularProperties?.lipinskiViolation || '',
      qed: config?.molecularProperties?.qed || '',
      maxRingSize: config?.molecularProperties?.maxRingSize || '',
      maxRingSystemSize: config?.molecularProperties?.maxRingSystemSize || '',
      ringSystemCount: config?.molecularProperties?.ringSystemCount || '',
      bridgedSiteCount: config?.molecularProperties?.bridgedSiteCount || '',
      spiroSiteCount: config?.molecularProperties?.spiroSiteCount || '',
      fusedSiteCount: config?.molecularProperties?.fusedSiteCount || '',
      rdkitSaScore: config?.molecularProperties?.rdkitSaScore || '',
      substructureFilter: config?.molecularProperties?.substructureFilter || ''
    }
  }

  // Method to update the default configuration
  updateDefaultConfig(newConfig: Partial<DefaultConfig>): void {
    this.defaultConfig = { ...this.defaultConfig, ...newConfig }
  }

  // Method to display the entire configuration
  displayConfig(): void {
    console.log(JSON.stringify(this, null, 2))
  }

  // Method to reset to default configuration
  resetToDefaultConfig(defaults: DefaultConfig): void {
    this.defaultConfig = defaults
  }
}
