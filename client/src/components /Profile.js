import React, { useState, useEffect } from "react";
import axios from "axios";

import RecipeListItem from "./RecipeListItem";

import {
  Box,
  Typography,
  Grid,
  Button,
  Container,
  TextField,
} from "@mui/material";
import Footer from "./Footer";

export default function Profile(props) {
  const { user, state, recipe_id } = props;
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

  const userFilteredRecipes = state.filtered_recipes.filter((val) => {
    if (val.user_id === user.id) {
      return val;
    }
  })

  let filteredSearchForUserRecipes = userFilteredRecipes.filter((val) => {
    if (search === "") {
      return val;
    } else if (val.title.toLowerCase().includes(search.toLowerCase())) {
      return val;
    }
  });

  let filteredSearchForFavRecipes = state.favs.filter((val) => {
    if (search === "") {
      return val;
    } else if (val.title.toLowerCase().includes(search.toLowerCase())) {
      return val;
    }
  });

  const recipesFromUser = filteredSearchForUserRecipes.map((recipe) => {
    return (
      <RecipeListItem
        key={recipe.id}
        recipe_id={recipe.id}
        user_id={user.id}
        state={state}
        title={recipe.title}
        user_name={user.user_name}
        image_url={recipe.image_url}
        prep_time={recipe.prep_time}
        instruction_1={recipe.instruction_1}
        instruction_2={recipe.instruction_2}
        instruction_3={recipe.instruction_3}
        instruction_4={recipe.instruction_4}
        instruction_5={recipe.instruction_5}
        link={recipe.link}
        serving_size={recipe.serving_size}
        forProfileUser
      />
    );
  });

  const userFavRecipes = filteredSearchForFavRecipes.map((recipe) => {
    return (
      <RecipeListItem
        key={recipe.id}
        state={state}
        title={recipe.title}
        user_name={user.user_name}
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

      <Grid container spacing={1}>
        <Grid item xs={12} align='center'>
          <Button  style = {{width: '20rem', padding:'16px'}} variant="contained" onClick={getFavRecipes}>
            Fav Recipes
          </Button>
          <Button  style = {{width: '20rem', padding:'16px'}} variant="contained" onClick={getUserRecipes}>
            Your Recipes
          </Button>
        </Grid>

        <Grid item xs={12} align='center'>
          <TextField
            type="text"
            style = {{width: '20rem'}}
            onChange={handleSearch}
            value={search}
            placeholder="Search..."
          />
        </Grid>
      </Grid>

      <Typography>Recipes</Typography>
      <div className="recipe-card-container">
        {showFavs}
        {showUserRecipes}
      </div>
      <Footer/>
    </Box>
  );
}
