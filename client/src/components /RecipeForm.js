import React, { useState, useEffect } from "react";
import axios from 'axios';

import Button from "./Button";


export default function RecipeForm(props) {

  
  const [recipe, setRecipe] = useState({});

  // useEffect(() => {
  //   Promise.all([
  //     axios.post("/recipes", recipe),
  //   ]).then((all) => {
  //     console.log(all)
  //   })
  //   .catch(err => console.log("ERR", err))
  // }, [setRecipe]);

  function putRecipe() {
      axios.post("/recipes", recipe)
    .then((all) => {
      console.log(all)
    })
    .catch(err => console.log("ERR", err))
  }
 

   return (
     
    <section>
      
      <form 
      onSubmit={e => e.preventDefault()}
     autoComplete="off">
    
        <input name="image_url" placeholder="Upload Photo" onChange={event => setRecipe((prev) => ({...prev, img_url: event.target.value}))}/>

        <input name="title" placeholder="Title" onChange={event => setRecipe((prev) => ({...prev, title: event.target.value}))}/>
        <input name="prep_time" placeholder="Cook Time" onChange={event => setRecipe((prev) => ({...prev, prep_time: event.target.value}))}/>
        <input name="serves" placeholder="E.g. 30 minutes" onChange={event => setRecipe((prev) => ({...prev, serving_size: event.target.value}))}/>
        <h1>Ingredients</h1>
        <input name="ingredient_1" placeholder="item" onChange={event => setRecipe((prev) => ({...prev, ingredient_1: event.target.value}))}/>
        <input  name="measurement_1" placeholder="item measurement" onChange={event => setRecipe((prev) => ({...prev, measurement_1: event.target.value}))}/>
        {/* BUTTON TO ADD INGREDIENT */}
        <button>Add Ingredient</button>
        <h1>Instructions</h1>
        <input name="instruction_1" placeholder="Step 1" nChange={event => setRecipe((prev) => ({...prev, instruction_1: event.target.value}))}/>
        <button>Add Step</button>

        <h1>Tags</h1>
        <input type="radio" value="vegan" name="tag" /> Vegan
        <input type="radio" value="gluten-free" name="tag" /> Gluten-Free
        <input type="radio" value="dairy-free" name="tag" /> Dairy-Free
        <input type="radio" value="vegetarian" name="tag" /> Vegetarian
        <input type="radio" value="" name="tag" /> Keto 


        <input type= "button" value="Submit" onClick={putRecipe}/>

      </form>
    </section>
   
   )}