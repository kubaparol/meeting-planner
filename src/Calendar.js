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
    meetings: null
  }

  render() {
    const {hasError, isLoading, meetings} = this.state

    return (
      <>
        <h1>Meeting planner</h1>
        <AddMeetingForm addNewMeeting={this.addNewMeeting} inputChange={this.inputChange} state={this.state}/>
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
      this.hasError(() => ({
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
      time
    } = this.state

  
    const newMeeting = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      date: date,
      time: time
    }
    
    const data = await this.api.addNewMeetingToAPI(newMeeting)
    
    const newMeetingWithId = {...newMeeting, id: data.id}

    this.setState((prevState) => ({
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      date: '',
      time: '',
      meetings: [...this.state.meetings, newMeetingWithId],
    }))
  }

  deleteMeeting = (meetingId) => {
    this.setState((prevState) => ({
      meetings: prevState.meetings.filter((meeting) => meeting.id !== meetingId)
    }), () => this.api.deleteMeetingFromAPI(meetingId))
  }
}

export default Calendar