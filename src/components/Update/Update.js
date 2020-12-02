import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'

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
      }
    }
  }

  componentDidMount () {
    updateMetaData(this.props.user)
      .then(res => this.setState({ upload: res.data.upload }))
      .catch(console.error)
  }

  handleChange = event => {

  }

  handleSubmit = event => {

  }

  render () {
    return (
      <h1>update a file</h1>
    )
  }
}

export default UpdateMeta
