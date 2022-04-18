import "./styles/recipeform.scss";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { Container, Typography, FormControlLabel,Paper, Grid, Checkbox, Button, TextField, Box,  InputAdornment } from "@mui/material";
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import ScaleIcon from '@mui/icons-material/Scale';
import DeleteIconTwoTone from '@mui/icons-material/DeleteTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

import Footer from "./Footer";




export default function RecipeForm(props) {



  const { user, recipes, setState, state } = props
  
  
  let navigate = useNavigate();
 
  console.log(state)

  // =========== STATES ========== //
  const [recipe, setRecipe] = useState({user_id: user.id});
  const [ingredientRows, setIngredientRows] = useState([{}]);
  const [instructionRows, setInstructionRows] = useState([{}])
  

  // ======== USE EFFECTS ===== //
 
  useEffect(() => {
    const instructionArr = instructionRows.map(
      (instruction) => instruction.instruction
    );
    instructionArr.forEach((message, index) =>
      setRecipe((prev) => ({
        ...prev,
        [`instruction_${index + 1}`]: `${message}`,
      }))
    );
  }, [instructionRows]);

  useEffect(() => {
    const ingredientArr = ingredientRows.map(
      (ingredient) => ingredient.ingredient
    );
    ingredientArr.forEach((message, index) =>
      setRecipe((prev) => ({
        ...prev,
        [`ingredient_${index + 1}`]: `${message}`,
      }))
    );
  }, [ingredientRows]);

  useEffect(() => {
    const measurementArr = ingredientRows.map(
      (measurement) => measurement.measurement
    );
    measurementArr.forEach((message, index) =>
      setRecipe((prev) => ({
        ...prev,
        [`measurement_${index + 1}`]: `${message}`,
      }))
    );
  }, [ingredientRows]);

  // ==================CHECKBOX HANDLERS =================//

  function handleCheckboxChange(evt) {
    if (evt.target.checked === false) {
      const checkboxVal = evt.target.value;
      setRecipe((prev) => ({ ...prev, [checkboxVal]: false }));
    } else {
      const checkboxVal = evt.target.value;
      setRecipe((prev) => ({ ...prev, [checkboxVal]: true }));
    }
  }

  // ================= INGREDIENT ROW HANDLERS =================//
  const handleIngredientRowChange = (idx) => (e) => {
    const { name, value } = e.target;
    const newRow = [...ingredientRows];
    newRow[idx][name] = value;
    setIngredientRows(newRow);
  };

  const handleIngredientAddRow = () => {
    const item = {
      ingredient: "",
      measurement: "",
    };
    setIngredientRows([...ingredientRows, item]);
  };

  const handleIngredientRemoveRow = () => {
    setIngredientRows([...ingredientRows].slice(0, -1));
  };

  // ================= INSTRUCTION ROW HANDLERS ================//
  const handleInstructionRowChange = (idx) => (e) => {
    const { name, value } = e.target;
    const newInstructionRow = [...instructionRows];
    newInstructionRow[idx][name] = value;
    setInstructionRows(newInstructionRow);
  };

  const handleInstructionAddRow = () => {
    const item = {
      instruction: "",
    };
    setInstructionRows([...instructionRows, item]);
  };

  const handleInstructionRemoveRow = () => {
    setInstructionRows([...instructionRows].slice(0, -1));
  };

  // ==================AXIOS CALLS =================//

  function postRecipeAndTags() {
    Promise.all([
      axios.post("/recipes", recipe),
    ])
      .then((all) => {   
        setState((prev) => ({...prev, filtered_recipes: [...recipes, recipe]}))
        navigate(`/`)
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }

  return (

    <Box
      component="form"
      sx={{marginTop: '6rem'}}
      noValidate
      autoComplete="off"
    >


      <Container>
        
        <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
          <Typography>
            Create Recipe
          </Typography>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6}>
              
                {/* <InputLabel>Title</InputLabel> */}
                <TextField
                  fullWidth
                  required
                  id="title"
                  label="Title"
                  name="title"
                  placeholder="Title"
                  onChange={(e) =>
                    setRecipe((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
              
            </Grid>

            <Grid item xs={12} sm={6}>
              
                {/* <InputLabel>Image</InputLabel> */}
                <TextField
                  fullWidth
                  required
                  id="image_url"
                  label="Image URL"
                  name="image_url"
                  placeholder="Upload Photo Url"
                  onChange={(e) =>
                    setRecipe((prev) => ({ ...prev, image_url: e.target.value }))
                  }
                />
              
            </Grid>

            <Grid item xs={12} sm={6}>
              
                {/* <InputLabel>Prep Time</InputLabel> */}
                <TextField
                  fullWidth
                  required
                  id="prep_time"
                  label="Prep Time"
                  name="prep_time"
                  placeholder="Cook Time"
                  onChange={(e) =>
                    setRecipe((prev) => ({
                      ...prev,
                      prep_time: e.target.value,
                    }))
                  }
                />
              
            </Grid>

            <Grid item xs={12} sm={6}>
              
                {/* <InputLabel>Serving Size</InputLabel> */}
                <TextField
                  fullWidth
                  required
                  id="serves"
                  label="Serves"
                  name="serves"
                  placeholder="serving size"
                  onChange={(e) =>
                    setRecipe((prev) => ({
                      ...prev,
                      serving_size: e.target.value,
                    }))
                  }
                />
              
            </Grid>
            
          
          {/* <Typography>Ingredients</Typography> */}
          
          {ingredientRows.map((item, idx) => (
            
            <Grid container spacing={0} id="addr0" key={idx}>
            
            <Grid item xs={6}> 
                <TextField
                
                fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start"> <DinnerDiningIcon/> </InputAdornment>,
                  }}
                  type="text"
                  name="ingredient"
                  value={ingredientRows[idx].ingredient}
                  onChange={handleIngredientRowChange(idx)}
                  className="form-control"
                />
            </Grid>


            <Grid item xs={6}>
              <TextField
              
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start"> <ScaleIcon/> </InputAdornment>,
              }}
                type="text"
                name="measurement"
                placeholder="Measurement"
                value={ingredientRows[idx].measurement}
                onChange={handleIngredientRowChange(idx)}
                className="form-control"
              />
              
            </Grid>
          </Grid>
          ))}
          

          </Grid>

          <Grid item xs={6}>
          <Button
            startIcon={<AddCircleTwoToneIcon/>}
            variant="contained"
            disabled={ingredientRows.length >= 20}
            onClick={handleIngredientAddRow}
            className="btn btn-default pull-left"
          >
            Add
          </Button>
        
          
          <Button
            startIcon={<DeleteIconTwoTone />}
            color="error"
            variant="contained"
            onClick={handleIngredientRemoveRow}
            className="pull-right btn btn-default"
          >
            Delete
          </Button>
          </Grid>
              {instructionRows.map((item, idx) => (
                <Grid item container spacing={0} id="Step" key={idx}>

                    <TextField
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Step {idx + 1}</InputAdornment>,
                    }}
                      id="filled-multiline-flexable"
                      multiline
                      fullWidth
                      label="Instructions"
                      type="text"
                      name="instruction"
                      value={instructionRows[idx].name}
                      onChange={handleInstructionRowChange(idx)}
                      className="form-control"
                    />
                </Grid>
              ))}
          <Grid item xs={6}>
          <Button
            startIcon={<AddCircleTwoToneIcon/>}
            variant="contained"
            disabled={instructionRows.length >= 5}
            onClick={handleInstructionAddRow}
            
          >
            Add
          </Button>
          <Button
            startIcon={<DeleteIconTwoTone />}
            color="error"
            variant="contained"
            onClick={handleInstructionRemoveRow}

          >
            Delete
          </Button>
          </Grid>
    
    
          <h1>Tags</h1>
          
          <Paper elevation={3}>
           <span className="tags">
              <FormControlLabel
                control= {<Checkbox/>}
                label="Vegan"
                labelPlacement="top"
                type="checkbox"
                value="vegan"
                name="tag"
                onChange={handleCheckboxChange}
              />
              
              <FormControlLabel
                control= {<Checkbox/>}
                label="Gluten Free"
                labelPlacement="top"
                value="gluten_free"
                name="tag"
                onChange={handleCheckboxChange}
              />

              <FormControlLabel
                control= {<Checkbox/>}
                label="Dairy-Free"
                labelPlacement="top"
                type="checkbox"
                value="dairy_free"
                name="tag"
                onChange={handleCheckboxChange}
              />
          
              <FormControlLabel
                control= {<Checkbox  />}
                label="Vegetarian"
                labelPlacement="top"
                type="checkbox"
                value="vegetarian"
                name="tag"
                onChange={handleCheckboxChange}
              />
              
              <FormControlLabel
                control= {<Checkbox/>}
                label="Keto"
                labelPlacement="top"
                type="checkbox"
                value="keto"
                name="tag"
                onChange={handleCheckboxChange}
              />
              <FormControlLabel
                control= {<Checkbox/>}
                label="Breakfast"
                labelPlacement="top"
                type="checkbox"
                value="breakfast"
                name="tag"
                onChange={handleCheckboxChange}
              />
          
              <FormControlLabel
                control= {<Checkbox  />}
                label="Lunch"
                labelPlacement="top"
                type="checkbox"
                value="lunch"
                name="tag"
                onChange={handleCheckboxChange}
              />
              
              <FormControlLabel
                control= {<Checkbox/>}
                label="Dinner"
                labelPlacement="top"
                type="checkbox"
                value="dinner"
                name="tag"
                onChange={handleCheckboxChange}
              />
            </span>
          </Paper>         
      
          <br />
          <br />

          

          <Button
            type="button"
            variant="contained"
            color="success"
            className="btn btn-default pull-left"
            onClick={postRecipeAndTags}
          >
            Post your Recipe
          </Button>
         
        </form>
      </Container>
      <Footer/>
    </Box>
  );
}
