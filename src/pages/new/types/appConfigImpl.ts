import {
  AppConfig,
  General,
  Docking,
  Properties,
  Prediction,
  PredictionMode
} from './appConfig'

export class AppConfigImpl implements AppConfig {
  general: General
  docking: Docking
  prediction: Prediction
  properties: Properties

  constructor(config?: Partial<AppConfig>) {
    this.general = {
      projectCode: config?.general?.projectCode || '',
      workdir: config?.general?.workdir || '',
      fragments: config?.general?.fragments || '',
      numGen: config?.general?.numGen || '',
      numPerGen: config?.general?.numPerGen || '',
      seedPerGen: config?.general?.seedPerGen || '',
      startGen: config?.general?.startGen || '',
      cpu: config?.general?.cpu || '',
      gpu: config?.general?.gpu || '',
      ruleDb: config?.general?.ruleDb || ''
    }

    this.docking = {
      dockingProgram: config?.docking?.dockingProgram || 'vina',
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

    this.properties = {
      mw: config?.properties?.mw || '',
      logpLower: config?.properties?.logpLower || '',
      logpUpper: config?.properties?.logpUpper || '',
      chiralCenter: config?.properties?.chiralCenter || '',
      heteroatomRatio: config?.properties?.heteroatomRatio || '',
      rdkitRotatableBoundNum: config?.properties?.rdkitRotatableBoundNum || '',
      keenRotatableBoundNum: config?.properties?.keenRotatableBoundNum || '',
      rigidBodyNum: config?.properties?.rigidBodyNum || '',
      hbd: config?.properties?.hbd || '',
      hba: config?.properties?.hba || '',
      tpsa: config?.properties?.tpsa || '',
      lipinskiViolation: config?.properties?.lipinskiViolation || '',
      qed: config?.properties?.qed || '',
      maxRingSize: config?.properties?.maxRingSize || '',
      maxRingSystemSize: config?.properties?.maxRingSystemSize || '',
      ringSystemCount: config?.properties?.ringSystemCount || '',
      bridgedSiteCount: config?.properties?.bridgedSiteCount || '',
      spiroSiteCount: config?.properties?.spiroSiteCount || '',
      fusedSiteCount: config?.properties?.fusedSiteCount || '',
      rdkitSaScore: config?.properties?.rdkitSaScore || '',
      substructureFilter: config?.properties?.substructureFilter || ''
    }
  }
}
