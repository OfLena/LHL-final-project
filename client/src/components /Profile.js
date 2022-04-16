import React, { useState } from "react";
import axios from 'axios';

import SearchBar from './SearchBar';

export default function Profile (props) {

const { user, recipes, favs } = props
const [showFavs, setShowFavs] = useState("")
const [showUserRecipes, setShowUserRecipes] = useState("")

console.log(user)

function getFavRecipes() {
  //reset the user recipes state to empty string at the beginning (onClick)
  setShowUserRecipes("")
  return(
    setShowFavs(
    <li>{favs.map(fav => fav.recipe_id)}</li>
    ) 
  )
}

function getUserRecipes() {
  //reset the fav recipes state to empty string at the beginning (onClick)
  setShowFavs("")
  return(
    setShowUserRecipes(
    <li>{recipes.map(recipe => recipe.title)}</li>
    ) 
  )
}
  
  return (
    <div>
      {/* // photo here  */}
      {/* Need to add logic here to populate first name, last name and user name where it matches the id of the user */}

      <ul>
      <li>{user.first_name}</li>
      <li>{user.last_name}</li>
      <li>{user.id}</li>
      </ul>

      <input type= "button" value="Fav Recipes" onClick={getFavRecipes}/>
      <input type= "button" value="Your Recipes" onClick={getUserRecipes}/>
      <SearchBar />
      <h1>{showFavs}</h1>
      <h1>{showUserRecipes}</h1>

      {/* // area to populate either saved recipes or your recipes */}
    </div>
  )
}