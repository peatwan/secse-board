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
      workdir: workingDirectory,
      fragments: fragmentsFile,
      target: targetFile,
      project_code: projectName
    }
  })
}
