import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { createUpload } from '../../api/upload'

class CreateUpload extends Component {
  constructor () {
    super()

    this.state = {
      form: {
        upload: '',
        name: '',
        tag: ''
      }
    }
  }
  handleInputChange = (event) => {
    event.persist()

    this.setState(prevState => {
      let updatedField
      if (event.target.name === 'upload') {
        updatedField = {
          [event.target.name]: event.target.files[0]
        }
      } else {
        updatedField = {
          [event.target.name]: event.target.value
        }
      }
      const updatedData = Object.assign({}, prevState.form, updatedField)
      return { form: updatedData }
    })
  }
  onCreateUpload = (event) => {
    event.preventDefault()
    const data = new FormData()
    data.append('name', this.state.form.name)
    data.append('tag', this.state.form.tag)
    data.append('upload', this.state.form.upload)
    const { msgAlert, history, user } = this.props

    createUpload(data, user)
      // .then(res => setUploaded(res.data.setUpload))
      .then(() => msgAlert({
        heading: 'Successfully Posted',
        message: 'Create Upload Success',
        variant: 'success'
      }))
      .then(() => history.push('/'))
      // .then(res => {
      //   this.setState({ createdId: res.data.upload._id })
      // })
      .catch(error => {
        this.setState({ name: '', tag: '' })
        msgAlert({
          heading: 'Create Failed with error: ' + error.message,
          message: 'Create failed',
          variant: 'danger'
        })
      })
  }
  // axios({
  //   url: `${apiUrl}/uploads`,
  //   method: 'POST',
  //   data: { upload: this.state.upload }
  // })
  //   .then(res => {
  //     this.setState({ createdId: res.data.upload._id })
  //   })
  //   .catch(console.error)

  render () {
    if (this.state.createdID) {
      return <Redirect to={`/uploads/${this.state.createdID}`}/>
    }
    return (
      <div>
        <h1>Create File</h1>
        <form onSubmit={this.onCreateUpload}>
          <label> File Name </label>
          <input
            placeholder="File Name"
            value={this.state.form.name}
            name="name"
            onChange={this.handleInputChange}
          />
          <input
            placeholder="File Tag"
            value={this.state.form.tag}
            name="tag"
            onChange={this.handleInputChange}
          />
          <Form.File id="upload-file-input" label="Upload File Here" name="upload" onChange={this.handleInputChange}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default withRouter(CreateUpload)
