import React, { useState, useEffect } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { showProfile, updateProfile } from '../../api/profile'

const UpdateProfile = (props) => {
  const [profile, setProfile] = useState({ username: '' })
  const [updated, setUpdated] = useState(false)
  const { user, msgAlert, match } = props

  useEffect(() => {
    // show request
    showProfile(user, match.params.id)
      .then(res => setProfile(res.data.profile))
      .then(() => msgAlert({
        heading: 'Profile Show Success',
        message: 'Check it out',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Profile Show failed',
        message: 'Error: ' + err.message,
        variant: 'danger'
      }))
  }, [])

  const handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }
    setProfile(prevProfile => {
      const updatedProfile = { ...prevProfile, ...updatedField }
      return updatedProfile
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    updateProfile(user, profile, match.params.id)
      .then(() => setUpdated(true))
      // Instead of state + Redirect pairing, you can also use `history`
      // as long as the component is exported `withRouter` or is passed the
      // `history` prop explicitely (see the `App.js` file)
      // This object can be destructured from the `props` as well.
      // The `MovieShow` component uses this pattern for delete
      // .then(() => props.history.push('/profile-show/' + match.params.profileId))
      .then(() => msgAlert({
        heading: profile.username + ' successful',
        message: 'Nice work',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Update failed',
        message: 'WhOOPs ' + err.message,
        variant: 'danger'
      }))
  }

  if (updated) {
    return (
      <Redirect to={`/profiles/${match.params.id}`} />
    )
  }

  return (
    <React.Fragment>
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username Here"
          value={profile.username}
          onChange={handleChange}
          name="username"
        />
        <button type="submit">Update Profile</button>
      </form>
    </React.Fragment>
  )
}

export default withRouter(UpdateProfile)
