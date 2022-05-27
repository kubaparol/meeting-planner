import React from 'react'

import PropTypes from 'prop-types'

import classes from './styles.module.css'

const TextField = props => {
  const {text, name, value, onChange, className, ...otherProps} = props

  return (
    <label>{text}:
      <input className={`${classes.root}${className ? ` ${className}` : ''}`} {...otherProps}
      name={name} 
      value={value} 
        onChange={onChange}/>
    </label>
  )
}

TextField.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default TextField