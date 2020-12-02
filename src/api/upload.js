import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
export const createUpload = (data, user) => {
  // console.log(upload)
  return axios({
    method: 'POST',
    url: apiUrl + '/uploads',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: data
  })
}
// UPDATE
export const updateMetaData = (data, user) => {
  return axios({
    url: apiUrl + '/update',
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: data
  })
}

// DELETE
export const deleteUpload = (data, user) => {
  return axios({
    url: apiUrl + '/uploads',
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

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
