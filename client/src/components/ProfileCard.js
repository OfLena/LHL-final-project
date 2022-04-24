
import './styles/profilecard.scss'


import LunchDiningIcon from '@mui/icons-material/LunchDining';

export default function  ProfileCard (props) {

  const { user_first,
  user_last, 
  user_name,
  email,
  avatar, 
  userFavRecipes,
  recipesFromUser
  } = props


const contributions = recipesFromUser.length
const favourites = userFavRecipes.length

const  userRating = function (contributions) {
  let result = []
  let i = 0
  while (i < contributions && i < 5){
    result.push(<LunchDiningIcon sx={{color: '#CCA01D'}}/>);
    i++;
  }
  return result
}

return (

 <div className="profile-card-container">
    <div className="avatar-flip">
      <img src={`http://localhost:8080/images/${avatar}`} height="150" width="150"/>
      <img className='potluck-logo'src="http://localhost:8080/images/POTLUCK_FLIPPED.png" height="150" width="150"/>
    </div>
    <h1>{user_first} {user_last}</h1>
    <h3>Username: {user_name}</h3>
    <h4>Email: {email}</h4>
    <p>Recipe Contributions: {contributions}</p>
    <p>Favorites: {favourites}</p>
    <p>User Rating: </p>
    <p>{userRating(contributions)}</p>
  </div>


)



}