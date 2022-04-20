import "./styles/recipecard.scss";

import * as React from "react";

import { red } from "@mui/material/colors";

import {
  Container,
  Grid,
  Typography,
  Paper,
  Avatar,
  Box,
  TextField,
  CardMedia,
  CardHeader,
  Card,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import ScaleIcon from "@mui/icons-material/Scale";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import Footer from "./Footer";

export default function RecipeCard(props) {
  const { recipes, currentPage, setCurrentPage } = props;

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
          sx={{ p: 2, border: "1px solid black", backgroundColor: "#CCA01D" }}
        >
          <Card sx={{ paddingBottom: "2rem", bgcolor: "beige" }}>
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
              className="top-card"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <CardMedia
                component="img"
                sx={{ maxWidth: 600 }}
                height="300"
                image={filteredRecipes.image_url}
                alt={filteredRecipes.title}
              />
            </div>
            <div>
              {/* {recipePairs.map((value, index) => {
                    let test = ['vegan', 'vegetarian', 'breakfast', 'lunch', 'dinner']
                    let tag;
                    test.forEach((element) => {
                      if (value[0] === element) {
                        tag = element;
                        console.log('TAG--->', typeof tag)
                        console.log('ELEMENT--->', element)
                        console.log('VALUE --->', value[0])
                 
                      
                      return   (            
                      <FormControlLabel
                        control= {<Checkbox sx={{
                        '&.Mui-checked': {
                          color: '#CCA01D',
                        }}}
                        defaultChecked
                        />}
                        
                        label={`${tag}`}
                        labelPlacement="top"
                        value={`${tag}`}
                        name="tag"
                        color="yellow"
                      />
                      )
                    }
                  })
                      
                    }
                )} */}
              {recipePairs.map((value, index) => {
                let vegan;
                if (value[0].includes("vegan")) {
                  vegan = "Vegan";
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            "&.Mui-checked": {
                              color: "#CCA01D",
                            },
                          }}
                          defaultChecked
                        />
                      }
                      label={vegan}
                      labelPlacement="top"
                      value={vegan}
                      name="tag"
                      color="yellow"
                    />
                  );
                }
              })}
            </div>
          </Card>
          <Card
            sx={{
              padding: "2rem 0rem 2rem 0rem",
              bgcolor: "beige",
              marginTop: "2rem",
            }}
          >
            <CardHeader
              title={"Preparation Time " + filteredRecipes.prep_time}
              subtitle={"Serves " + filteredRecipes.serving_size}
            />

            <Grid container justifyContent={"center"}>
              <Card
                sx={{
                  padding: "0.5rem 4rem 2rem 4rem",
                  bgcolor: "beige",
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
              <Card
                sx={{
                  padding: "0.5rem 4rem 2rem 4rem",
                  bgcolor: "beige",
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
            </Grid>

            <Grid>
              <Card
                sx={{
                  padding: "0.5rem 4rem 2rem 4rem",
                  bgcolor: "beige",
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
