import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

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
}
export default UpdateMeta
