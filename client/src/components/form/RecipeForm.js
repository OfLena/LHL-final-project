import "../styles/recipeform.scss";
import "../styles/recipeHeader.scss";

import React from "react";

import {
  Container,
  Grid,
  Box,
} from "@mui/material";


import Footer from "../Footer";

import FormHeader from "./FormHeader";
import FormTitleAndImage from "./FormTitleAndImage";
import FormBody from "./FormBody";
import FormTags from "./FormTags";
import UseFormData from "./hooks/FormHooks";

export default function RecipeForm(props) {
  const { user, recipes, state, setState, editForm, currentPage } = props;
  

  const {editRecipe, setRecipe, imageSetter, previewImage, ingredientRows, handleIngredientAddRow, handleIngredientRemoveRow, updateButton, postButton, recipe, handleCheckboxChange, handleInstructionAddRow, handleInstructionRemoveRow, handleInstructionRowChange, handleIngredientRowChange, instructionRows, instructionsEdit, ingredientsEdit, measurementsEdit } = UseFormData(props)

  // =========== STATES ========== //

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
            editForm={editForm}
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
            ingredientsEdit={ingredientsEdit}
            measurementsEdit={measurementsEdit}
            // ingredientRowsEdit={ingredientRowsEdit}
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
