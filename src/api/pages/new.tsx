import axios from 'axios'
import { AppConfig } from 'pages/new/types/appConfig'

export const createProject = (
  workingDirectory: string,
  fragmentsFile: string,
  targetFile: string,
  projectName: string
) => {
  return axios({
    method: 'post',
    url: '/secse/create_project',
    data: {
      workingDirectory: workingDirectory,
      fragmentsFile: fragmentsFile,
      targetFile: targetFile,
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
