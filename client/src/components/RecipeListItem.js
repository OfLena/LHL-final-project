import * as React from "react";

import { styled } from "@mui/material/styles";

import FavoriteIcon from "@mui/icons-material/Favorite";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import {
  Button,
  Grid,
  Link as MUILink,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Collapse,
  IconButton,
} from "@mui/material";

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
    forProfileUser,
    alwaysRed,
    prep_time,
    serving_size,
    avatar,
    author,
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
    const removeFavRecipe = newFavsARR.filter((fav) => {
      return fav.recipe_id !== recipe_id.toString();
    });

    return removeFavRecipe;
  };

  // helper function of heart on click
  function handleOnClick() {
    // changes state of fav for rendering checked heart

    if (!favourite) {
      setFavourite(true);

      axios
        .post("/favs", {
          [`recipe_id`]: recipe_id,
          [`user_id`]: user_id,
          [`author_avatar`]: avatar,
          [`author`]: author,
        })

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
                [`author_avatar`]: avatar,
                [`author`]: author,
              },
            ],
          }));
        })
        .catch((err) => {
          console.log("ERR", err);
        });
    } else {
      setFavourite(false);
      axios
        .post("/favs/delete", {
          recipe_id: `${recipe_id}`,
          user_id: `${user_id}`,
        })
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
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <div className="recipe-card">
        <Card
          sx={{
            maxWidth: 345,
            boxShadow: 10,
            border: "3px solid black",
            borderRadius: "7%",
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                src={`http://localhost:8080/images/${avatar}`}
                aria-label="recipe"
                sx={{ padding: ".6rem", bgcolor: "#FFAD10" }}
              />
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={props.title}
            subheader={`Author: ${author}`}
          />
          <MUILink onClick={sendRecipeID} href="/recipes">
            <CardMedia
              component="img"
              to={"/recipes"}
              height="194"
              image={"http://localhost:8080/images/" + image_url}
              alt={title}
              sx={{
                borderTop: "3px solid black",
                borderBottom: "3px solid black",
              }}
            />
          </MUILink>
          <CardContent sx={{ padding: "0" }}>
            <Typography variant="body2" color="text.secondary" />
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            <IconButton aria-label="add to favorites" onClick={handleOnClick}>
              {forProfileUser ? null : (
                <FavoriteIcon
                  fontSize="large"
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
                fontSize="large"
                color="yellow"
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
                fontSize="large"
                color="error"
                variant="outlined"
                className="pull-right btn btn-default"
                onClick={handleClickDelete}
              >
                {" "}
                Delete
              </Button>
            )}
            {!forProfileUser && (
              <Button
                fontSize="large"
                variant="outlined"
                component={Link}
                to={"/recipes"}
                sx={{
                  borderRadius: "50%",
                  "&:hover": {
                    backgroundColor: "black",
                    borderColor: "yellow",
                    boxShadow: "none",
                  },
                }}
              >
                <MenuBookIcon onClick={sendRecipeID} />
              </Button>
            )}
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
            </CardContent>
          </Collapse>
        </Card>
      </div>
    </Grid>
  );
}
