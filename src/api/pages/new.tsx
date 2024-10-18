import axios from 'axios'
import { AppConfig } from 'pages/new/types/appConfig'

export const createProject = (
  workingDirectory: string,
  projectName: string
) => {
  return axios({
    method: 'post',
    url: '/secse/create_project',
    data: {
      workingDirectory: workingDirectory,
      projectName: projectName
    }
  })
}

export const getConfig = (directory: string) => {
  return axios({
    method: 'get',
    url: '/secse/get_config',
    params: {
      directory: directory
    }
  })
}

export const saveConfig = (directory: string, appConfig: AppConfig) => {
  return axios({
    method: 'post',
    url: '/secse/save_config',
    data: {
      directory: directory,
      config: appConfig
    }
  })
}

export const getDefaultDirectory = () => {
  return axios({
    method: 'get',
    url: '/secse/get_default_directory'
  })
}

export const updateSmiles = (
  smilesFilePath: string,
  id: string,
  smiles: string
) => {
  return axios({
    method: 'post',
    url: '/secse/update_smiles',
    data: {
      smiles_file_path: smilesFilePath,
      id: id,
      smiles: smiles
    }
  })
}

export const deleteSmiles = (smilesFilePath: string, id: string) => {
  return axios({
    method: 'delete',
    url: '/secse/delete_smiles',
    params: {
      smiles_file_path: smilesFilePath,
      id: id
    }
  })
}
