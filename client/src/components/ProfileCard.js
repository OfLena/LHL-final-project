
import './styles/profilecard.scss'

export default function  ProfileCard (props) {

  const { user_first,
  user_last, 
  user_name,
  email,
  avatar } = props
return (

 <div className="profile-card-container">
    <div className="avatar-flip">
      <img src={`http://localhost:8080/images/${avatar}`} height="150" width="150"/>
      <img className='potluck-logo'src="http://localhost:8080/images/POTLUCK_FLIPPED.png" height="150" width="150"/>
    </div>
    <h2>{user_first} {user_last}</h2>
    <h4>Username: {user_name}</h4>
    <p>Email: {email}</p>
  </div>


)



}