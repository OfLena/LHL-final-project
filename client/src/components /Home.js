import "./styles/recipe.scss";

import RecipeListItem from "./RecipeListItem";
import Footer from "./Footer";
import { useState } from "react";


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
      image_url={recipe.image_url}
      prep_time={recipe.prep_time}
      serving_size={recipe.serving_size}
      />
    );
  });

  return (
    
    <div className="recipe-container">
      <img className="cover-img" src="https://cdn.stocksnap.io/img-thumbs/960w/pizza-wine_IJESKJTYB6.jpg"></img>
      <div className="centered">Bring Out Your Inner Chef</div>
      <div className="recipe-card-container">
        {recipes}
      </div>
      <Footer/>
    </div>
    
  );
}
