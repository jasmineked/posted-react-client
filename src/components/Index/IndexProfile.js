import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import { indexProfile } from '../../api/profile'

class IndexProfile extends Component {
  constructor () {
    super()
    this.state = {
      profileArray: null
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props

    indexProfile(user)
      .then(res => {
        console.log(res)
        this.setState({ profileArray: res.data.profiles })
      })
      .then(() => {
        msgAlert({
          heading: ' Index Success!',
          message: 'lol jk!',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Movie Index Failed',
          message: 'Failed with error: ' + err.message,
          variant: 'danger'
        })
      })
  }

  render () {
    if (!this.state.profiles) {
      return (
        'Loading...'
      )
    } else if (this.state.profiles.length === 0) {
      return (
        'No movies to display :('
      )
    } else {
      return (
        <div>
          {this.state.profile.map(profile => (
            <Fragment key={profile._id}>
              <h2>{profile.username}</h2>
              <p></p>
              <Link to={`/profile-show/${profile._id}`}>See More</Link>
            </Fragment>
          ))}
        </div>
      )
    }
  }
}

export default IndexProfile
