import React, { useState } from "react";
import axios from 'axios';


export default function RecipeForm() {


  const [recipe, setRecipe] = useState({});
  const [tag, setTag] = useState({});
  // const [checked, setChecked] = useState({});

  
  function postRecipeAndTags() {
    Promise.all([
      axios.post("/recipes", recipe),
      axios.post("/tags",tag)
    ])
    .then(all => {console.log(all)})
    .catch(err => {console.log("ERR", err)})
  }


   return (

    <section>
      
      <form 
       onSubmit={e => e.preventDefault()}
       autoComplete="off"
      >
    
        <input 
          name="image_url"
          placeholder="Upload Photo" 
          onChange={e => setRecipe((prev) => ({...prev, img_url: e.target.value}))}
        />

        <input 
          name="title"
          placeholder="Title" 
          onChange={e => setRecipe((prev) => ({...prev, title: e.target.value}))}
        />

        <input 
          name="prep_time" 
          placeholder="Cook Time" 
          onChange={e => setRecipe((prev) => ({...prev, prep_time: e.target.value}))}
        />

        <input 
          name="serves"
          placeholder="E.g. 30 minutes" 
          onChange={e => setRecipe((prev) => ({...prev, serving_size: e.target.value}))}
        />

        <h1>Ingredients</h1>

        <input
          name="ingredient_1"
          placeholder="item" 
          onChange={e => setRecipe((prev) => ({...prev, ingredient_1: e.target.value}))}
        />

        <input  
          name="measurement_1" 
          placeholder="item measurement" 
          onChange={e => setRecipe((prev) => ({...prev, measurement_1: e.target.value}))}
        />

        {/* BUTTON TO ADD INGREDIENT */}
        <button>Add Ingredient</button>

        <h1>Instructions</h1>

        <input 
          name="instruction_1" 
          placeholder="Step 1" 
          onChange={e => setRecipe((prev) => ({...prev, instruction_1: e.target.value}))}
        />
        <button>Add Step</button>


        <h1>Tags</h1>

        <input 
          type="radio" 
          value="vegan" 
          name="tag" 
          onChange={() => setTag((prev) => ({...prev, vegan: true}))}
        /> Vegan
        
        <input 
          type="radio" 
          value="gluten_free" 
          name="tag" 
          onChange={() => setTag((prev) => ({...prev, gluten_free: true}))}
        /> Gluten-Free

        <input 
          type="radio" 
          value="dairy_free" 
          name="tag" 
          onChange={() => setTag((prev) => ({...prev, dairy_free: true}))} 
        /> Dairy-Free

        <input 
          type="radio" 
          value="vegetarian" 
          name="tag" 
          onChange={() => setTag((prev) => ({...prev, vegetarian: true}))}
        /> Vegetarian

        <input 
          type="radio" 
          value="keto" 
          name="tag" 
          onChange={() => setTag((prev) => ({...prev, keto: true}))} 
        /> Keto 


        <input type= "button" value="Submit" onClick={postRecipeAndTags}/>

      </form>
    </section>
   
   )}