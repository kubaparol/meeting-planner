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
        <form>
          <label>First name:
            <input type="text" value={firstName}/>
            </label>
          <label>Last name:
            <input type="text" value={lastName}/>
            </label>
          <label>E-mail:
            <input type="text" value={email}/>
            </label>
          <label>Date:
            <input type="text" value={date}/>
            </label>
          <label>Time:
            <input type="text" value={time}/>
            </label>
            <input type="submit" value="Add" />
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
}

export default Calendar