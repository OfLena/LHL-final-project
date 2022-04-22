import * as React from "react";

import { styled } from "@mui/material/styles";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import { Button, Grid } from "@mui/material";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeListItem(props) {
  /* RECIPE CARD */
  const {
    title,
    image_url,
    recipe_id,
    user_id,
    setCurrentPage,
    state,
    setState,
    user_name,
    forProfileUser,
    alwaysRed,
    prep_time,
    serving_size,
  } = props;

  const [expanded, setExpanded] = useState(false);
  const [favourite, setFavourite] = useState();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function sendRecipeID() {
    setCurrentPage(recipe_id);
  }

  /* FAVOURITING FEATURE */
  useEffect(() => {
    const favsArr = state.favs;
    const fav = favsArr.find(
      (fav) => fav.favs_user_id === user_id && recipe_id === fav.recipe_id
    );

    setFavourite(!!fav);
  }, []);

  // helper function for removing fav for state (to be used in handleOnClick function)
  const removeFav = function () {
    const newFavsARR = state.favs;
    const removeFavRecipe = newFavsARR.filter((fav) =>
      fav.recipe_id !== recipe_id ? fav : null
    );

    return removeFavRecipe;
  };

  // helper function of heart on click
  function handleOnClick() {
    // changes state of fav for rendering checked heart
    if (!favourite) {
      setFavourite(true);
      console.log('FAVOURITE INSIDE IF', favourite)
      return Promise.all([
        axios.post("/favs", {
          [`recipe_id`]: recipe_id,
          [`user_id`]: user_id,
        }),
      ])
      .then((all) => {
        setState((prev) => ({
        ...prev,
            favs: [
              ...state.favs,
              {
                [`recipe_id`]: recipe_id,
                [`favs_user_id`]: user_id,
                [`title`]: `${title}`,
                [`image_url`]: image_url,
              },
            ],
          }));
        })
        .catch((err) => {
          console.log("ERR", err);
        });
    } else {
      //axios post to delete
      setFavourite(false);
      console.log('FAVOURITE', favourite)
      return Promise.all([
        axios.post("/favs/delete", {
          [`recipe_id`]: `${recipe_id}`,
          [`user_id`]: `${user_id}`,
        }),
      ])
      .then(() => {
          setState((prev) => ({ ...prev, favs: removeFav() }));
        })
        .catch((err) => {
          console.log("ERR", err);
        });
    }
  }

  /* DELETE FEATURE FOR PROFILE */
  const removeRecipe = function () {
    const newRecipeARR = state.filtered_recipes;
    const removeRecipeArr = newRecipeARR.filter((recipe) =>
      recipe.id !== recipe_id ? true : false
    );

    return removeRecipeArr;
  };

  // onclick for delete button
  function handleClickDelete() {
    return Promise.all([
      axios.post("/recipes/delete", {
        [`recipe_id`]: `${recipe_id}`,
        [`user_id`]: `${user_id}`,
      }),
    ])
      .then(() => {
        setState((prev) => ({ ...prev, filtered_recipes: removeRecipe() }));
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }

  /* EDITING FEATURE */

  function handleClickEdit() {
    setCurrentPage(recipe_id);
  }

  return (
    <Grid item xs={12} md={6} lg={4}>
      <div className="recipe-card">
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "#CCA01D" }} aria-label="recipe">
                {user_name}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={props.title}
            subheader={`Author: ${user_name}`}
          />
          <CardMedia
            component="img"
            height="194"
            image={"http://localhost:8080/images/" + image_url}
            alt={title}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary" />
          </CardContent>
          <CardActions sx={{ paddingLeft: "17.5%", marginLeft: "auto" }}>
            <IconButton aria-label="add to favorites" onClick={handleOnClick}>
              {forProfileUser ? null : (
                <FavoriteIcon
                  color={
                    favourite === true
                    ? "error"
                    : "grey0" && alwaysRed
                    ? "error"
                    : "grey0"
                  }
                />
              )}
            </IconButton>

            {forProfileUser && (
              <Button
                color="black"
                variant="outlined"
                className="pull-right btn btn-default"
                component={Link}
                to={"/edit_recipe_form"}
                onClick={handleClickEdit}
              >
                {" "}
                Edit
              </Button>
            )}
            {forProfileUser && (
              <Button
                color="black"
                variant="outlined"
                className="pull-right btn btn-default"
                onClick={handleClickDelete}
              >
                {" "}
                Delete
              </Button>
            )}

            <Button
              variant="contained"
              component={Link}
              to={"/recipes"}
              sx={{ bgcolor: "black" }}
            >
              <MenuBookIcon onClick={sendRecipeID} />
            </Button>

            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Prep Time: {prep_time}</Typography>
              <Typography paragraph>Serves: {serving_size}</Typography>
              <Typography paragraph />
              <Typography paragraph />
            </CardContent>
          </Collapse>
        </Card>
      </div>
    </Grid>
  );
}
