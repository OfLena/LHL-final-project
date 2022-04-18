// import React from 'react';

// import "./styles/recipe.scss";

// export default function RecipeListItem (props) {

//   const { title, image_url, prep_time }  = props

//   return (
//     <div>
//       <div>{title}</div>
//       <div><img class="recipe-img" src={image_url} alt={title} /></div>
//       <div>{prep_time}</div>
//     </div>
//   )
// }

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

import { useState, useEffect } from "react";
import axios from "axios";

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

  const { title, image_url, prep_time, link, serving_size, instruction_1, instruction_2, instruction_3, instruction_4, instruction_5, recipe_id, user_id} = props;

  // console.log("LOGGED IN", user)
  // console.log("ID", recipe_id)

  
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  /* POP OVER */

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  /* HELPERS FOR FAVOURITING FEATURE */

  const [favourite, setFavourite] = useState({});

  function handleOnClick () {
    setFavourite((prev) => ({
      ...prev,
      [`recipe_id`]: `${recipe_id}`,
      [`user_id`]: `${user_id}`
    }))
    axios.post("/favs", favourite)
    .then((all) => {
      console.log(all);
    })
    .catch((err) => {
      console.log("ERR", err);
    });
  }

  console.log(favourite)

  // create function to handle the onClick of the heart
  // 1 change it to red
  // 2 change the state 
  // 3 axios post to server 

  // when it is not in set state ? it should delete the recipe from the database

  return (
    <div className="recipe-card">
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={props.title}
          subheader="September 14, 2016"
        />
        <CardMedia component="img" height="194" image={image_url} alt={title} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography >
        </CardContent>
        <CardActions sx={{ paddingLeft: "17.5%", marginLeft: "auto" }}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon 
              onClick={handleOnClick} 
              color={favourite ? "error" : "grey0"}
            />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>

          {/* POPOVER */}

          <Button
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
          >
            <MenuBookIcon />
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <Typography sx={{ p: 5 }}>{title}</Typography>
          </Popover>

          {/* END POPOVER */}

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
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes
              and peppers, and cook without stirring, until most of the liquid
              is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
              reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is
              just tender, 5 to 7 minutes more. (Discard any mussels that
              don&apos;t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
