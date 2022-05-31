import React from 'react'
import PropTypes from 'prop-types'

import { MeetingsPropsType } from '../MeetingItem'
import TextField from '../TextField'
import Message from '../Message'
import CalendarAPI from '../../api/CalendarAPI'

import classes from './styles.module.css'

class AddMeetingForm extends React.Component {
state = {
  id: null,
  firstName: '',
  lastName: '',
  email: '',
  date: '',
  time: '',
  firstNameErrorMessage: '',
  lastNameErrorMessage: '',
  emailErrorMessage: '',
  dateErrorMessage: '',
  timeErrorMessage: ''
}


render() {
  const {className} = this.props
  const {firstName, 
    lastName, 
    email, 
    date, 
    time, 
    firstNameErrorMessage, 
    lastNameErrorMessage, 
    emailErrorMessage, 
    dateErrorMessage, 
    timeErrorMessage} = this.state

  return (
      <form onSubmit={this.addNewMeeting} className={`${classes.root}${className ? ` ${className}` : ''}`}>
          <TextField text={"First name"} name={"firstName"} value={firstName} onChange={this.inputChange}/>
          <Message type='error'>{firstNameErrorMessage}</Message>
          <TextField text={"Last name"} name={"lastName"} value={lastName} onChange={this.inputChange}/>
          <Message type='error'>{lastNameErrorMessage}</Message>
          <TextField text={"E-mail"} type="email" name={"email"} value={email} onChange={this.inputChange}/>
          <Message type='error'>{emailErrorMessage}</Message>
          <TextField text={"Date"} type="date" name={"date"} value={date} onChange={this.inputChange}/>
          <Message type='error'>{dateErrorMessage}</Message>
          <TextField text={"Time"} type="time" name={"time"} value={time} onChange={this.inputChange}/>
          <Message type='error'>{timeErrorMessage}</Message>
          <input type="submit" value="Add" className={classes.submit}/>
      </form>
    )
  }

  addNewMeeting = async (e) => {
    e.preventDefault();

    const {firstName, lastName, email, date, time} = this.state

    this.formValidation()

    if(firstName && lastName && email && date && time) {

      const newMeeting = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        date: date,
        time: time
      }

      const api = new CalendarAPI()
      const data = await api.addNewMeetingToAPI(newMeeting)
      const newMeetingWithId = {...newMeeting, id: data.id}

      this.setState(() => ({
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        date: '',
        time: '',
      }))
      
      this.props.getMeeting(newMeetingWithId)
    }
  }

  inputChange = e => {
    const {name, value} = e.target

    this.setState({
      [name]: value,
    })
  }

  formValidation() {
    const {
      firstName,
      lastName,
      email,
      date,
      time,
    } = this.state

    const emailReg = /(?:^|\s)[\w!#$%&'*+/=?^`{|}~-](\.?[\w!#$%&'*+/=?^`{|}~-]+)*@\w+[.-]?\w*\.[a-zA-Z]{2,3}\b/
    const dateReg = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
    const timeReg = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/

    if(!firstName || firstName.length < 2) {
      this.displayError('firstNameErrorMessage', 'First name must be min. 2 characters long')
    } else this.displayError('firstNameErrorMessage', '')

    if(!lastName || lastName.length < 2) {
      this.displayError('lastNameErrorMessage', 'Last name must be min. 2 characters long')
    } else this.displayError('lastNameErrorMessage', '')

    if(!email || emailReg.test(email) === false) {
      this.displayError('emailErrorMessage', 'Incorrect email')
    } else this.displayError('emailErrorMessage', '')

    if(!date || dateReg.test(date) === false) {
      this.displayError('dateErrorMessage', 'Incorrect date (yyyy-mm-dd)')
    } else this.displayError('dateErrorMessage', '')

    if(!time || timeReg.test(time) === false) {
      this.displayError('timeErrorMessage', 'Incorrect time (hh:mm)')
    } else this.displayError('timeErrorMessage', '')
  }

  displayError(name, message) {
    this.setState(() => ({
      [name]: message
    }))
  }
}

export default AddMeetingForm