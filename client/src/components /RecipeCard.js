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
          
          <Grid container>
            <Grid item xs={6}>
              {recipePairs.map((value, index) => {
                let ingredient;
                if (value[0].includes("ingredient")) {
                  ingredient = value[1];
                }
                return <Paper key={index}>{ingredient}</Paper>
              })}
            </Grid>
            <Grid item xs={6}>
              {recipePairs.map((value, index) => {
                let measurement;
                if (value[0].includes("measurement")) {
                  measurement = value[1];
                }
                return <div key={index}>{measurement}</div>;
              })}
            </Grid>
          </Grid>

          <Grid container>
            {recipePairs.map((value, index) => {
              let instruction;
              if (value[0].includes("instruction")) {
                instruction = value[1];
              }
              return <div key={index}>{instruction}</div>;
            })}
          </Grid>
        </Box>
      );
    }
  });

  return <Container>{findRecipe}</Container>;
}

{
  /* <Grid container spacing={0}>
<Grid item xs={6} style={{background: 'pink'}}>
  {recipePairs.ingredient_1}
</Grid>
<Grid item xs={6} style={{background: 'pink'}}>
  {recipePairs.measurement_1}
</Grid>

<Grid item xs={6}>
  
  <TextField
disabled
id="outlined-disabled"

defaultValue={recipePairs.ingredient_2}
/>
</Grid>
<Grid item xs={6}>
  <Paper>{recipePairs.measurement_2}</Paper>
</Grid>

<Grid item xs={6}>
  <Paper>{recipePairs.ingredient_3}</Paper>
</Grid>
<Grid item xs={6}>
  <Paper>{recipePairs.measurement_3}</Paper>
</Grid>

<Grid item xs={6}>
  <Paper>{recipePairs.ingredient_4}</Paper>
</Grid>
<Grid item xs={6}>
  <Paper>{recipePairs.measurement_4}</Paper>
</Grid>

<Grid item xs={6}>
  <Paper>{recipePairs.ingredient_5}</Paper>
</Grid>
<Grid item xs={6}>
  <Paper>{recipePairs.measurement_5}</Paper>
</Grid>

<Grid item xs={6}>
  <Paper>{recipePairs.ingredient_6}</Paper>
</Grid>
<Grid item xs={6}>
  <Paper>{recipePairs.measurement_6}</Paper>
</Grid>

<Grid item xs={6}>
  <Paper>{recipePairs.ingredient_7}</Paper>
</Grid>
<Grid item xs={6}>
  <Paper>{recipePairs.measurement_7}</Paper>
</Grid>

<Grid item xs={6}>
  <Paper>{recipePairs.ingredient_8}</Paper>
</Grid>
<Grid item xs={6}>
  <Paper>{recipePairs.measurement_8}</Paper>
</Grid>

<Grid item xs={6}>
  <Paper>{recipePairs.ingredient_9}</Paper>
</Grid>
<Grid item xs={6}>
  <Paper>{recipePairs.measurement_9}</Paper>
</Grid>

<Grid item xs={6}>
  <Paper>{recipePairs.ingredient_10}</Paper>
</Grid>
<Grid item xs={6}>
  <Paper>{recipePairs.measurement_10}</Paper>
</Grid>

<Grid item xs={6}>
  <Paper>{recipePairs.ingredient_11}</Paper>
</Grid>
<Grid item xs={6}>
  <Paper>{recipePairs.measurement_11}</Paper>
</Grid>

<Grid item xs={6}>
  <Paper>{recipePairs.ingredient_12}</Paper>
</Grid>
<Grid item xs={6}>
  <Paper>{recipePairs.measurement_12}</Paper>
</Grid>

<Grid item xs={6}>
  <Paper>{recipePairs.ingredient_12}</Paper>
</Grid>
<Grid item xs={6}>
  <Paper>{recipePairs.measurement_12}</Paper>
</Grid>

<Grid item xs={6}>
  <Paper>{recipePairs.ingredient_13}</Paper>
</Grid>
<Grid item xs={6}>
  <Paper>{recipePairs.measurement_13}</Paper>
</Grid>

<Grid item xs={6}>
  <Paper>{recipePairs.ingredient_14}</Paper>
</Grid>
<Grid item xs={6}>
  <Paper>{recipePairs.measurement_14}</Paper>
</Grid>

<Grid item xs={6}>
  <Paper>{recipePairs.ingredient_15}</Paper>
</Grid>
<Grid item xs={6}>
  <Paper>{recipePairs.measurement_15}</Paper>
</Grid>

<Grid item xs={6}>
  <Paper>{recipePairs.ingredient_16}</Paper>
</Grid>
<Grid item xs={6}>
  <Paper>{recipePairs.measurement_16}</Paper>
</Grid>

<Grid item xs={6}>
  <Paper>{recipePairs.ingredient_17}</Paper>
</Grid>
<Grid item xs={6}>
  <Paper>{recipePairs.measurement_17}</Paper>
</Grid>

<Grid item xs={6}>
  <Paper>{recipePairs.ingredient_18}</Paper>
</Grid>
<Grid item xs={6}>
  <Paper>{recipePairs.measurement_18}</Paper>
</Grid>

<Grid item xs={6}>
  <Paper>{recipePairs.ingredient_19}</Paper>
</Grid>
<Grid item xs={6}>
  <Paper>{recipePairs.measurement_19}</Paper>
</Grid>

<Grid item xs={6}>
  <Paper>{recipePairs.ingredient_20}</Paper>
</Grid>
<Grid item xs={6}>
  <Paper>{recipePairs.measurement_20}</Paper>
</Grid>
<Grid item xs={6} style={{background: 'pink'}}>
  {recipePairs.instruction_1}
</Grid>
<Grid item xs={6} style={{background: 'pink'}}>
  {recipePairs.instruction_2}
</Grid>
<Grid item xs={6} style={{background: 'pink'}}>
  {recipePairs.instruction_3}
</Grid>
<Grid item xs={6} style={{background: 'pink'}}>
  {recipePairs.instruction_4}
</Grid>
<Grid item xs={6} style={{background: 'pink'}}>
  {recipePairs.instruction_5}
</Grid>
<Grid item xs={6} style={{background: 'pink'}}>
  {recipePairs.vegan}
</Grid>
<Grid item xs={6} style={{background: 'pink'}}>
  {recipePairs.vegetarian}
</Grid>
<Grid item xs={6} style={{background: 'pink'}}>
  {recipePairs.keto}
</Grid>
<Grid item xs={6} style={{background: 'pink'}}>
  {recipePairs.breakfast}
</Grid>
<Grid item xs={6} style={{background: 'pink'}}>
  {recipePairs.lunch}
</Grid>
<Grid item xs={6} style={{background: 'pink'}}>
  {recipePairs.dinner}
</Grid>
<Grid item xs={6} style={{background: 'pink'}}>
  {recipePairs.gluten_free}
</Grid>
<Grid item xs={6} style={{background: 'pink'}}>
  {recipePairs.dairy_free}
</Grid>
</Grid> */
}
