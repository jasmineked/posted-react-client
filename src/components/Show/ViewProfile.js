import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { showProfile, deleteProfile } from '../../api/profile'

const ViewProfile = (props) => {
  // const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const { user, msgAlert, match, history } = props

  // useEffect for componentDidMount
  // Load the profile to show
  useEffect(() => {
    // runs just once on mount :)
    // const { id } = props.match.params

    showProfile(user, match.params.id)
      .then(res => {
        console.log(res)
        setProfile(res.data.profile)
      })
      .then(() => {
        msgAlert({
          heading: 'Show Profile Success',
          message: 'See the profile there!',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Show Profile Failed :(',
          message: 'Error code: ' + err.message,
          variant: 'danger'
        })
      })
  }, [])

  const handleDelete = () => {
    deleteProfile(user, match.params.id)
      .then(() => {
        msgAlert({
          heading: 'Profile Deleted',
          message: 'Back to the list of profiles that exist',
          variant: 'success'
        })
      })
      .then(() => history.push('/profiles'))
      .catch(err => {
        msgAlert({
          heading: 'Deletion Failed',
          message: 'Something went wrong: ' + err.message,
          variant: 'danger'
        })
      })
  }

  // If loading (profile is null), print 'Loading...'
  return (
    <div>
      {profile ? (
        <div>
          <h2>{profile.username}</h2>
          <button onClick={handleDelete}>Delete</button>
          <Link to={'/profiles/' + profile._id}>Update Profile</Link>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default withRouter(ViewProfile)
