import React from 'react'
import PropTypes from 'prop-types'

export const CheckBox = props => {
  const { name, value, params, event } = props
  return (
    <label>
      <input
        type="checkbox"
        value={value}
        onChange={event}
        data-params={params}
      />
      {name}
      <span className="control">
        <i>&#x2713;</i>
      </span>
    </label>
  )
}

export default CheckBox

CheckBox.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  params: PropTypes.string,
  event: PropTypes.func,
}
