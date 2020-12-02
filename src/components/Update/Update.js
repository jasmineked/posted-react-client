import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { updateMetaData } from '../../api/upload'

class UpdateMeta extends Component {
  constructor (props) {
    super(props)

    this.state = {
      upload: {
        upload: '',
        name: '',
        tag: '',
        createdAt: '',
        updatedAt: ''
      },
      updated: false
    }
  }

  componentDidMount () {
    updateMetaData(this.props.user)
      .then(res => this.setState({ upload: res.data.upload }))
      .catch(console.error)
  }

  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedFile = Object.assign(this.state.upload, updatedField)

    this.setState({ upload: editedFile })
  }

  handleSubmit = event => {
    event.preventDefault()

    updateMetaData(this.props.user)
      .then(() => this.setState({ updated: true }))
      .catch(console.error)
  }

  render () {
    const { upload, updated } = this.state
    const { handleChange, handleSubmit } = this

    if (updated) {
      return <Redirect to={`/update/${this.props.match.params.id}`} />
    }

    return (
      <div>
        <h1>update a file</h1>
        <form onSubmit={handleSubmit}>
          upload={upload}
          handleChange={handleChange}
        </form>
      </div>
    )
  }
}

export default UpdateMeta
