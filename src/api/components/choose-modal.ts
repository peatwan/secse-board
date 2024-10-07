import axios from 'axios'

export const getDirectoryItems = (directory: string) => {
  return axios({
    method: 'get',
    url: '/secse/list_directory',
    params: {
      directory: directory
    }
  })
}

export const createFolder = (directory: string, folderName: string) => {
  return axios({
    method: 'post',
    url: '/secse/create_folder',
    data: {
      directory: directory,
      folder_name: folderName
    }
  })
}
