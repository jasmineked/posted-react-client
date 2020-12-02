// import React from 'react'

import { deleteUpload } from '../../api/upload'
import App from '../../../App'

// class DeleteUpload extends React.Component {
//   constructor (props) {
//     super(props)
//
//     this.state = {
//       deleted: false
//     }
//   }

function onDeleteUpload () {
  event.preventDefault()
  // const { msgAlert, history} = this.props
  // const data =

  deleteUpload()
    .then(response => {
      this.setState({
        deleted: true
      })
    })
    // .then(() => msgAlert({
    //   heading: 'Successfully Deleted',
    //   message: 'File Delete Success',
    //   variant: 'success'
    // }))
    // .then(() => history.push('/'))
    .catch(console.error)
}

export default onDeleteUpload
