import React from 'react'

import './Calendar.css'

import AddMeetingForm from './components/AddMeetingForm'
import MeetingsList from './components/MeetingsList'
import CalendarAPI from './api'
import Message from './components/Message'

class Calendar extends React.Component {
  api = new CalendarAPI()
  state = {
    isLoading: false,
    hasError: false,
    meetings: null,
  }

  
  render() {  
    return (
      <>
        <h1 className="title">Meeting planner</h1>
        <AddMeetingForm getMeeting={this.getMeeting}/>
        {this.renderMeetingsLists()}
      </>
    )
  }

  getMeeting = meeting => {
    this.setState({
      meetings: [...this.state.meetings, meeting],
    })
  }
  
  renderMeetingsLists() {
    const {hasError, isLoading, meetings} = this.state
    
    if(hasError === true) return <Message type='fetchInfo'>Error!</Message>
    if(isLoading === true) return <Message type='fetchInfo'>Loading...</Message>
    if(!meetings) return <Message type='fetchInfo'>No data</Message>
    if(meetings.length === 0) return <Message type='fetchInfo'>No scheduled meetings</Message>
    
    return <MeetingsList meetings={meetings} deleteMeeting={this.deleteMeeting} text={'Scheduled:'}/>
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
  
  deleteMeeting = (meetingId) => {
    this.setState((prevState) => ({
      meetings: prevState.meetings.filter((meeting) => meeting.id !== meetingId)
    }), () => this.api.deleteMeetingFromAPI(meetingId))
  }

}

export default Calendar