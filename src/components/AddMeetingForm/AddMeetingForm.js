import React from 'react'

import TextField from '../TextField'
import Message from '../Message'
import CalendarAPI from '../../api/CalendarAPI'

import classes from './styles.module.css'

class AddMeetingForm extends React.Component {
  api = new CalendarAPI()
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

      const data = await this.api.addNewMeetingToAPI(newMeeting)
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

    const regRules = [
      {name: 'email', reg: /(?:^|\s)[\w!#$%&'*+/=?^`{|}~-](\.?[\w!#$%&'*+/=?^`{|}~-]+)*@\w+[.-]?\w*\.[a-zA-Z]{2,3}\b/, message: 'Incorrect email'},
      {name: 'date', reg: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/, message: 'Incorrect date (yyyy-mm-dd)'},
      {name: 'time', reg: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, message: 'Incorrect time (hh:mm)'},
    ]
    
    const rules = [
      {name: 'firstName', minLength: 2, message: 'First name must be min. 2 characters long'},
      {name: 'lastName', minLength: 2, message: 'Last name must be min. 2 characters long'}
    ]

    regRules.forEach(item => {
      const value = this.state[item.name]

      if(item.reg.test(value) === false) {
        this.displayError(`${item.name}ErrorMessage`, item.message)
      } else this.displayError(`${item.name}ErrorMessage`, '')
    })

    rules.forEach(item => {
      const value = this.state[item.name]

      if(value.length < item.minLength) {
        this.displayError(`${item.name}ErrorMessage`, item.message) 
      } else this.displayError(`${item.name}ErrorMessage`, '')
    })

  }

  displayError(name, message) {
    this.setState(() => ({
      [name]: message
    }))
  }
}

export default AddMeetingForm