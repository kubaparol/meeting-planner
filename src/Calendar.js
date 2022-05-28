import React from 'react'

import AddMeetingForm from './components/AddMeetingForm'
import MeetingsList from './components/MeetingsList'
import CalendarAPI from './api'

class Calendar extends React.Component {
  api = new CalendarAPI()
  state = {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    date: '',
    time: '',
    isLoading: false,
    hasError: false,
    meetings: null,
    firstNameErrorMessage: '',
    lastNameErrorMessage: '',
    emailErrorMessage: '',
    dateErrorMessage: '',
    timeErrorMessage: '',
  }

  
  render() {
    const {hasError, isLoading, meetings} = this.state
    
    return (
      <>
        <h1>Meeting planner</h1>
        <AddMeetingForm addNewMeeting={this.addNewMeeting} inputChange={this.inputChange} state={this.state} displayError={this.displayError}/>
        {hasError ?
        <h2>Error!</h2>
        : isLoading ?
        <h2>Loading...</h2>
        : !meetings ?
        <h2>No data!</h2>
        : meetings.length === 0 ?
        <h2>Meetings are empty!</h2>
        :
        <MeetingsList meetings={meetings} deleteMeeting={this.deleteMeeting}/>
        }
      </>
    )
  }
  
  async componentDidMount() {
    try {
      this.setState(() => ({
        isLoading: true
      }))
      const meetings = await this.api.loadMeetingsFromAPI()
      this.setState(() => ({
        meetings: meetings,
        hasError: false,
      }))
      
    } catch (e) {
      this.setState(() => ({
        hasError: true
      }))

    } finally {
      this.setState(() => ({
        isLoading: false
      }))
    }
  }
  
  inputChange = (e) => {
    const {name, value} = e.target
    
    this.setState({
      [name]: value,
    })
  }
  
  addNewMeeting = async (e) => {
    e.preventDefault();
    
    const {
      firstName,
      lastName,
      email,
      date,
      time,
    } = this.state
    
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
        meetings: [...this.state.meetings, newMeetingWithId],
      }))
    }
    
  }
  
  deleteMeeting = (meetingId) => {
    this.setState((prevState) => ({
      meetings: prevState.meetings.filter((meeting) => meeting.id !== meetingId)
    }), () => this.api.deleteMeetingFromAPI(meetingId))
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
      this.displayError('firstNameErrorMessage', 'First name must be min. 2 characters long!')
    } else this.displayError('firstNameErrorMessage', '')

    if(!lastName || lastName.length < 2) {
      this.displayError('lastNameErrorMessage', 'Last name must be min. 2 characters long!')
    } else this.displayError('lastNameErrorMessage', '')

    if(!email || emailReg.test(email) === false) {
      this.displayError('emailErrorMessage', 'Enter correct email!')
    } else this.displayError('emailErrorMessage', '')

    if(!date || dateReg.test(date) === false) {
      this.displayError('dateErrorMessage', 'Enter correct date, i.e. yyyy-mm-dd!')
    } else this.displayError('dateErrorMessage', '')

    if(!time || timeReg.test(time) === false) {
      this.displayError('timeErrorMessage', 'Enter correct time, i.e. hh:mm!')
    } else this.displayError('timeErrorMessage', '')
  }

  displayError(name, message) {
    this.setState(() => ({
      [name]: message
    }))
  }

}

export default Calendar