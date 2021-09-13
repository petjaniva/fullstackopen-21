import React from 'react'

const notificationStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const errorStyle = {
  color: 'red',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}
const Notification = ({ msg, errorMsg }) => {
  if (msg === null && errorMsg === null) {
    return null
  }
  else if (msg) {
    return (
      <div style={notificationStyle}>
        {msg}
      </div>
    )
  }
  else {
    return (
      <div className='error' style={errorStyle}>
        {errorMsg}
      </div>
    )
  }
}

export default Notification