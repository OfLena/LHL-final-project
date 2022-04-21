import React, { useEffect } from 'react';


import {
  Container,
  Grid,
  Avatar,
  Box,
  CardMedia,
  CardHeader,
  Card,
  FormControlLabel,
} from "@mui/material";



import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import ScaleIcon from "@mui/icons-material/Scale";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";


import Footer from "./Footer";
import CommentList from "./CommentList";



export default function RecipeCard(props) {
  const { recipes, currentPage, comments, state, setState } = props;




  // Map Over All Recipes in Database
  const findRecipe = recipes.map((recipe, index) => {
    // Filter Out All Key/Value Pairs where the Value is Falsey
    const filteredRecipes = Object.fromEntries(
      Object.entries(recipe).filter(([_, v]) => v)
    );

    //Return Array of All filteredRecipes
    const recipePairs = Object.entries(filteredRecipes);

    //If the recipe ID matches the CurrentPage state (which is set to the recipe_id that the user clicks on home page)
    if (filteredRecipes.id === currentPage) {
      return (
        <Box
          key={index}
          marginTop={"8rem"}
          marginBottom={"2rem"}  
          sx={{ p: 2, border: "1px solid black" }}
        >
          <Card sx={{ paddingBottom: "2rem" }}>
            <CardHeader
              titleTypographyProps={{ variant: "h4" }}
              title={filteredRecipes.title}
              avatar={
                <Avatar sx={{ bgcolor: "black" }} aria-label="recipe">
                  R
                </Avatar>
              }
            />
            <div              
              style={{ display: "flex", justifyContent: "center" }}
            >
              <CardMedia
                component="img"
                sx={{ maxWidth: 600, border: "1px solid black" }}
                height="300"
                image={filteredRecipes.image_url}
                alt={filteredRecipes.title}
                
              />
            </div>
            <Card
              align={"center"}
              sx={{
                padding: "1rem 0rem 1rem 0rem",
                marginLeft: "2rem",
                marginRight: "2rem",
                
                marginTop: "2rem",
              }}
            >
              {recipePairs.map((value, index) => {
                const test = [
                  "vegan",
                  "vegetarian",
                  "keto",
                  "breakfast",
                  "lunch",
                  "dinner",
                  "dairy_free",
                  "gluten_free",
                ];
                let val;
                if (test.includes(value[0])) {
                  val = value[0].replace("_", " ");
                  const upperCaseVal =
                    val.charAt(0).toUpperCase() + val.slice(1);

                  return (
                    <FormControlLabel
                      control={<CheckCircleOutlineIcon />}
                      key={index}
                      label={upperCaseVal}
                      labelPlacement="top"
                      value={upperCaseVal}
                      name="tag"
                      color="yellow"
                    />
                  );
                }
              })}
            </Card>
          </Card>
          <Card
            sx={{
              padding: "2rem 0rem 2rem 0rem",
              
              marginTop: "2rem",
            }}
          >
            <CardHeader
              title={"Preparation Time " + filteredRecipes.prep_time}
              subheader={"Serves " + filteredRecipes.serving_size}
            />

            <Grid container justifyContent={"center"}>
              <Card
                sx={{
                  padding: "0.5rem 4rem 2rem 4rem",
                  
                  marginTop: "2rem",
                }}
              >
                <CardHeader title="Measurements" />
                {recipePairs.map((value, index) => {
                  let measurement;
                  if (value[0].includes("measurement")) {
                    measurement = value[1];
                    return (
                      <Grid item key={index} alignSelf="left">
                        <ScaleIcon /> {measurement}
                      </Grid>
                    );
                  }
                })}
              </Card>

              <Card
                sx={{
                  padding: "0.5rem 4rem 2rem 4rem",
                  
                  marginTop: "2rem",
                }}
              >
                <CardHeader title="Ingredients" />
                {recipePairs.map((value, index) => {
                  let ingredient;
                  if (value[0].includes("ingredient")) {
                    ingredient = value[1];
                    return (
                      <Grid item key={index}>
                        <DinnerDiningIcon /> {ingredient}
                      </Grid>
                    );
                  }
                })}
              </Card>
            </Grid>

            <Grid>
              <Card
                sx={{
                  padding: "0.5rem 4rem 2rem 4rem",
                  
                  margin: "2rem 2rem 0rem 2rem",
                }}
              >
                <CardHeader title="Instructions" />
                {recipePairs.map((value, index) => {
                  let instruction;
                  if (value[0].includes("instruction")) {
                    instruction = value[1];
                    return (
                      <Grid item key={index}>
                        <MenuBookIcon /> {instruction}
                      </Grid>
                    );
                  }
                })}
              </Card>
            </Grid>
            <CommentList comments={comments} currentPage={currentPage} state={state} setState={setState} />
          </Card>
        </Box>
      );
    }
  });

  return (
    <Container>
      {findRecipe}
      <Footer />
    </Container>
  );
}
