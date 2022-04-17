

import React, { useState, useEffect } from "react";
import axios from "axios";

import RecipeListItem from "./RecipeListItem";

import { Box, Typography, Grid, Button, Container } from "@mui/material";

export default function Profile(props) {
  const { user, userRecipes, favs } = props;
  const [showFavs, setShowFavs] = useState("");
  const [showUserRecipes, setShowUserRecipes] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (showFavs) {
      getFavRecipes();
    } else if (showUserRecipes) {
      getUserRecipes();
    }
  }, [search]);

  function getFavRecipes() {
    setShowUserRecipes("");
    return setShowFavs(userFavRecipes);
  }

  function getUserRecipes() {
    setShowFavs("");
    return setShowUserRecipes(recipesFromUser);
  }

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  let filteredSearchForUserRecipes = userRecipes.filter((val) => {
    if (search === "") {
      return val;
    } else if (val.title.toLowerCase().includes(search.toLowerCase())) {
      return val;
    }
  });

  let filteredSearchForFavRecipes = favs.filter((val) => {
    if (search === "") {
      return val;
    } else if (val.title.toLowerCase().includes(search.toLowerCase())) {
      return val;
    }
  });

  const recipesFromUser = props.userRecipes.map((recipe) => {
    return (
      <RecipeListItem
        key={recipe.id}
        title={recipe.title}
        image_url={recipe.image_url}
        prep_time={recipe.prep_time}
        instruction_1={recipe.instruction_1}
        instruction_2={recipe.instruction_2}
        instruction_3={recipe.instruction_3}
        instruction_4={recipe.instruction_4}
        instruction_5={recipe.instruction_5}
        link={recipe.link}
        serving_size={recipe.serving_size}
      />
    );
  });

  const userFavRecipes = props.favs.map((recipe) => {
    return (
      <RecipeListItem
        key={recipe.id}
        title={recipe.title}
        image_url={recipe.image_url}
        prep_time={recipe.prep_time}
        instruction_1={recipe.instruction_1}
        instruction_2={recipe.instruction_2}
        instruction_3={recipe.instruction_3}
        instruction_4={recipe.instruction_4}
        instruction_5={recipe.instruction_5}
        link={recipe.link}
        serving_size={recipe.serving_size}
      />
    );
  });

  return (
    <Box
      component="form"
      sx={{ marginTop: "6rem" }}
      noValidate
      autoComplete="off"
    >
      <Typography> THIS IS WHERE THE PHOTO WILL GO </Typography>

      <Typography>
        {user.first_name} {user.last_name}
      </Typography>
      <Typography>@{user.user_name}</Typography>
      
        <div className="button-container">
      <Button variant="contained" onClick={getFavRecipes}>
        Fav Recipes
      </Button>
      
      
      <Button variant="contained" onClick={getUserRecipes}>
        Your Recipes
      </Button>
      
      </div>
      {/* <input type="button" value="Fav Recipes" onClick={getUserRecipes} />
      <input type="button" value="Your Recipes" onClick={getFavRecipes} /> */}

      <div>
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          placeholder="Search..."
        />
      </div>
      <Typography>Recipes</Typography>
      <div className="recipe-card-container">
        {showFavs}
        {showUserRecipes}
      </div>
    </Box>
  );
}
