// import React, { Component } from 'react'
// import { withRouter, Redirect } from 'react-router-dom'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
// import { deleteUpload } from '../../api/upload'
//
// class ShowUpload extends Component {
//   constructor (props) {
//     super(props)
//
//     this.deleteUpload = this.deleteUpload.bind(this)
//     this.state = {
//       uploads: [],
//       deleted: false
//     }
//   }
//
//   componentDidMount () {
//     axios(apiUrl + '/uploads/' + this.props.match.params.id)
//       .then(res => {
//         this.setState({ upload: res.data.file })
//       })
//       .catch(console.error)
//   }
//
//   onDeleteUpload = (event) => {
//     event.preventDefault()
//     const { msgAlert, history, user } = this.props
//     const data = new FormData()
//
//     deleteUpload(data, user)
//       .then(res => {
//         this.setState({ deleted: true })
//       })
//       .then(() => msgAlert({
//         heading: 'Successfully Deleted',
//         message: 'File Delete Success',
//         variant: 'success'
//       }))
//       .then(() => history.push('/'))
//     // axios.delete(apiUrl + '/uploads/' + this.props.match.params.id)
//       .then(res => {
//         this.setState({ deleted: true })
//       })
//     //   .catch(console.error)
//   }
//
//   render () {
//     return (
//       <div>
//         {this.state.deleted && (
//           <Redirect to="/uploads/"/>
//         )}
//         <h1> Show Upload Page </h1>
//         {this.state.upload && (
//           <div>
//             <h2>{this.state.upload.name}</h2>
//             <p>{this.state.upload.tag}</p>
//             <button onClick={this.onDeleteUpload}>Delete File</button>
//           </div>
//         )}
//       </div>
//     )
//   }
// }
//
// export default withRouter(ShowUpload)
