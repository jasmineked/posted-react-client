import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'

// import axios from 'axios'
// import apiUrl from '../../apiConfig'
import { deleteUpload, showUpload, updateUpload } from '../../api/upload'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

// import Form from 'react-bootstrap/Form'

class ShowUpload extends Component {
  constructor (props) {
    super(props)

    // this.deleteUpload = this.deleteUpload.bind(this)
    this.state = {
      form: {
        name: '',
        tag: ''
      },
      deleted: false,
      updated: false
    }
  }

  componentDidMount () {
    showUpload(this.props.user, this.props.match.params.id)
      .then(response => {
        this.setState({ form: response.data.file })
      })
      .catch(console.error)
  }

  handleInputChange = (event, props) => {
    event.persist()
    // console.log('event.target.value/name', event.target.name, event.target.value)
    this.setState(prevState => {
      const updatedField = {
        [event.target.name]: event.target.value
      }

      const updatedData = Object.assign({}, prevState.form, updatedField)
      return { form: updatedData }
    })
  }

  onDeleteUpload = (event) => {
    // event.preventDefault()
    const { msgAlert, history, user } = this.props
    const { _id } = this.state.form

    // console.log('this is id', _id)
    deleteUpload(user, _id)
      .then(res => {
        this.setState({ deleted: true })
      })
      .then(() => msgAlert({
        heading: 'Successfully Deleted',
        message: 'File Delete Success',
        variant: 'success'
      }))
      .then(() => history.push('/home'))
      .catch(() => msgAlert({
        heading: 'Unable To Delete',
        message: 'You Do Not Own This File',
        variant: 'danger'
      }))
      .then(() => history.push('/home'))
  }

  onUpdateUpload = (event) => {
    event.preventDefault()
    // Create and empty formdata object
    const data = new FormData()
    // taking the data from the component state
    // and append it to the data formdata object
    // console.log('state.form', this.state.form)
    data.append('name', this.state.form.name)
    data.append('tag', this.state.form.tag)

    const { msgAlert, history, user } = this.props
    const { _id } = this.state.form

    updateUpload(this.state.form, user, _id)
      .then(() => msgAlert({
        heading: 'Successfully Updated',
        message: 'Updated',
        variant: 'success'
      }))
      .then(() => history.push('/home'))
      .then(response => {
        this.setState({ updated: true })
      })
      .catch(() => msgAlert({
        heading: 'Unable To Update',
        message: 'You Do Not Own This File',
        variant: 'danger'
      }))
      .then(() => history.push('/home'))
  }

  render () {
    return (
      <div>
        <h1>Update/Delete Page</h1>
        {this.state.form && (
          <div>
            <h2>File: {this.state.form.name}</h2>
            <h2>Tag: {this.state.form.tag}</h2>
          </div>
        )}
        <h1>Update File</h1>
        <Form>
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
          <Button onClick={this.onUpdateUpload}>Submit</Button>
        </Form>
        <br/>
        <Button onClick={this.onDeleteUpload}>Delete</Button>
      </div>
    )
  }
}

export default withRouter(ShowUpload)
