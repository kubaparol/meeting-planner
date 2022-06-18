import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faCalendar, faClock } from '@fortawesome/free-solid-svg-icons'

import Button from './../Button'

import classes from './styles.module.css'

const MeetingItem = props => {
  const {meeting, deleteMeeting, className, ...otherProps} = props

  const {id, firstName, lastName, email, date, time} = meeting

  return (
    <li
      className={`${classes.root}${className ? ` ${className}` : ""}`}
      {...otherProps}
    >
      <header>
        <h2 className={classes.name}>
          <span>
            <FontAwesomeIcon icon={faUser} className={classes.icon} />
          </span>{" "}
          {firstName} {lastName}
        </h2>
        <p className={classes.email}>
          <span>
            <FontAwesomeIcon icon={faEnvelope} className={classes.icon} />
          </span>{" "}
          {email}
        </p>
      </header>
      <p className={classes.date}>
        <span>
          <FontAwesomeIcon icon={faCalendar} className={classes.icon} />
        </span>{" "}
        {date}
      </p>
      <p className={classes.time}>
        <span>
          <FontAwesomeIcon icon={faClock} className={classes.icon} />
        </span>{" "}
        {time}
      </p>
      <div className={classes.buttonContainer}>
        <Button onClick={(e) => deleteMeeting(id)} className={classes.button}>
          Delete
        </Button>
      </div>
    </li>
  );
}

export const MeetingsPropsType = PropTypes.shape({
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