import axios from 'axios'
import {
  GenerationDetails,
  MoleculeNumber,
  ProjectStatus,
  Scores
} from 'api/types/monitor'

export const getProjectStatus = (path: string) => {
  return axios<ProjectStatus>({
    method: 'get',
    url: '/secse/get_project_status',
    params: {
      path: path
    }
  })
}

export const startProject = (path: string) => {
  return axios({
    method: 'post',
    url: '/secse/start',
    data: {
      path: path
    }
  })
}

export const stopProject = (path: string) => {
  return axios({
    method: 'post',
    url: '/secse/stop',
    data: {
      path: path
    }
  })
}

export const pauseProject = (path: string) => {
  return axios({
    method: 'post',
    url: '/secse/pause',
    data: {
      path: path
    }
  })
}

export const resumeProject = (path: string) => {
  return axios({
    method: 'post',
    url: '/secse/resume',
    data: {
      path: path
    }
  })
}

export const getScores = (path: string) => {
  return axios<Scores>({
    method: 'get',
    url: '/secse/get_scores',
    params: {
      path: path
    }
  })
}

export const getSeedsNumber = (path: string) => {
  return axios<number[]>({
    method: 'get',
    url: '/secse/get_seeds_number',
    params: {
      path: path
    }
  })
}
export const getMoleculeNumber = (path: string) => {
  return axios<MoleculeNumber>({
    method: 'get',
    url: '/secse/get_molecule_number',
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
  return axios<GenerationDetails[]>({
    method: 'get',
    url: '/secse/get_generation_details',
    params: {
      path: path,
      generation: generation,
      file_type: fileType
    }
  })
}

export const getTargetFile = (path: string) => {
  return axios({
    method: 'get',
    url: '/secse/get_target_file',
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
  return axios({
    method: 'get',
    url: '/secse/get_generation_result_file',
    params: {
      path: path,
      generation: generation,
      id: id
    }
  })
}
