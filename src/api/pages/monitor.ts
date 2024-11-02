import {
  GenerationDetails,
  MoleculeNumber,
  ProjectStatus,
  Scores
} from 'api/pages/types/monitor'
import { request } from 'utils/service'

export const getProjectStatus = (path: string) => {
  return request<ProjectStatus>({
    method: 'get',
    url: '/get_project_status',
    params: {
      path: path
    }
  })
}

export const startProject = (path: string) => {
  return request<ApiResponseMessage>({
    method: 'post',
    url: '/start',
    data: {
      path: path
    }
  })
}

export const stopProject = (path: string) => {
  return request<ApiResponseMessage>({
    method: 'post',
    url: '/stop',
    data: {
      path: path
    }
  })
}

export const pauseProject = (path: string) => {
  return request<ApiResponseMessage>({
    method: 'post',
    url: '/pause',
    data: {
      path: path
    }
  })
}

export const resumeProject = (path: string) => {
  return request<ApiResponseMessage>({
    method: 'post',
    url: '/resume',
    data: {
      path: path
    }
  })
}

export const getScores = (path: string) => {
  return request<Scores>({
    method: 'get',
    url: '/get_scores',
    params: {
      path: path
    }
  })
}

export const getSeedsNumber = (path: string) => {
  return request<number[]>({
    method: 'get',
    url: '/get_seeds_number',
    params: {
      path: path
    }
  })
}
export const getMoleculeNumber = (path: string) => {
  return request<MoleculeNumber>({
    method: 'get',
    url: '/get_molecule_number',
    params: {
      path: path
    }
  })
}

export const getGenerationDetails = (
  path: string,
  generation: string,
  fileType: string
) => {
  return request<GenerationDetails[]>({
    method: 'get',
    url: '/get_generation_details',
    params: {
      path: path,
      generation: generation,
      file_type: fileType
    }
  })
}

export const getTargetFile = (path: string) => {
  return request({
    method: 'get',
    url: '/get_target_file',
    params: {
      path: path
    }
  })
}

export const getGenerationResultFile = (
  path: string,
  generation: string,
  id: string
) => {
  return request({
    method: 'get',
    url: '/get_generation_result_file',
    params: {
      path: path,
      generation: generation,
      id: id
    }
  })
}
