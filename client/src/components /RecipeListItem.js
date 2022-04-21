
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
import { Button, ButtonGroup } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Grid } from "@mui/material";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

// import "./styles/recipe.scss";

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
  
  const { title, image_url, recipe_id, user_id, currentPage, setCurrentPage, state, setState, user_name, forProfileUser, alwaysRed} = props;

   // add editable in props
  
  const [expanded, setExpanded] = useState(false);
  const [favourite, setFavourite] = useState();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  /* FAVOURITING FEATURE */

  useEffect(() => { 
  
    const favsArr = state.favs
     const fav = favsArr.find((fav) => (
        fav.favs_user_id === user_id  && recipe_id === fav.recipe_id))

        setFavourite(!!fav)

  }, [] );
    
  // helper function for removing fav for state (to be used in handleOnClick function)
  const removeFav = function () {
    const newFavsARR = state.favs

    const removeFavRecipe = newFavsARR.filter((fav) => (
     (fav.recipe_id) !== recipe_id ? fav : null))

  return removeFavRecipe

  }

  // helper function of heart on click
  function handleOnClick () {
    // if heart is grey, send post request to insert fav and set heart to red
   if (!favourite) {
     setFavourite(true)
     return Promise.all([
      axios.post("/favs", {
          [`recipe_id`]: recipe_id,
          [`user_id`]: user_id
        })
      ]).then((all) => {
        setState((prev) => ({ ...prev, favs: [...state.favs, {
          [`recipe_id`]: recipe_id,
          [`favs_user_id`]: user_id,
          [`title`]: `${title}`,
          [`image_url`]: image_url
        }]}))
      })
      .catch((err) => {
        console.log("ERR", err);
      });
      // if heart is red, send post request to delete fav and set heart back to grey
    } 
    else {
      //axios post to delete
      setFavourite(false)
      return Promise.all([
        console.log('USERID', user_id),
        console.log("RECIPE ID", recipe_id),
        axios.post("/favs/delete", {
            [`recipe_id`]: `${recipe_id}`,
            [`user_id`]: `${user_id}`
          })
        ]).then(() => {
          setState((prev) => ({...prev, favs: removeFav()}))
        })
        .catch((err) => {
          console.log("ERR", err);
      });
    }
  }

  function sendRecipeID () {
    setCurrentPage(recipe_id)
  };

  /* DELETE FEATURE FOR PROFILE */
  const removeRecipe = function () {
    const newRecipeARR = state.filtered_recipes

    // console.log("1", newRecipeARR)

    const removeRecipeArr = newRecipeARR.filter((recipe) => (
     (recipe.id !== recipe_id) ? true : false))

    // console.log("2", removeRecipeArr)
    return removeRecipeArr
  }

  // onclick for delete button
  function handleClickDelete () {
    // console.log("RECIPE ID", recipe_id)
    // console.log("USER ID", user_id)

    return Promise.all([
      axios.post("/recipes/delete", {
          [`recipe_id`]: `${recipe_id}`,
          [`user_id`]: `${user_id}`
        })
      ]).then(() => {
        setState((prev) => ({...prev, filtered_recipes: removeRecipe()}))
      })
      .catch((err) => {
        console.log("ERR", err);
    });
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
        <CardMedia component="img" height="194" image={image_url} alt={title} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
           
          </Typography >
        </CardContent>
        <CardActions sx={{ paddingLeft: "17.5%", marginLeft: "auto" }}>
          <IconButton aria-label="add to favorites">
            {forProfileUser ?
              null
            : 
              <FavoriteIcon 
                onClick={handleOnClick} 
                color={favourite === true ? 'error' : 'grey0' && alwaysRed ? 'error' : 'grey0'}
              />
            }
          </IconButton>
          {/* <IconButton aria-label="share">  */}
            {/* <ShareIcon /> */}
          {/* </IconButton> */}

          {/* POPOVER */}
  
          {forProfileUser && 
            <Button
              color="black"
              variant="outlined"
              className="pull-right btn btn-default"
            > Edit
          </Button>} 
          {forProfileUser &&        
            <Button
              color="black"
              variant="outlined"
              className="pull-right btn btn-default"
              onClick={handleClickDelete}
              > Delete
          </Button>} 
         

          <Button
            // aria-describedby={id}
            variant="contained"
            component={Link} to={'/recipes'}
            sx={{ bgcolor: "black" }} 
            onClick={sendRecipeID}
          >
             <MenuBookIcon
            
            /> 
            
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
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
             
            </Typography>
            <Typography paragraph>
              
         
            </Typography>
            <Typography paragraph>
            
            </Typography>
            <Typography>
            
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
    </Grid>
  );
}
