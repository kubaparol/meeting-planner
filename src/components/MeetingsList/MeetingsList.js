import React from 'react'

import PropTypes from 'prop-types'

import MeetingItem, {MeetingsPropsType} from '../MeetingItem'

import classes from './styles.module.css'

const MeetingsList = props => {
  const {meetings, deleteMeeting, className, ...otherProps} = props

  return (
    <ul className={`${classes.root}${className ? ` ${className}` : ''}`} {...otherProps}>
      {meetings.map(meeting => {
        return (
          <React.Fragment key={meeting.id}>
            <MeetingItem meeting={meeting} deleteMeeting={deleteMeeting}/>
          </React.Fragment>
        )
        })}
    </ul>
  )
}

MeetingsList.propTypes = {
  meetings: PropTypes.arrayOf(MeetingsPropsType).isRequired,
  deleteMeeting: PropTypes.func.isRequired,
  className: PropTypes.string,
}

export default MeetingsList