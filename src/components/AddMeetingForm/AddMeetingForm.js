import React from 'react'
import PropTypes from 'prop-types'

import { MeetingsPropsType } from '../MeetingItem'

import classes from './styles.module.css'

const AddMeetingForm = props => {
  const {addNewMeeting,
    inputChange,
    state,
    className, 
    ...otherProps} = props

    //Czy przekazywanie całego stanu w taki sposób jest ok? W przypadku gdyby lista spotkań była rozbudowana będzie to mieć
    // wpływ na wydajność bądź nie powinienem się tym przejmować? :D
    const {firstName, lastName, email, date, time} = state

  return (
    <form onSubmit={addNewMeeting} className={`${classes.root}${className ? ` ${className}` : ''}`} {...otherProps}>
      <label>First name:
        <input name={"firstName"} value={firstName} onChange={inputChange}/>
        </label>
      <label>Last name:
        <input name={"lastName"} value={lastName} onChange={inputChange}/>
        </label>
      <label>E-mail:
        <input name={"email"} value={email} onChange={inputChange}/>
        </label>
      <label>Date:
        <input name={"date"} value={date} onChange={inputChange}/>
        </label>
      <label>Time:
        <input name={"time"} value={time} onChange={inputChange}/>
        </label>
        <input type="submit" value="Add"/>
    </form>
  )
}

AddMeetingForm.propTypes = {
  addNewMeeting: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
  state: MeetingsPropsType.isRequired,
  className: PropTypes.string,
}

export default AddMeetingForm