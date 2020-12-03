import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
import { updateUpload } from '../../api/upload'

class UpdateUpload extends Component {
  constructor (props) {
    super(props)

    // this.deleteUpload = this.deleteUpload.bind(this)
    this.state = {
      upload: null,
      delete: false
    }
  }

  componentDidMount () {
    updateUpload(this.props.user)
      .then(res => {
        this.setState({ upload: res.data.file })
      })
      .catch(console.error)
  }

  onUpdateUpload = (event) => {
    event.preventDefault()
    // const { msgAlert, history, user } = this.props
    // const data = new FormData()

  // deleteUpload()
  //   .then(res => {
  //     this.setState({ deleted: true })
  //   })
  //   .then(() => msgAlert({
  //     heading: 'Successfully Deleted',
  //     message: 'File Delete Success',
  //     variant: 'success'
  //   }))
  //   .then(() => history.push('/'))
  // axios.delete(apiUrl + '/uploads/' + this.props.match.params.id)
  // .then(res => {
  //   this.setState({ deleted: true })
  // })
  //   .catch(console.error)
  // }
  }
  render () {
    return (
      <div>
        {this.state.deleted && (
          <Redirect to="/home" />
        )}
        <h1>Update Upload Page</h1>
        {this.state.upload && (
          <div>
            <h2>file name {this.state.upload.name}</h2>
            <p>file tag {this.state.upload.tag}</p>
            <button onClick={this.onDeleteUpload}>Delete File</button>
          </div>
        )}
      </div>
    )
  }
}

export default UpdateUpload
