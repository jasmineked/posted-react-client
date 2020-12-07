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

  // componentDidMount () {
  //   showUpload(this.props.user, this.props.match.params.id)
  //     .then(response => {
  //       this.setState(prevState => {
  //         console.log('what is response.data is', response.data)
  //         // changed response.data.file => response.data.upload
  //         const updatedData = Object.assign({}, prevState.form, response.data.file)
  //         return { form: updatedData }
  //       })
  //     })
  //     .catch(console.error)
  // }
  componentDidMount () {
    showUpload(this.props.user, this.props.match.params.id)
      .then(response => {
        this.setState({ form: response.data.file })
      })
      .catch(console.error)
  }

  handleInputChange = (event, props) => {
    event.persist()
    console.log('event.target.value/name', event.target.name, event.target.value)
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

    console.log('this is id', _id)
    deleteUpload(user, _id)
      .then(console.log)
      .then(res => {
        this.setState({ deleted: true })
      })
      .then(() => msgAlert({
        heading: 'Successfully Deleted',
        message: 'File Delete Success',
        variant: 'success'
      }))
      .then(() => history.push('/home'))
      .catch(error => {
        msgAlert({
          heading: 'Delete Failed with error: ' + error.message,
          message: 'Delete failed',
          variant: 'danger'
        })
      })
  }

  onUpdateUpload = (event) => {
    event.preventDefault()
    // Create and empty formdata object
    const data = new FormData()
    // taking the data from the component state
    // and append it to the data formdata object
    console.log('state.form', this.state.form)
    data.append('name', this.state.form.name)
    data.append('tag', this.state.form.tag)

    const { msgAlert, history, user } = this.props
    const { _id } = this.state.form
    console.log('this is id', _id)

    updateUpload(data, user, _id)
      .then((response) => {
        console.log('this is response', response)
        return msgAlert({
          heading: 'Successfully Updated',
          message: 'Updated File:' + ' ' + response.data.form.name,
          variant: 'success'
        })
      })
      .then(() => history.push('/home'))
      .then(response => {
        this.setState({ updated: true })
      })
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
    // if (this.state.updated) {
    //   return <Redirect to={`/uploads/${this.props.match.params.id}`}/>
    // }
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
        <Form onSubmit={this.onUpdateUpload}>
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
          <Button type="submit">Submit</Button>
        </Form>
        <Button onClick={this.onDeleteUpload}>Delete</Button>
      </div>
    )
  }
}

export default withRouter(ShowUpload)
