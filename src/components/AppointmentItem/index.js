import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, updatedStarFeelds} = props
  const {id, inputTitle, inputDate, isStarred} = appointmentDetails
  const appointmentIsStarred = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const formatedDate = format(new Date(inputDate), 'dd MMMM yyyy, EEEE')
  const appointmentDate = `Date: ${formatedDate}`
  const onClickStarred = () => {
    updatedStarFeelds(id)
  }
  return (
    <li className="appointment-list-contianer">
      <div className="title-stare-container">
        <p className="appointment-title">{inputTitle}</p>
        <img
          src={appointmentIsStarred}
          alt="star"
          onClick={onClickStarred}
          className="stare-btn"
        />
      </div>
      <p className="appointment-date">{appointmentDate}</p>
    </li>
  )
}

export default AppointmentItem
