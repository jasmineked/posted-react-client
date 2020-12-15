import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { createProfile } from '../../api/profile'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// add redirect to home
class CreateProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: {
        username: ''
      },
      createdId: null
    }
  }
  handleChange = (event) => {
    event.persist()

    this.setState(prevState => {
      const updatedField = {
        [event.target.name]: event.target.value
      }
      this.setState(currState => {
        const updatedProfile = { ...currState.profile, ...updatedField }
        return { profile: updatedProfile }
      })
    })
  }
    handleSubmit = (event) => {
      event.preventDefault()

      const { user, msgAlert } = this.props

      createProfile(user, this.state.profile)
        .then((res) => {
          this.setState({ createdId: res.data.profile._id })
        })
        .then(() => {
          msgAlert({
            heading: 'Profile Created Successfully ' + this.state.profile.username,
            message: 'thsis it',
            variant: 'success'
          })
        })
        .catch((err) => {
          msgAlert({
            heading: 'Profile Creation Failed, try again!',
            message: 'Try again. Error: ' + err.message,
            variant: 'danger'
          })
        })
    }
    render () {
      if (this.state.createdId) {
        return <Redirect to='/home/'/>
      }
      return (
        <React.Fragment>
          <h2>Finish creating your profile</h2>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="get creative!"
              value={this.state.profile.username}
              onChange={this.handleChange}
              name="username"
            />
            <button type="submit">Submit</button>
          </form>
        </React.Fragment>
      )
    }
}

export default withRouter(CreateProfile)
