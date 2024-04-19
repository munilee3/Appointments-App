import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {appointmentList: [], inputTitle: '', inputDate: '', isStar: false}

  updatedStarFeelds = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onStarredAppointments = () => {
    const {appointmentList, isStar} = this.state
    this.setState({isStar: !isStar})
    if (isStar) {
      return appointmentList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    }
    return appointmentList
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {inputTitle, inputDate} = this.state
    const newAppointment = {
      id: uuidv4(),
      inputTitle,
      inputDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      inputTitle: '',
      inputDate: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({inputTitle: event.target.value})
  }

  onChangeDate = event => {
    this.setState({inputDate: event.target.value})
  }

  render() {
    const {appointmentList, inputTitle, inputDate, isStar} = this.state
    const starredbuttonClassName = isStar ? 'starred-btn' : 'unstarred-btn'
    return (
      <div className="app-container">
        <div className="appointment-container">
          <h1 className="title">Add Appointment</h1>
          <form onSubmit={this.onAddAppointment} className="form-container">
            <div>
              <label htmlFor="title" className="form-title">
                TITLE
              </label>
              <input
                id="title"
                className="input-title"
                type="text"
                value={inputTitle}
                onChange={this.onChangeTitle}
              />
              <label htmlFor="date" className="form-date">
                DATE
              </label>
              <input
                id="date"
                className="input-date"
                type="date"
                value={inputDate}
                onChange={this.onChangeDate}
              />
              <button type="submit" className="add-btn">
                Add
              </button>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-image"
            />
          </form>
          <hr className="horizontal-line" />
          <div className="appointments">
            <h1>Appointments</h1>
            <button
              type="button"
              className={starredbuttonClassName}
              onClick={this.onStarredAppointments}
              data-testid="star"
            >
              Starred
            </button>
          </div>
          <ul className="appointments-container">
            {appointmentList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                updatedStarFeelds={this.updatedStarFeelds}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
