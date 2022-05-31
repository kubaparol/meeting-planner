import React from 'react'

import PropTypes from 'prop-types'

import classes from './styles.module.css'

const Message = props => {
  const {children, className, type, ...otherProps} = props

  return (
    <span className={`${classes.root} ${type === 'error' ? classes.error : type === 'fetchInfo' ? classes.fetchInfo : ''}${className ? ` ${className}` : ''}`} {...otherProps}>
      {children}
    </span>
  )
}

Message.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

export default Message