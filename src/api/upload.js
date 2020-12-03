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

// DELETE
export const deleteUpload = (user) => {
  console.log('happening')
  return axios({
    url: apiUrl + '/uploads' + this.props.match.params.id,
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

// SHOW
export const updateUpload = user => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/uploads',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}
