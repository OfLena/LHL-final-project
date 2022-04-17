import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function Profile (props) {

  const { user, userRecipes, favs, onClick } = props
  const [showFavs, setShowFavs] = useState("")
  const [showUserRecipes, setShowUserRecipes] = useState("")
  const [search, setSearch] = useState("")

  // console.log('user recipes ---> ',userRecipes)
  console.log('favourited recipes --->', favs)

  useEffect (() => {
    getFavRecipes()
    getUserRecipes()
  }, [search])

  function getFavRecipes() {
    //reset the user recipes state to empty string at the beginning (onClick)
    setShowUserRecipes("")
    // if (onClick) {
      return(
        setShowFavs(
        <div>{filteredSearchForFavRecipes.map(fav => <li key={fav.id}>{fav.title}</li>)}</div>
        ) 
      )
    // }
  }

  function getUserRecipes() {
    //reset the fav recipes state to empty string at the beginning (onClick)
    setShowFavs("")
    // if (onClick) {
      return(
        setShowUserRecipes(
        <div>{filteredSearchForUserRecipes.map(recipe => <li key={recipe.id}>{recipe.title}</li>)}</div>
        ) 
      )
    // }
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

      <ul>
      <li>{user.first_name}</li>
      <li>{user.last_name}</li>
      <li>{user.id}</li>
      </ul>

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

