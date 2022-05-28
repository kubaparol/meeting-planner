import React from 'react'

import PropTypes from 'prop-types'

import classes from './styles.module.css'

const Message = props => {
  const {children, className, ...otherProps} = props

  return (
    <span className={`${classes.root}${className ? ` ${className}` : ''}`} {...otherProps}>
      {children}
    </span>
  )
}

Message.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

export default Message