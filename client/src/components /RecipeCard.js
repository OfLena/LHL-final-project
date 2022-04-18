import "./styles/recipecard.scss";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "@mui/material/Popover";
import { Button } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Container, Grid, Paper } from "@mui/material";
import { ClassNames } from "@emotion/react";

export default function RecipeCard(props) {
  const { recipes, currentPage, setCurrentPage } = props;

  const findRecipe = props.recipes.map((recipe) => {
    const recipePairs = Object.entries(recipe);

    if (recipe.id === currentPage) {
      recipePairs.map((pair) => {
        // console.log('PAIR', pair)
        console.log("PAIR0", pair[0]);
        console.log("PAIR1", pair[1]);
      });

      // {console.log('VALUES',Object.values(recipe))}
      // {console.log('ENTRIES',Object.entries(recipe))}

      // console.log('PAIR', pair[0], pair[1])

      return (
        <div>
          <Card>
            <CardHeader
              title={recipe.title}
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
            />
            <Grid alignItems="center">
              <CardMedia
                component="img"
                sx={{ maxWidth: 600 }}
                height="300"
                image={recipe.image_url}
                alt={recipe.title}
              />
            </Grid>
          </Card>
          <Typography>{recipe.prep_time}</Typography>

         
            {recipePairs.map((pair, idx) => {
              return (
               <Grid container justifyContent="space-evenly" alignItems="center" key={idx}>
      
                <Grid item xs={6}>
                  <Paper>{pair[0]}</Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper>{pair[1]}</Paper>
                </Grid>
              </Grid>
              )
              
            })}
{/* 
            <Grid>
              {recipe.ingredient_2} {recipe.measurement_2}
            </Grid>
            <Grid item xs={6}>
              {recipe.ingredient_3} {recipe.measurement_3}
            </Grid>
            <Grid item xs={6}>
              {recipe.ingredient_4} {recipe.measurement_4}
            </Grid>
            <Grid item xs={6}>
              {recipe.ingredient_5} {recipe.measurement_5}
            </Grid>
            <Grid item xs={6}>
              {recipe.ingredient_6} {recipe.measurement_6}
            </Grid>
            <Grid item xs={6}>
              {recipe.ingredient_7} {recipe.measurement_7}
            </Grid>
            <Grid item xs={6}>
              {recipe.ingredient_8} {recipe.measurement_8}
            </Grid>
            <Grid item xs={6}>
              {recipe.ingredient_9} {recipe.measurement_9}
            </Grid>
            <Grid item xs={6}>
              {recipe.ingredient_10} {recipe.measurement_10}
            </Grid>
            <Grid item xs={6}>
              {recipe.ingredient_11} {recipe.measurement_11}
            </Grid>
            <Grid item xs={6}>
              {recipe.ingredient_12} {recipe.measurement_12}
            </Grid>
            <Grid item xs={6}>
              {recipe.ingredient_13} {recipe.measurement_13}
            </Grid>
            <Grid item xs={6}>
              {recipe.ingredient_14} {recipe.measurement_14}
            </Grid>
            <Grid item xs={6}>
              {recipe.ingredient_15} {recipe.measurement_15}
            </Grid>
            <Grid item xs={6}>
              {recipe.ingredient_16} {recipe.measurement_16}
            </Grid>
            <Grid item xs={6}>
              {recipe.ingredient_17} {recipe.measurement_17}
            </Grid>
            <Grid item xs={6}>
              {recipe.ingredient_18} {recipe.measurement_18}
            </Grid>
            <Grid item xs={6}>
              {recipe.ingredient_19} {recipe.measurement_19}
            </Grid>
            <Grid item xs={6}>
              {recipe.ingredient_20} {recipe.measurement_20}
            </Grid>
          </Grid>

          {recipe.instruction_1}
          {recipe.instruction_2}
          {recipe.instruction_3}
          {recipe.instruction_4}
          {recipe.instruction_5}
          {recipe.link}
          {recipe.serving_size} */}
        </div>
      );
    }
  });

  return <Container>{findRecipe}</Container>;
}
