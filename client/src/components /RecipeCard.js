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





export default function RecipeCard(props) {
  const { recipes, currentPage, setCurrentPage } = props;

  const findRecipe = recipes.map((recipe, index) => {
    const filteredRecipes = Object.fromEntries(
      Object.entries(recipe).filter(([_, v]) => v)
    );

    const recipePairs = Object.entries(filteredRecipes);

    if (filteredRecipes.id === currentPage) {
      return (
        <Box key={index}
          marginTop={"8rem"}
          marginBottom={"8rem"}
          sx={{ p: 2, border: "1px dashed grey", backgroundColor: "pink" }}
        >
          <Card sx={{ paddingBottom: "2rem" }}>
            <CardHeader
              title={filteredRecipes.title}
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CardMedia
                component="img"
                sx={{ maxWidth: 600 }}
                height="300"
                image={filteredRecipes.image_url}
                alt={filteredRecipes.title}
              />
            </div>
          </Card>

          <Typography>Prep Time {filteredRecipes.prep_time}</Typography>
          <Typography>Serves {filteredRecipes.serving_size}</Typography>
          
          <div className="map-container">
          <div>
              {recipePairs.map((value, index) => {
                let ingredient;
                if (value[0].includes("ingredient")) {
                  ingredient = value[1];
                }
                return <div key={index}  >{ingredient}</div>
              })}
            </div>
              <div>
              {recipePairs.map((value, index) => {
                let measurement;
                if (value[0].includes("measurement")) {
                  measurement = value[1];
                }
                return <div key={index} alignSelf='left'>{measurement}</div>;
              })}
            </div>
            </div>
     

          
            {recipePairs.map((value, index) => {
              let instruction;
              if (value[0].includes("instruction")) {
                instruction = value[1];
              }
              return <div key={index}>{instruction}</div>;
            })}
          
        </Box>
      );
    }
  });

  return <Container>{findRecipe}</Container>;
}
