import apiUrl from '../apiConfig'
import axios from 'axios'
//
// CREATE
export const createProfile = (user, data) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/profiles/',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { profile: data }
  })
}
// UPDATE
export const updateProfile = (user, profile) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/profiles/' + profile.id,
    headers: {
      Authorization: `Token token=${user.token}`
    },
    profile
  })
}
// DELETE
export const deleteProfile = (user, profileId) => {
  return axios({
    url: apiUrl + '/profiles/' + profileId,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

// INDEX
export const indexProfile = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/profiles',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

// SHOW
export const showProfile = (user, profileId) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/profiles/' + profileId,
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}
