import React, { useState, useEffect } from "react";

import RecipeListItem from "./RecipeListItem";
import Footer from "./Footer";

import { Box, Grid, Button, TextField, InputAdornment } from "@mui/material";
import ProfileCard from "./ProfileCard";

import LocalDiningIcon from "@mui/icons-material/LocalDining";

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
        user_name={user.user_name}
        image_url={recipe.image_url}
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
        user_name={user.user_name}
        avatar={recipe.author_avatar}
        author={recipe.author}
        image_url={recipe.image_url}
        prep_time={recipe.prep_time}
        serving_size={recipe.serving_size}
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
      <ProfileCard
        user_first={user.first_name}
        user_last={user.last_name}
        user_name={user.user_name}
        email={user.email}
        avatar={user.avatar}
        userFavRecipes={state.favs}
        recipesFromUser={userFilteredRecipes}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} align="center">
          <Button
            style={{ width: "20rem", padding: "16px", marginBottom: "15px" }}
            variant="contained"
            color="yellow"
            onClick={getFavRecipes}
          >
            My Fav Recipes
          </Button>
          <Button
            style={{ width: "20rem", padding: "16px", marginBottom: "15px" }}
            variant="contained"
            color="yellow"
            onClick={getUserRecipes}
          >
            My Recipes
          </Button>
        </Grid>

        {showFavs || showUserRecipes ? (
          <Grid item xs={12} align="center">
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalDiningIcon color="black" />
                  </InputAdornment>
                ),
              }}
              type="text"
              style={{ width: "30rem", marginBottom: "2rem" }}
              onChange={handleSearch}
              value={search}
              placeholder="Search..."
            />
          </Grid>
        ) : null}
      </Grid>

      <Grid container spacing={4} align="center">
        {showFavs}
        {showUserRecipes}
      </Grid>

      <Footer />
    </Box>
  );
}
