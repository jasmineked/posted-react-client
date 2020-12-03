import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'

// import axios from 'axios'
// import apiUrl from '../../apiConfig'
import { showUpload, deleteUpload } from '../../api/upload'
import Button from 'react-bootstrap/Button'

class ShowUpload extends Component {
  constructor (props) {
    super(props)

    // this.deleteUpload = this.deleteUpload.bind(this)
    this.state = {
      upload: null,
      deleted: false
    }
  }

  componentDidMount () {
    showUpload(this.props.user)
      .then(res => {
        this.setState({ upload: res.data.file })
      })
      .catch(console.error)
  }

  onDeleteUpload = (event) => {
    // event.preventDefault()
    const { msgAlert, history, user } = this.props
    // const data = new FormData()

    deleteUpload(user)
      .then(console.log)
      .then(res => {
        this.setState({ deleted: true })
      })
      .then(() => msgAlert({
        heading: 'Successfully Deleted',
        message: 'File Delete Success',
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(console.error)
  }
  //
  // .then(() => msgAlert({
  //   heading: 'Successfully Deleted',
  //   message: 'File Delete Success',
  //   variant: 'success'
  // }))
  // .then(() => history.push('/home'))
  //
  // .then(res => {
  //   this.setState({ deleted: true })
  // })
  // .catch(console.error)

  render () {
    return (
      <div>
        {this.state.deleted && (
          <Redirect to="/home" />
        )}
        <h1>Update/Delete Page</h1>

        <Button onClick={this.onDeleteUpload}>Delete</Button>
        {this.state.upload && (
          <div>
            <h2>file name {this.state.upload.name}</h2>
            <p>file tag {this.state.upload.tag}</p>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(ShowUpload)
