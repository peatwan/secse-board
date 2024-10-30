import axios from 'axios'
import { ProjectStatus, Scores } from 'types/ProjectStatus'

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
