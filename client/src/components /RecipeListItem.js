import React from 'react';

import "./styles/recipe.scss";



export default function RecipeListItem (props) {

  
  const { title, image_url, prep_time }  = props
  return (
    <div>
      <div>{title}</div>
      <div><img class="recipe-img" src={image_url} alt={title} /></div>
      <div>{prep_time}</div>
    </div>
  )
}