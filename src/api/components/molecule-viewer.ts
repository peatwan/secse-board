import { request } from 'utils/service'
import { Smiles } from './types/molecule-viewer'

export const getSmilesFromFile = (smilesFilePath: string) => {
  return request<Smiles[]>({
    method: 'get',
    url: '/get_smiles_from_file',
    params: {
      smiles_file_path: smilesFilePath
    }
  })
}
