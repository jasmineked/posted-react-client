import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { indexProfile } from '../../api/profile'

class IndexProfile extends Component {
  constructor () {
    super()
    this.state = {
      profileArray: []
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
    if (!this.state.profileArray) {
      return (
        'why cant i console.log ' + this.state.profile
      )
    } else if (this.state.profileArray.length === 0) {
      return (
        ':|'
      )
    } else {
      return (
        <div>
          {this.state.profileArray.map(profile => (
            <Fragment key={profile._id}>
              <h2>{profile.username}</h2>
              <p></p>
              <Link to={`/profiles/${profile._id}`}>See More</Link>
            </Fragment>
          ))}
        </div>
      )
    }
  }
}

export default withRouter(IndexProfile)
