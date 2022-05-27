import React from 'react'

import AddMeetingForm from './components/AddMeetingForm'
import MeetingsList from './components/MeetingsList'

class Calendar extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    date: '',
    time: '',
    meetings: [
      {
        firstName: "Jan",
        lastName: "Kowalski",
        email: "jan@kowalski.not",
        date: "2022-01-01",
        time: "10:00",
        id: 1
      }
    ]
  }

  render() {
    const {meetings} = this.state

    return (
      <>
        <h1>Meeting planner</h1>
        <AddMeetingForm addNewMeeting={this.addNewMeeting} inputChange={this.inputChange} state={this.state}/>
        <MeetingsList meetings={meetings} deleteMeeting={this.deleteMeeting}/>
      </>
    )
  }

  inputChange = (e) => {
    const {name, value} = e.target

    this.setState({
      [name]: value,
    })
  }

  addNewMeeting = (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      date,
      time
    } = this.state

    const newMeeting = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      date: date,
      time: time
    }

    this.setState((prevState) => ({
      firstName: '',
      lastName: '',
      email: '',
      date: '',
      time: '',
      meetings: prevState.meetings.concat(newMeeting),
    }))
  }

  deleteMeeting = (meetingId) => {
    this.setState((prevState) => ({
      meetings: prevState.meetings.filter((meeting) => meeting.id !== meetingId)
    }))
  }
}

export default Calendar