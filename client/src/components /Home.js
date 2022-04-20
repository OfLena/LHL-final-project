import "./styles/recipe.scss";

import RecipeListItem from "./RecipeListItem";
import Footer from "./Footer";
import { useState } from "react";

import Image from './Potluck_logos/PotLuck-logos.jpeg'

import { CardMedia } from "@mui/material";


const styles = {
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9,
    marginTop:'30'
  }
};


export default function Home(props) {

  const {user, currentPage, setCurrentPage, state, setState} = props;

  const recipes = props.recipes.map(recipe => {
    return (
      <RecipeListItem
      setState={setState}
      state={state}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      key={recipe.id}
      recipe_id={recipe.id}
      title={recipe.title}
      user_id={user.id}
      user_name={user.user_name}
      image_url={recipe.image_url}
      prep_time={recipe.prep_time}
      serving_size={recipe.serving_size}
      />
    );
  });

  return (
    
    <div className="recipe-container">
      {/* <img className="cover-img" src="https://cdn.stocksnap.io/img-thumbs/960w/pizza-wine_IJESKJTYB6.jpg"></img> */}
      <CardMedia
        image={require('./Potluck_logos/PotLuck-logos.jpeg')} // require image
        title="Contemplative Reptile"
        style={styles.media} // specify styles
      />
      {/* <div className="centered">Bring Out Your Inner Chef</div> */}
      <div className="recipe-card-container">
        {recipes}
      </div>
      <Footer/>
    </div>
    
  );
}
