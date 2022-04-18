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
import { Container } from "@mui/material";

export default function RecipeCard(props) {
  const { recipes, currentPage, setCurrentPage } = props;

  const findRecipe = props.recipes.map((recipe) => {
    if (recipe.id === currentPage) {
      return (
        <div className="card-container">
          <Card>
            <CardHeader
              title={recipe.title}
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
            />
            <CardMedia
              component="img"
              sx={{ maxWidth: 600 }}
              height="300"
              image={recipe.image_url}
              alt={recipe.title}
            />
          </Card>
          {/* // <Typography>{recipe.prep_time}</Typography>
    // {recipe.ingredient_1}
    // {recipe.ingredient_2}
    // {recipe.ingredient_3}
    // {recipe.ingredient_4}
    // {recipe.ingredient_5}
    // {recipe.ingredient_6}
    // {recipe.ingredient_7}
    // {recipe.ingredient_8}
    // {recipe.ingredient_9}
    // {recipe.ingredient_10}
    // {recipe.ingredient_11}
    // {recipe.ingredient_12}
    // {recipe.ingredient_13}
    // {recipe.ingredient_14}
    // {recipe.ingredient_15}
    // {recipe.ingredient_16}
    // {recipe.ingredient_17}
    // {recipe.ingredient_18}
    // {recipe.ingredient_19}
    // {recipe.ingredient_20}
    // {recipe.measurement_1}
    // {recipe.measurement_2}
    // {recipe.measurement_3}
    // {recipe.measurement_4}
    // {recipe.measurement_5}
    // {recipe.measurement_6}
    // {recipe.measurement_7}
    // {recipe.measurement_8}
    // {recipe.measurement_9}
    // {recipe.measurement_10}
    // {recipe.measurement_11}
    // {recipe.measurement_12}
    // {recipe.measurement_13}
    // {recipe.measurement_14}
    // {recipe.measurement_15}
    // {recipe.measurement_16}
    // {recipe.measurement_17}
    // {recipe.measurement_18}
    // {recipe.measurement_19}
    // {recipe.measurement_20}
    // {recipe.instruction_1}
    // {recipe.instruction_2}
    // {recipe.instruction_3}
    // {recipe.instruction_4}
    // {recipe.instruction_5}
    // {recipe.link}
    // {recipe.serving_size} */}
        </div>
      );
    }
  });

  return <Container>{findRecipe}</Container>;
}
