import React from 'react'
import PropTypes from 'prop-types'

import { MeetingsPropsType } from '../MeetingItem'
import TextField from '../TextField'

import classes from './styles.module.css'

const AddMeetingForm = props => {
  const {addNewMeeting,
    inputChange,
    state,
    className, 
    ...otherProps} = props

    //Czy przekazywanie całego stanu w taki sposób jest ok? W przypadku gdyby lista spotkań była rozbudowana będzie to mieć
    // wpływ na wydajność czy nie powinienem się tym przejmować? :D
    const {firstName, lastName, email, date, time} = state

  return (
    <form onSubmit={addNewMeeting} className={`${classes.root}${className ? ` ${className}` : ''}`} {...otherProps}>
        <TextField text={"First name"} name={"firstName"} value={firstName} onChange={inputChange}/>
        <TextField text={"Last name"} name={"lastName"} value={lastName} onChange={inputChange}/>
        <TextField text={"E-mail"} name={"email"} value={email} onChange={inputChange}/>
        <TextField text={"Date"} name={"date"} value={date} onChange={inputChange}/>
        <TextField text={"Time"} name={"time"} value={time} onChange={inputChange}/>
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