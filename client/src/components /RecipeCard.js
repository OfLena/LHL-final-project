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
} from "@mui/material";

import KitchenIcon from "@mui/icons-material/Kitchen";
import ScaleIcon from "@mui/icons-material/Scale";

import Footer from "./Footer";

export default function RecipeCard(props) {
  const { recipes, currentPage, setCurrentPage } = props;

  const findRecipe = recipes.map((recipe, index) => {
    const filteredRecipes = Object.fromEntries(
      Object.entries(recipe).filter(([_, v]) => v)
    );

    const recipePairs = Object.entries(filteredRecipes);

    if (filteredRecipes.id === currentPage) {
      return (
        <Box
          key={index}
          marginTop={"8rem"}
          marginBottom={"2rem"}
          sx={{ p: 2, border: "1px dashed grey", backgroundColor: "#CCA01D" }}
        >
          <Card sx={{ paddingBottom: "2rem", bgcolor: "beige" }}>
            <CardHeader
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
          </Card>

          <Typography variant="h5">
            Prep Time {filteredRecipes.prep_time}
          </Typography>
          <Typography variant="h6">
            Serves {filteredRecipes.serving_size}
          </Typography>

          <Grid container className="map-container">
            <Grid>
              <Typography>Ingredients</Typography>
              {recipePairs.map((value, index) => {
                let ingredient;
                if (value[0].includes("ingredient")) {
                  ingredient = value[1];
                  return (
                    <Grid item key={index}>
                      <KitchenIcon /> {ingredient}
                    </Grid>
                  );
                }
              })}
            </Grid>
            <Grid>
              <Typography>Measurements</Typography>
              {recipePairs.map((value, index) => {
                let measurement;
                if (value[0].includes("measurement")) {
                  measurement = value[1];
                  return (
                    <Grid
                      item
                      key={index}
                      alignSelf="left"
                      
                    >
                      <ScaleIcon /> {measurement}
                    </Grid>
                  );
                }
              })}
            </Grid>

            

            <Grid>
            <Typography>Instructions</Typography>
              {recipePairs.map((value, index) => {
                let instruction;
                if (value[0].includes("instruction")) {
                  instruction = value[1];
                  return (
                    <Grid item key={index}>
                      {instruction}
                    </Grid>
                  );
                }
              })}
            </Grid>
          </Grid>
        </Box>
      );
    }
  });

  return <Container>
    {findRecipe}
    <Footer/>
  </Container>;
}
