import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE

// UPDATE

// DELETE

// INDEX
export const indexUploads = () => {
  return axios({
    method: 'GET',
    url: apiUrl + '/uploads'
  })
}
