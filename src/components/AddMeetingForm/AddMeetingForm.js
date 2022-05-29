import React from 'react'
import PropTypes from 'prop-types'

import { MeetingsPropsType } from '../MeetingItem'
import TextField from '../TextField'
import Message from '../Message'

import classes from './styles.module.css'

const AddMeetingForm = props => {
  const {addNewMeeting,
    displayError,
    inputChange,
    state,
    className, 
    ...otherProps} = props

    //Czy przekazywanie całego stanu w taki sposób jest ok? W przypadku gdyby lista spotkań była rozbudowana będzie to mieć
    // wpływ na wydajność czy nie powinienem się tym przejmować? :D
    const {
      firstName, 
      lastName, 
      email, 
      date, 
      time, 
      firstNameErrorMessage, 
      lastNameErrorMessage, 
      emailErrorMessage, 
      dateErrorMessage, 
      timeErrorMessage} = state

  return (
    <form onSubmit={addNewMeeting} className={`${classes.root}${className ? ` ${className}` : ''}`} {...otherProps}>
        <TextField text={"First name"} name={"firstName"} value={firstName} onChange={inputChange}/>
        <Message>{firstNameErrorMessage}</Message>
        <TextField text={"Last name"} name={"lastName"} value={lastName} onChange={inputChange}/>
        <Message>{lastNameErrorMessage}</Message>
        <TextField text={"E-mail"} type="email" name={"email"} value={email} onChange={inputChange}/>
        <Message>{emailErrorMessage}</Message>
        <TextField text={"Date"} type="date" name={"date"} value={date} onChange={inputChange}/>
        <Message>{dateErrorMessage}</Message>
        <TextField text={"Time"} type="time" name={"time"} value={time} onChange={inputChange}/>
        <Message>{timeErrorMessage}</Message>
        <input type="submit" value="Add" className={classes.submit}/>
    </form>
  )
}

AddMeetingForm.propTypes = {
  addNewMeeting: PropTypes.func.isRequired,
  displayError: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
  state: MeetingsPropsType.isRequired,
  className: PropTypes.string,
}

export default AddMeetingForm