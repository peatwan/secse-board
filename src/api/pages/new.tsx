import axios from 'axios'

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
