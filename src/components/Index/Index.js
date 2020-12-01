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
