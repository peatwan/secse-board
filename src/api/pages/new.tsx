import { AppConfig } from 'pages/new/types/appConfig'
import { request } from 'utils/service'
import { CreateProjectData } from './types/new'

export const createProject = (
  workingDirectory: string,
  projectName: string
) => {
  return request<CreateProjectData>({
    method: 'post',
    url: '/create_project',
    data: {
      workingDirectory: workingDirectory,
      projectName: projectName
    }
  })
}

export const getConfig = (directory: string) => {
  return request<AppConfig>({
    method: 'get',
    url: '/get_config',
    params: {
      directory: directory
    }
  })
}

export const saveConfig = (directory: string, appConfig: AppConfig) => {
  return request<ApiResponseMessage>({
    method: 'post',
    url: '/save_config',
    data: {
      directory: directory,
      config: appConfig
    }
  })
}

export const getDefaultDirectory = () => {
  return request<string>({
    method: 'get',
    url: '/get_default_directory'
  })
}

export const updateSmiles = (
  smilesFilePath: string,
  id: string,
  smiles: string
) => {
  return request<ApiResponseMessage>({
    method: 'post',
    url: '/update_smiles',
    data: {
      smiles_file_path: smilesFilePath,
      id: id,
      smiles: smiles
    }
  })
}

export const deleteSmiles = (smilesFilePath: string, id: string) => {
  return request<ApiResponseMessage>({
    method: 'delete',
    url: '/delete_smiles',
    params: {
      smiles_file_path: smilesFilePath,
      id: id
    }
  })
}
