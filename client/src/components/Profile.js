import React, { useState, useEffect } from "react";

import RecipeListItem from "./RecipeListItem";
import Footer from "./Footer";

import { Box, Typography, Grid, Button, TextField } from "@mui/material";

export default function Profile(props) {
  const { user, state, setState, currentPage, setCurrentPage } = props;

  const [showUserRecipes, setShowUserRecipes] = useState("");
  const [showFavs, setShowFavs] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (showFavs) {
      getFavRecipes();
    } else if (showUserRecipes) {
      getUserRecipes();
    }
    // console.log("STATE.FAVS", state.favs)
  }, [search, state]);


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
  });

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
        setState={setState}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        title={recipe.title}
        // change user_name to avatar
        user_name={user.user_name}
        image_url={recipe.image_url}
        // preptime and serving size to drawer
        prep_time={recipe.prep_time}
        serving_size={recipe.serving_size}
        author={recipe.recipe_user_name}
        avatar={recipe.avatar}
        forProfileUser
      />
    );
  });

  const userFavRecipes = filteredSearchForFavRecipes.map((recipe) => {
    
    
    return (
      <RecipeListItem
        key={recipe.id}
        state={state}
        setState={setState}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        title={recipe.title}
        user_id={user.id}
        recipe_id={recipe.recipe_id}
        // change user_name to avatar
        user_name={user.user_name}
        avatar={recipe.author_avatar}
        author={recipe.author}
        image_url={recipe.image_url}
        prep_time={recipe.prep_time}
        // preptime and serving size to drawer
        serving_size={recipe.serving_size}
        // favourite
        alwaysRed
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
        <Grid item xs={12} align="center">
          <Button
            style={{ width: "20rem", padding: "16px" }}
            variant="contained"
            onClick={getFavRecipes}
          >
            My Fav Recipes
          </Button>
          <Button
            style={{ width: "20rem", padding: "16px" }}
            variant="contained"
            onClick={getUserRecipes}
          >
            My Recipes
          </Button>
        </Grid>

        <Grid item xs={12} align="center">
          <TextField
            type="text"
            style={{ width: "20rem" }}
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
      <Footer />
    </Box>
  );
}
