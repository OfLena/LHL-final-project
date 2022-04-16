import React, { useState } from "react";
import axios from 'axios';


export default function RecipeForm() {


  const [recipe, setRecipe] = useState({});
  const [tag, setTag] = useState({});
  const [rows, setRows] = useState([{}]);
  
  
  

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


  const handleRowChange = idx => e => {
    
    console.log('Target', e.target);
    
    const { name, value } = e.target;
    const newRow = [...rows];
    newRow[idx][name] = value
    setRows(newRow);
  };

  const handleAddRow = () => {
    
      const item = {
        ingredient: "",
        measurement: ""
      };
      setRows([...rows, item]
      );

      
    };

  const handleRemoveRow = () => {
      setRows([...rows].slice(0, -1));
    };

    
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
          placeholder="serving size" 
          onChange={e => setRecipe((prev) => ({...prev, serving_size: e.target.value}))}
        />
        
      <table> 
        <thead>
          <tr>
            <td>Ingredients</td>
          </tr>
        </thead>
        <tbody>
        {rows.map((item, idx) => (
          <tr id="addr0" key={idx}>
            <td>{idx+1}</td>
            <td>
              <input
                type="text"
                name="ingredient"
                value={rows[idx].ingredient}
                onChange={handleRowChange(idx)}
                className="form-control"
              />
            </td>
            <td>
              <input
                type="text"
                name="measurement"
                value={rows[idx].measurement}
                onChange={handleRowChange(idx)}
                className="form-control"
              />
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      
      <button 
        disabled={rows.length >= 20}
        onClick={handleAddRow}
        className="btn btn-default pull-left"
      >
        Add Row
      </button>
      <button
        onClick={handleRemoveRow}
        className="pull-right btn btn-default"
      >
        Delete Row
      </button>

        <h1>Instructions</h1>

        <input 
          name="instruction_1" 
          placeholder="Step 1" 
          onChange={e => setRecipe((prev) => ({...prev, instruction_1: e.target.value}))}
        />
        <button>Add Step</button>


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


        <input type= "button" value="Submit" onClick={postRecipeAndTags}/>

      </form>
    </section>
   
   )}