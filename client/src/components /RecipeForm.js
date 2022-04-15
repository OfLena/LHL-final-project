import React, { useState } from "react";

import Button from "./Button";


export default function RecipeForm(props) {

  
  const [recipe, setRecipe] = useState({ 
    title: [],
    image_url: [],
    instruction_1: [],
    instruction_2: [],
    instruction_3: [],
    instruction_4: [],
    instruction_5: [],
    ingredient_1: [],
    ingredient_2: [],
    ingredient_3: [],
    ingredient_4: [],
    ingredient_5: [],
    ingredient_6: [],
    ingredient_7: [],
    ingredient_8: [],
    ingredient_9: [],
    ingredient_10: [],
    ingredient_11: [],
    ingredient_12: [],
    ingredient_13: [],
    ingredient_14: [],
    ingredient_15: [],
    ingredient_16: [],
    ingredient_17: [],
    ingredient_18: [],
    ingredient_19: [],
    ingredient_20: [],

    

  });

 

   return (
    <section>
      
      <form 
      onSubmit={e => e.preventDefault()}
     autoComplete="off">
    
        <input name="image_url" placeholder="Upload Photo"  onChange={e => setRecipe((prev) => ({...prev, img_url: e.target.value}))}></input>
        <input name="title" placeholder="Title"></input>
        <input name="prep_time" placeholder="Cook Time"></input>
        <h1>Ingredients</h1>
        <input name="ingredient_1" placeholder="item"></input>
        <input  name="measurement_1" placeholder="item measurement"></input>
        {/* BUTTON TO ADD INGREDIENT */}
        <button>Add Ingredient</button>
        <h1>Instructions</h1>
        <input name="instruction_1" placeholder="Step 1"></input>
        <button>Add Step</button>

        <h1>Tags</h1>
        <input type="radio" value="vegan" name="tag" /> Vegan
        <input type="radio" value="gluten-free" name="tag" /> Gluten-Free
        <input type="radio" value="dairy-free" name="tag" /> Dairy-Free
        <input type="radio" value="vegetarian" name="tag" /> Vegetarian
        <input type="radio" value="" name="tag" /> Keto   
       
      </form>
    </section>
   
   )}