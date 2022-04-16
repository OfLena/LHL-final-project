import React, { useState } from "react";
import axios from 'axios';

export default function Profile (props) {

const { users, recipes, favs } = props
const [showFavs, setShowFavs] = useState("")
const [showUserRecipes, setShowUserRecipes] = useState("")

function getFavRecipes() {
  setShowUserRecipes("")
  return(
    setShowFavs(<li>{favs.map(fav => fav.recipe_id)}</li>) 
  )
}

function getUserRecipes() {
  setShowFavs("")
  return(
    setShowUserRecipes(<li>{recipes.map(recipe => recipe.title)}</li>) 
  )
}
  
  return (
    <div>
      {/* // photo here  */}
      {/* Need to add logic here to populate first name, last name and user name where it matches the id of the user */}

      <ul>
      <li>{users.map(user => user.first_name)}</li>
      <li>{users.map(user => user.last_name)}</li>
      <li>{users.map(user => user.user_name)}</li>
      </ul>

      <input type= "button" value="Fav Recipes" onClick={getFavRecipes}/>
      <input type= "button" value="Your Recipes" onClick={getUserRecipes}/>
      <li><input type="text" placeholder="Search Recipes..."></input></li>
      <h1>{showFavs}</h1>
      <h1>{showUserRecipes}</h1>

      {/* // area to populate either saved recipes or your recipes */}
    </div>
  )
}