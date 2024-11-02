import { request } from 'utils/service'
import { Directory } from './types/choose-modal'

export const getDirectoryItems = (directory: string) => {
  return request<Directory[]>({
    method: 'get',
    url: '/list_directory',
    params: {
      directory: directory
    }
  })
}

export const createFolder = (directory: string, folderName: string) => {
  return request<ApiResponseMessage>({
    method: 'post',
    url: '/create_folder',
    data: {
      directory: directory,
      folder_name: folderName
    }
  })
}
