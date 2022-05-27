import React from 'react'

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
    const {
      firstName,
      lastName,
      email,
      date,
      time,
      meetings
    } = this.state

    return (
      <>
        <h1>Meeting planner</h1>
        <form onSubmit={this.addNewMeeting}>
          <label>First name:
            <input name={"firstName"} value={firstName} onChange={this.inputChange}/>
            </label>
          <label>Last name:
            <input name={"lastName"} value={lastName} onChange={this.inputChange}/>
            </label>
          <label>E-mail:
            <input name={"email"} value={email} onChange={this.inputChange}/>
            </label>
          <label>Date:
            <input name={"date"} value={date} onChange={this.inputChange}/>
            </label>
          <label>Time:
            <input name={"time"} value={time} onChange={this.inputChange}/>
            </label>
            <input type="submit" value="Add"/>
        </form>
        <ul>
          {meetings.map(({firstName, lastName, email, date, time, id}) => {
            return (
              <li key={id}>
                <header>
                  <h2>{firstName} {lastName}</h2>
                  <p>{email}</p>
                </header>
                <p>{date} {time}</p>
                <button>Delete</button>
              </li>
            )
          })}
        </ul>
      </>
    )
  }

  inputChange = e => {
    const {name, value} = e.target

    this.setState({
      [name]: value,
    })
  }

  addNewMeeting = e => {
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
}

export default Calendar