import React from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
import { indexUploads, deleteUpload } from '../../api/upload'

class UploadIndex extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      uploads: [],
      isLoaded: false,
      deleted: false
    }
  }
  componentDidMount () {
    // axios.get(apiUrl + '/uploads')
    indexUploads(this.props.user)
      .then(response => {
        console.log('response: ', response)
        this.setState({
          isLoaded: true,
          uploads: response.data.files
        })
      })
      .catch(console.error)
  }

  onDeleteUpload = (event) => {
    event.preventDefault()
    const { msgAlert, history, user } = this.props
    const data = new FormData()

    deleteUpload(data, user)
      .then(res => {
        this.setState({ deleted: true })
      })
      .then(() => msgAlert({
        heading: 'Successfully Deleted',
        message: 'File Delete Success',
        variant: 'success'
      }))
      .then(() => history.push('/'))
    // axios.delete(apiUrl + '/uploads/' + this.props.match.params.id)
      .then(res => {
        this.setState({ deleted: true })
      })
    //   .catch(console.error)
  }

  render () {
    let jsx
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
      console.log('this.state.uploads: ', this.state.uploads)
    } else if (this.state.uploads.length === 0) {
      jsx = <p>No uploads, please add one.</p>
    } else {
      jsx = (
        <ul>
          {this.state.uploads.map(upload => {
            return <li key={upload._id}>{upload.name} {upload.tag}
              {upload.upload} <button onClick={this.onDeleteUpload}>Delete File</button>
            </li>
          })}
        </ul>
      )
    }
    return (
      <div>
        <h2>Uploads</h2>
        {jsx}
      </div>
    )
  }
}

export default UploadIndex
