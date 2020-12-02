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
export const deleteUpload = (data, user) => {
  console.log(data)
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

// SHOW
// export const showUpload = (data, user) => {
//   return axios({
//     method: 'GET',
//     url: apiUrl + '/uploads/' + data.upload._id,
//     headers: {
//       'Authorization': `Token token=${user.token}`
//     }
//   })
// }
