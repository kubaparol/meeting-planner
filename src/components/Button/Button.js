import React from 'react'

import PropTypes from 'prop-types'

import classes from './styles.module.css'

const Button = props => {
  const {children, className, ...otherProps} = props

  return (
    <button className={`${classes.root}${className ? ` ${className}` : ''}`} {...otherProps}>
      {children}
    </button>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

export default Button