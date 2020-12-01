import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
export const createUpload = (upload, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/uploads',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      upload: {
        name: upload.name,
        tag: upload.tag
      }
    }
  })
}
// UPDATE

// DELETE

// INDEX

export const indexUploads = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/uploads',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}
