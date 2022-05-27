import React from 'react'
import PropTypes from 'prop-types'

import Button from './../Button'

import classes from './styles.module.css'

const MeetingItem = props => {
  const {meeting, deleteMeeting, className, ...otherProps} = props

  const {id, firstName, lastName, email, date, time} = meeting

  return (
    <li key={id} className={`${classes.root}${className ? ` ${className}` : ''}`} {...otherProps}>
      <header>
        <h2>{firstName} {lastName}</h2>
        <p>{email}</p>
      </header>
      <p>{date} {time}</p>
      <Button onClick={e => deleteMeeting(id)}>Delete</Button>
    </li>
  )
}

export const MeetingsPropsType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
})

MeetingItem.propTypes = {
  meeting: MeetingsPropsType.isRequired,
  deleteMeeting: PropTypes.func.isRequired,
  className: PropTypes.string,
}

export default MeetingItem