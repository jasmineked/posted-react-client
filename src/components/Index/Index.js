// import React, { useState, useEffect } from 'react'
// // import { Link } from 'react-router-dom'
// import axios from 'axios'
//
// import apiUrl from '../../apiConfig'
// import { indexUploads } from '../../api/upload'
// // import messages from '../AutoDismissAlert/messages'
//
// const Uploads = props => {
//   const [indexUploads, setUploads] = useState([])
//
//   useEffect(() => {
//     axios(`${apiUrl}/uploads`)
//       .then(res => setUploads(res.data.uploads))
//       .catch(console.error)
//   }, [])
//
//   // // const uploadsJsx = uploads.map(upload => (
//   //   // <li key={upload}>
//   //
//   // ))
//
//   return (
//     <div>
//       <h2>Uploads</h2>
//     </div>
//   )
// }
//
// export default withRouter(Uploads)
import React from 'react'
import { Link } from 'react-router-dom'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
import { indexUploads } from '../../api/upload'

class UploadIndex extends React.Component {
  constructor (props) {
    super(props)
    console.log('props: ', props)
    console.log('user: ', props.user)

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
          uploads: response.data.uploads
        })
      })
      .catch(console.error)
  }
  render () {
    let jsx
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
    } else if (this.state.uploads.length === 0) {
      jsx = <p>No uploads, please add one.</p>
    } else {
      jsx = (
        <ul>
          {this.state.uploads.map(upload => {
            return <li key={upload._id}><Link to={`/uploads/${upload._id}`}>{upload.name}</Link></li>
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
