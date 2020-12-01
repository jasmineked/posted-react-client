import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

// import { create } from '../../api/upload'
// import messages from '../AutoDismissAlert/messages'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
// import { createUpload } from '../../api/upload'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// const CreateUpload = props => {
//   const [upload, setUpload] = useState({ name: '', tag: '' })
//   const [createdUploadId, setCreatedUploadId] = useState(null)
//
//   const handleChange = event => {
//     event.persist()
//     setUpload(prevUpload => {
//       const updatedField = { [event.target.name]: event.target.value }
//       const editedUpload = Object.asssign({}, prevUpload, updatedField)
//       return editedUpload
//     })
//   }
//
//   const handleSubmit = event => {
//     event.preventDefault()
//     axios({
//       url: `${apiUrl}/uploads`,
//       method: 'POST',
//       data: { upload }
//     })
//       .then(res => setCreatedUploadId(res.data.upload._id))
//       .catch(console.error)
//   }
//   if (createdUploadId) {
//     return <Redirect to={`/uploads/${createdUploadId}`}/>
//   }
//   return (
//     <div>
//       <h1>Create File</h1>
//       <Form onSubmit={handleSubmit}>
//         <label> File Name </label>
//         <input
//           placeholder="File Name"
//           value={upload.name}
//           name="Name"
//           onChange={handleChange}
//         />
//         <input
//           placeholder="File Tag"
//           value={upload.tag}
//           name="Tag"
//           onChange={handleChange}
//         />
//         <Button type="submit">Submit</Button>
//       </Form>
//     </div>
//   )
// }
import { createUpload } from '../../api/upload'

class CreateUpload extends Component {
  constructor (props) {
    super(props)
    this.state = {
      upload: {
        name: '',
        tag: '',
        upload: ''
      },
      createdId: null
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
      const updatedData = Object.assign({}, prevState.upload, updatedField)
      return { upload: updatedData }
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    console.log('this.props.user: ', this.props.user)
    console.log(this.state)
    // axios({
    //   url: `${apiUrl}/uploads`,
    //   method: 'POST',
    //   data: { upload: this.state.upload }
    // })
    createUpload(this.props.user)
      .then(res => {
        this.setState({ createdId: res.data.upload._id })
      })
      .catch(console.error)
  }
  render () {
    if (this.state.createdID) {
      return <Redirect to={`/uploads/${this.state.createdID}`}/>
    }
    return (
      <div>
        <h1>Create File</h1>
        <Form onSubmit={this.handleSubmit}>
          <label> File Name </label>
          <input
            placeholder="File Name"
            value={this.state.upload.name}
            name="name"
            onChange={this.handleInputChange}
          />
          <input
            placeholder="File Tag"
            value={this.state.upload.tag}
            name="tag"
            onChange={this.handleInputChange}
          />
          <Form.File id="upload-file-input" label="Upload File Here" name="upload" onChange={this.handleInputChange} />
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    )
  }
}

export default withRouter(CreateUpload)
