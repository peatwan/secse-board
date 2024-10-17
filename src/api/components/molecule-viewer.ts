import axios from 'axios'

export const getSmilesFromFile = (smilesFilePath: string) => {
  return axios({
    method: 'get',
    url: '/secse/get_smiles_from_file',
    params: {
      smiles_file_path: smilesFilePath
    }
  })
}
