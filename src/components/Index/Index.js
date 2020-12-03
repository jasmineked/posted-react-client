import React from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
import { indexUploads } from '../../api/upload'
import { withRouter } from 'react-router'
import Button from 'react-bootstrap/Button'

class IndexUpload extends React.Component {
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

  // onDeleteUpload = (event) => {
  //   event.preventDefault()
  //   const { msgAlert, history, user } = this.props
  //
  //   const data = new FormData()
  //
  //   deleteUpload(data, user)
  // event.preventDefault()
  // axios({
  //   url: `${apiUrl}/events/${this.props.id}`,
  //   method: 'DELETE'
  // })

  // .then(res => {
  //   this.setState({ deleted: true })
  // })
  // .then(() => msgAlert({
  //   heading: 'Successfully Deleted',
  //   message: 'File Delete Success',
  //   variant: 'success'
  // }))
  // .then(() => history.push('/home'))
  // axios.delete(apiUrl + '/uploads/' + this.props.match.params.id)
  // .then(res => {
  //   this.setState({ deleted: true })
  // })
  //     .catch(console.error)
  // }

  render () {
    const { history } = this.props
    let jsx
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
      console.log('this.state.uploads: ', this.state.uploads)
    } else if (this.state.uploads.length === 0) {
      jsx = <p>No uploads, please add one.</p>
    } else {
      // jsx = (
      //   <ul>
      //     {this.state.uploads.map(upload => {
      //       return <li key={upload._id}>{upload.name} {upload.tag}
      //         {upload.upload}
      //         <Link to={'/uploadsindex/' + upload._id}>{upload.name} {upload.tag} {upload.upload}</Link>
      //       </li>
      //     })}
      //   </ul>
      // )
      jsx = (
        <div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">File Name</th>
                <th scope="col">Owner</th>
                <th scope="col">Tag</th>
                <th scope="col">Date Posted</th>
                <th scope="col">Date Modified</th>
                <th scope="col">File url</th>
                <th scope="col">File Preview</th>
              </tr>
            </thead>
            <tbody>{this.state.uploads.map((upload, index) => {
              return (
                <tr key={upload._id} id="hov">
                  <th scope="row">{index + 1}</th>
                  <td onClick={() => history.push('/home/' + upload._id)}>{upload.name}</td>
                  <td onClick={() => history.push('/home/' + upload._id)}>{upload.owner}</td>
                  <td onClick={() => history.push('/home/' + upload._id)}>{upload.tag}</td>
                  <td onClick={() => history.push('/home/' + upload._id)}>{upload.createdAt}</td>
                  <td onClick={() => history.push('/home/' + upload._id)}>{upload.updatedAt}</td>
                  <td onClick={() => history.push('/home/' + upload._id)}><a href={upload.url} target="_blank" rel="noreferrer">{upload.url}</a></td>
                  <td>{(upload.url && (upload.url.includes('jpg') || upload.url.includes('png'))) ? <img src={upload.url} width={50} /> : ''}</td>
                </tr>
              )
            })
            }
            </tbody>
          </table>
        </div>
      )
    }
    return (
      <div>
        <h2>Posted Files</h2>
        <Button onClick={() => history.push('/uploads')}>Post</Button>
        {jsx}
      </div>
    )
  }
}

export default withRouter(IndexUpload)
