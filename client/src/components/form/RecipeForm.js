import "../styles/recipeform.scss";
import "../styles/recipeHeader.scss";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";

import {
  Container,
  Grid,
  Button,
  Box,
} from "@mui/material";


import Footer from "../Footer";

import FormHeader from "./FormHeader";
import FormTitleAndImage from "./FormTitleAndImage";
import FormBody from "./FormBody";
import FormTags from "./FormTags";

export default function RecipeForm(props) {
  const { user, recipes, state, setState, editForm, currentPage } = props;
  const navigate = useNavigate();

  // =========== STATES ========== //
  const [recipe, setRecipe] = useState({ user_id: user.id });
  const [ingredientRows, setIngredientRows] = useState(
    [{ ingredient: "", measurement: "" }] || ""
  );
  const [instructionRows, setInstructionRows] = useState(
    [{ instruction: "" }] || ""
  );
  const [image, setImage] = useState();

  const [previewImage, setPreviewImage] = useState({
    isTextVisible: 'image-preview__image',
  });
  // EDIT RECIPE STATE
  const [editRecipe, setEditRecipe] = useState('');
  
 

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

  // EDIT RECIPE - set edit recipe to recipe object
  useEffect(() => {
    if (editForm) {
      const thisRecipeArr = state.filtered_recipes;

      // find the specific recipe
      const findThisRecipe = thisRecipeArr.filter((recipe) =>
        recipe.id === currentPage ? recipe : false
      );

      // Filter Out All Key/Value Pairs where the Value is Falsey
      const filteredRecipe = Object.fromEntries(
        Object.entries(findThisRecipe[0]).filter(([_, v]) => v)
      );

      Promise.all([
        setEditRecipe(filteredRecipe),
        setPreviewImage(() => ({image: `http://localhost:8080/images/${filteredRecipe.image_url}`}))
      ])
    }
  }, [editForm, currentPage]);

  // set entire recipe to individual arrays
  const editRecipePair = Object.entries(editRecipe);

  /* FILTERING OUT ONLY INSTRUCTIONS FROM EDITRECIPEPAIR */
  const instructionsEdit = editRecipePair.filter(item => ( 
    item[0].includes("instruction") ? item : false
  ))

  /* FILTERING OUT ONLY INGREDIENTS FROM EDITRECIPEPAIR */
  

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
    console.log(ingredientRows);
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
 
  const imageSetter = (uploadedImage) => {
      setImage(uploadedImage)  
      let reader = new FileReader();
      let file = uploadedImage
      reader.onloadend = () => {
        setPreviewImage({image: reader.result,
                          isTextVisible: "image-preview__image-filled"});
      };
      reader.readAsDataURL(file);
    }
  
  

  // ==================AXIOS CALLS =================//

  function postRecipeAndTags() {
    const formData = new FormData();
    formData.append("img", image);
    recipe.id = uuidv4();
    console.log("RECIPE", recipe);
    Promise.all([
      axios.post("/recipes", recipe),
      axios.post("/recipes/images", formData, {
        onUploadProgress: (ProgressEvent) => {
          console.log(
            "Upload Progress: " +
              Math.round(ProgressEvent.loaded / ProgressEvent.total) +
              "%"
          );
        },
      }),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          filtered_recipes: [...recipes, recipe],
        }));
        navigate(`/`);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }

  const postButton = function () {
    return (
      <Button
        type="button"
        variant="contained"
        color="black"
        className="btn btn-default pull-left"
        onClick={postRecipeAndTags}
      >
        Post your Recipe
      </Button>
    );
  };

  // EDIT FEATURE - UPDATE BUTTON

  // helper function to find info about recipe

  const updateButton = function () {
    return (
      <Button
        type="button"
        variant="contained"
        color="black"
        className="btn btn-default pull-left"
        onClick={() => console.log("THIS RECIPE")}
        // onClick put request to update recipe in the database using filtered recipes & prev
      >
        Update Recipe
      </Button>
    );
  };

  /* STARTING RETURN */

  return (
    <Box
      component="form"
      sx={{ marginTop: "6rem" }}
      noValidate
      autoComplete="off"
    >
      <Container>
       <FormHeader
       editForm={editForm}
       />
        <Grid container spacing={0}>

           <Grid item xs={12} sm={12}>
            <FormTitleAndImage
            editRecipe={editRecipe}
            setRecipe={setRecipe}
            imageSetter={imageSetter}
            previewImage={previewImage}
              />
           </Grid>
           
           <Grid item xs={12} sm={12}>
             <FormBody
             editRecipe={editRecipe}
             setRecipe={setRecipe}
             imageSetter={imageSetter}
             previewImage={previewImage}
             editForm={editForm}
             ingredientRows={ingredientRows}
             handleIngredientAddRow={handleIngredientAddRow}
            handleIngredientRemoveRow={handleIngredientRemoveRow} handleIngredientRowChange={handleIngredientRowChange}
            instructionRows={instructionRows}
            instructionsEdit={instructionsEdit}
            handleInstructionRemoveRow={handleInstructionRemoveRow} handleInstructionRowChange={handleInstructionRowChange}
            handleInstructionAddRow={handleInstructionAddRow}
             />
            </Grid>
          
            
          </Grid>
            <FormTags
              editForm={editForm}
              editRecipe={editRecipe}
              handleCheckboxChange={handleCheckboxChange}
            />
        <br />
        <br />
        {!recipe.title ? null : postButton()}
        {/* EDIT PROP FOR "UPDATE BUTTON" */}
        {editForm ? updateButton() : null}
      </Container>
      <Footer />
    </Box>
  );
}
