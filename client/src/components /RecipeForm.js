import React, { useState, useEffect } from "react";
import axios from 'axios';


export default function RecipeForm() {


  const [recipe, setRecipe] = useState({});
  const [tag, setTag] = useState({});
  const [ingredientRows, setIngredientRows] = useState([{}]);
  const [instructionRows, setInstructionRows] = useState([{}]);
  
  

  // ======== USE EFFECTS ===== //


  useEffect(() => {
    const instructionArr = instructionRows.map(instruction => instruction.instruction) ;
    instructionArr.forEach((message ,index) => 
    setRecipe((prev) => ({...prev, [`instruction_${index+1}`]: `${message}`})));
    console.log(recipe);
  }, [instructionRows])

  useEffect(() => {
    const ingredientArr = ingredientRows.map(ingredient=> ingredient.ingredient) ;
    ingredientArr.forEach((message ,index) => 
    setRecipe((prev) => ({...prev, [`ingredient_${index+1}`]: `${message}`})));
    console.log(recipe);
  }, [ingredientRows])

  useEffect(() => {
    const measurementArr = ingredientRows.map(measurement=> measurement.measurement) ;
    measurementArr.forEach((message ,index) => 
    setRecipe((prev) => ({...prev, [`measurement_${index+1}`]: `${message}`})));
    console.log(recipe);
  }, [ingredientRows])

   
// ==================CHECKBOX HANDLERS =================//

  function handleCheckboxChange(evt) {
    if (evt.target.checked === false) {
      const checkboxVal = evt.target.value
      setTag((prev) => ({...prev, [checkboxVal]: false}))
    }
    else {
      const checkboxVal = evt.target.value
      setTag((prev) => ({...prev, [checkboxVal]: true}))
    }
  }

// ================= INGREDIENT ROW HANDLERS =================//
  const handleIngredientRowChange = idx => e => {
    const { name, value } = e.target;
    const newRow = [...ingredientRows];
    newRow[idx][name] = value
    setIngredientRows(newRow);
  };

  const handleIngredientAddRow = () => {
      const item = {
        ingredient: "",
        measurement: ""
      };
      setIngredientRows([...ingredientRows, item]
      );
    };

  const handleIngredientRemoveRow = () => {
      setIngredientRows([...ingredientRows].slice(0, -1));
    };

  // ================= INSTRUCTION ROW HANDLERS ================//
  const handleInstructionRowChange = idx => e => {
  
    const { name, value } = e.target;
    const newInstructionRow = [...instructionRows];
    newInstructionRow[idx][name] = value
    setInstructionRows(newInstructionRow);
  };

  const handleInstructionAddRow = () => {
    
      const item = {
        instruction: ""
      };
      setInstructionRows([...instructionRows, item]
      );

      
    };

  const handleInstructionRemoveRow = () => {
    setInstructionRows([...instructionRows].slice(0, -1));
    };

    
// ==================AXIOS CALLS =================//

  function postRecipeAndTags() {
    Promise.all([
      axios.post("/recipes", recipe),
      axios.post("/tags", tag)
    ])
    .then(all => {console.log(all)})
    .catch(err => {console.log("ERR", err)})
  }





   return (
    <section>

      <h1>Upload your Recipe!</h1>


      <form 
       onSubmit={e => e.preventDefault()}
       autoComplete="off"
       >
        <table class="table table-recipe-details">
          <thead>
        <tr>
          <td>Recipe Details</td>
        </tr>
         </thead>
         <tbody>
            <tr>
              <td>Image</td>
              <input 
                name="image_url"
                placeholder="Upload Photo Url" 
                onChange={e => setRecipe((prev) => ({...prev, img_url: e.target.value}))}
                />
            </tr>
            <tr>
            <td>Title</td>
              <input 
                name="title"
                placeholder="Title" 
                onChange={e => setRecipe((prev) => ({...prev, title: e.target.value}))}
                />
            </tr>
            <tr>
            <td>Prep Time</td>
              <input 
                name="prep_time" 
                placeholder="Cook Time" 
                onChange={e => setRecipe((prev) => ({...prev, prep_time: e.target.value}))}
                />
            </tr>
            <tr>
            <td>Serving Size</td>
              <input 
                name="serves"
                placeholder="serving size" 
                onChange={e => setRecipe((prev) => ({...prev, serving_size: e.target.value}))}
                />
            </tr>

         </tbody>
        </table>
        
      <table class="table table-ingredients"> 
        <thead>
          <tr>
            <td>Ingredients</td>
          </tr>
        </thead>
        <tbody>
        {ingredientRows.map((item, idx) => (
          <tr id="addr0" key={idx}>
            <td>{idx+1}</td>
            <td>
              <input
                type="text"
                name="ingredient"
                placeholder="Item"
                value={ingredientRows[idx].ingredient}
                onChange={handleIngredientRowChange(idx)}
                className="form-control"
              />
            </td>
            <td>
              <input
                type="text"
                name="measurement"
                placeholder="Measurement"
                value={ingredientRows[idx].measurement}
                onChange={handleIngredientRowChange(idx)}
                className="form-control"
              />
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      
      <button 
        disabled={ingredientRows.length >= 20}
        onClick={handleIngredientAddRow}
        className="btn btn-default pull-left"
      >
        Add Row
      </button>
      <button
        onClick={handleIngredientRemoveRow}
        className="pull-right btn btn-default"
      >
        Delete Row
      </button>

        <table class="table table-instructions"> 
        <thead>
          <tr>
            <td>Instructions</td>
          </tr>
        </thead>
        <tbody>
        {instructionRows.map((item, idx) => (
          <tr id="addr0" key={idx}>
            <td>Step {idx+1}</td>
            <td>
              <input
                type="text"
                name="instruction"
                value={instructionRows[idx].name}
                onChange={handleInstructionRowChange(idx)}
                className="form-control"
              />
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      <button 
          disabled={instructionRows.length >= 5}
          onClick={handleInstructionAddRow}
          className="btn btn-default pull-left">
        Add Row
      </button>
      <button
          onClick={handleInstructionRemoveRow}
          className="pull-right btn btn-default">
        Delete Row
      </button>
      <h1>Tags</h1>

        <input 
          type="checkbox" 
          value="vegan" 
          name="tag" 
          onChange={handleCheckboxChange}
        /> Vegan
        
        <input 
          type="checkbox" 
          value="gluten_free" 
          name="tag" 
          onChange={handleCheckboxChange}
        /> Gluten-Free

        <input 
          type="checkbox" 
          value="dairy_free" 
          name="tag" 
          onChange={handleCheckboxChange}
        /> Dairy-Free

        <input 
          type="checkbox" 
          value="vegetarian" 
          name="tag" 
          onChange={handleCheckboxChange}
        /> Vegetarian

        <input 
          type="checkbox" 
          value="keto" 
          name="tag" 
          onChange={handleCheckboxChange}
        /> Keto 

        <br/>
        <br/>
        <input type= "button" className="btn btn-default pull-left" value="Post your Recipe" onClick={postRecipeAndTags}/>

      </form>
    </section>

   )}