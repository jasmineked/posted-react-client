
import React from 'react'
import { Link } from 'react-router-dom'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
import { indexUploads } from '../../api/upload'

class UploadIndex extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      uploads: [],
      isLoaded: false
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
            console.log('uploads: ', this.state.uploads)
            return <li key={upload._id}><Link to={`/uploadindex/${upload._id}`}>{upload.name} {upload.tag}</Link></li>
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
