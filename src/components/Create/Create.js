import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { createUpload } from '../../api/upload'
import Button from 'react-bootstrap/Button'

class CreateUpload extends Component {
  constructor (props) {
    super(props)
    this.state = {
      form: {
        upload: '',
        name: '',
        tag: ''
      }
    }
  }
  handleInputChange = (event, props) => {
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
    // Create and empty formdata object
    const data = new FormData()
    // taking the data from the component state
    // and append it to the data formdata object
    data.append('name', this.state.form.name)
    data.append('tag', this.state.form.tag)
    data.append('upload', this.state.form.upload)
    // getting user from the props
    const { msgAlert, history, user } = this.props

    // Pass user and data to createUpload
    createUpload(data, user)
      // .then(res => setUploaded(res.data.setUpload))
      .then((response) => {
        console.log('this is response', response)
        return msgAlert({
          heading: 'Successfully Posted',
          message: 'Uploaded File:' + ' ' + response.data.upload.name,
          variant: 'success'
        })
      })
      // "history" = where the user has been
      // history.push = Go to 'here'
      // .then(() => history.push('/'))
      .then(() => history.push('/home'))
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
        <Form onSubmit={this.onCreateUpload}>
          <label> File Name </label>
          <input className="form-control"
            placeholder="File Name"
            value={this.state.form.name}
            name="name"
            onChange={this.handleInputChange}
          />
          <label> File Tag </label>
          <input className="form-control"
            placeholder="File Tag"
            value={this.state.form.tag}
            name="tag"
            onChange={this.handleInputChange}
          />
          <br/>
          <Form.File id="upload-file-input" name="upload" onChange={this.handleInputChange}/>
          <br/>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    )
  }
}

export default withRouter(CreateUpload)
