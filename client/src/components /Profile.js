import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function Profile (props) {

  const { user, userRecipes, favs } = props
  const [showFavs, setShowFavs] = useState("")
  const [showUserRecipes, setShowUserRecipes] = useState("")
  const [search, setSearch] = useState("")

  console.log('user recipes ---> ',userRecipes)
  console.log('favourited recipes --->', favs)

  useEffect (() => {
    if (showFavs) {
    getFavRecipes()
    } else if (showUserRecipes) {
    getUserRecipes()
    }
  }, [search])

  function getFavRecipes() {
    //reset the user recipes state to empty string at the beginning (onClick)
    setShowUserRecipes("")
      return(
        setShowFavs(
        <div>{filteredSearchForFavRecipes.map(fav => <li key={fav.id}>{fav.title}</li>)}</div>
        ) 
      )
  }

  function getUserRecipes() {
    //reset the fav recipes state to empty string at the beginning (onClick)
    setShowFavs("")
      return(
        setShowUserRecipes(
        <div>{filteredSearchForUserRecipes.map(recipe => <li key={recipe.id}>{recipe.title}</li>)}</div>
        ) 
      )
  }

  function handleSearch(event) {
    setSearch(event.target.value)
  }

  let filteredSearchForUserRecipes = userRecipes.filter(val => {
    if (search === '') {
      return val
    } else if (val.title.toLowerCase().includes(search.toLowerCase())) {
      console.log('FILTERED RECIPE', val)
      return val
    }
  })

  let filteredSearchForFavRecipes = favs.filter(val => {
    if (search === '') {
      return val
    } else if (val.title.toLowerCase().includes(search.toLowerCase())) {
      console.log('FILTERED RECIPE', val)
      return val
    }
  })

  return (
    <div>

      <h2> THIS IS WHERE THE PHOTO WILL GO </h2>

      <div>{user.first_name} {user.last_name}</div>
      <div>@{user.user_name}</div>


      <h3>Recipes</h3>
      <input type= "button" value="Fav Recipes" onClick={getFavRecipes}/>
      <input type= "button" value="Your Recipes" onClick={getUserRecipes}/>
      <div>
        <input 
          type="text" 
          onChange={handleSearch}
          value={search}
          placeholder="Search..."
        />
      </div>
      <ul>{showFavs}</ul>
      <ul>{showUserRecipes}</ul>
    </div>
  )
}

