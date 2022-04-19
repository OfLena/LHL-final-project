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

  const findRecipe = recipes.map((recipe) => {
    // const recipePairs = Object.entries(recipe);
    // console.log('recipes pairs--->', recipePairs)

    const recipePairs = Object.fromEntries(
      Object.entries(recipe).filter(([_, v]) => v != null)
    );

    const validRecipePairs = Object.entries(recipePairs);

    if (recipe.id === currentPage) {
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

          {validRecipePairs.map((pair, idx) => {
            console.log("validRecipePairs", validRecipePairs);
            let ingredient;
            if (pair[0].includes("ingredient")) {
              ingredient = pair[1];
            }
            return (
              
              <Grid item xs={6} key={idx}>
                <Paper>{ingredient}</Paper>
              </Grid>
              
            );
          })}
          
        </div>
      );
    }
  });

  return <Container>{findRecipe}</Container>;
}

// return (
//   <Container>
//     <Card>
//       <CardHeader
//         title={recipe.title}
//         avatar={
//           <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//             R
//           </Avatar>
//         }
//       />
//       <Grid alignItems="center">
//         <CardMedia
//           component="img"
//           sx={{ maxWidth: 600 }}
//           height="300"
//           image={recipe.image_url}
//           alt={recipe.title}
//         />
//       </Grid>
//     </Card>
//     <Typography>{recipe.prep_time}</Typography>

// <Grid item xs={6}>
// {recipe.ingredient_1} {recipe.measurement_1}
// </Grid>
// <Grid item xs={6}>
// {recipe.ingredient_2} {recipe.measurement_2}
// </Grid>
// <Grid item xs={6}>
// {recipe.ingredient_3} {recipe.measurement_3}
// </Grid>
// <Grid item xs={6}>
// {recipe.ingredient_4} {recipe.measurement_4}
// </Grid>
// <Grid item xs={6}>
// {recipe.ingredient_5} {recipe.measurement_5}
// </Grid>
// <Grid item xs={6}>
// {recipe.ingredient_6} {recipe.measurement_6}
// </Grid>
// <Grid item xs={6}>
// {recipe.ingredient_7} {recipe.measurement_7}
// </Grid>
// <Grid item xs={6}>
// {recipe.ingredient_8} {recipe.measurement_8}
// </Grid>
// <Grid item xs={6}>
// {recipe.ingredient_9} {recipe.measurement_9}
// </Grid>
// <Grid item>
// {recipe.ingredient_10} {recipe.measurement_10}
// </Grid>
// <Grid item xs={6}>
// {recipe.ingredient_11} {recipe.measurement_11}
// </Grid>
// <Grid item xs={6}>
// {recipe.ingredient_12} {recipe.measurement_12}
// </Grid>
// <Grid item xs={6}>
// {recipe.ingredient_13} {recipe.measurement_13}
// </Grid>
// <Grid item xs={6}>
// {recipe.ingredient_14} {recipe.measurement_14}
// </Grid>
// <Grid item xs={6}>
// {recipe.ingredient_15} {recipe.measurement_15}
// </Grid>
// <Grid item xs={6}>
// {recipe.ingredient_16} {recipe.measurement_16}
// </Grid>
// <Grid item xs={6}>
// {recipe.ingredient_17} {recipe.measurement_17}
// </Grid>
// <Grid item xs={6}>
// {recipe.ingredient_18} {recipe.measurement_18}
// </Grid>
// <Grid item xs={6}>
// {recipe.ingredient_19} {recipe.measurement_19}
// </Grid>
// <Grid item xs={6}>
// {recipe.ingredient_20} {recipe.measurement_20}
// </Grid>
// {/* <Grid item xs={6}>
// {recipe.instruction_1}
// </Grid>
// <Grid item xs={6}>
// {recipe.instruction_2}
// </Grid>
// <Grid item xs={6}>
// {recipe.instruction_3}
// </Grid>
// <Grid item xs={6}>
// {recipe.instruction_4}
// </Grid>
// <Grid item xs={6}>
// {recipe.instruction_5}
// </Grid>

// {recipe.link}
// {recipe.serving_size} */}
