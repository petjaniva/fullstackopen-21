import React from "react"

const Filter = ({onChange, value}) => {
    return (
      <div>
      filter shown with
      <input
        value = {value}
        onChange = {onChange}
        />
      </div>
    )
  }

  export default Filter