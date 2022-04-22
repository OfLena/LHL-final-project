import "./styles/recipeform.scss";
import "./styles/recipeHeader.scss";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";

import {
  Container,
  FormControlLabel,
  Paper,
  Grid,
  Checkbox,
  Button,
  TextField,
  Box,
  InputAdornment,
<<<<<<< HEAD
=======
  Typography,
>>>>>>> feature/form-work-v7
} from "@mui/material";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import ScaleIcon from "@mui/icons-material/Scale";
import DeleteIconTwoTone from "@mui/icons-material/DeleteTwoTone";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";

import Footer from "./Footer";

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
<<<<<<< HEAD
  // EDIT RECIPE STATE
  const [editRecipe, setEditRecipe] = useState(false);
=======

  const [previewImage, setPreviewImage] = useState({
    isTextVisible: 'image-preview__image',
  });
  // EDIT RECIPE STATE
  const [editRecipe, setEditRecipe] = useState(false);
  let incomingImage;
 
>>>>>>> feature/form-work-v7

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
      const findThisRecipe = thisRecipeArr.filter((recipe) =>
        recipe.id === currentPage ? recipe : false
      );
<<<<<<< HEAD

      // Filter Out All Key/Value Pairs where the Value is Falsey
      const filteredRecipes = Object.fromEntries(
        Object.entries(findThisRecipe[0]).filter(([_, v]) => v)
      );

      setEditRecipe(filteredRecipes);
    }
  }, [editForm]);

  console.log("BEGINNING ---->", editRecipe);
=======

      // Filter Out All Key/Value Pairs where the Value is Falsey
      const filteredRecipes = Object.fromEntries(
        Object.entries(findThisRecipe[0]).filter(([_, v]) => v)
      );

      setEditRecipe(filteredRecipes);
    }
  }, [editForm]);


>>>>>>> feature/form-work-v7
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

  
 console.log('user', recipe);
 


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
        <header className="burg-header">
          <div className="m-intro">
            <div className="e-text">
              {/* EDIT PROP - CONDITIONAL TITLE RENDERING */}
              {editForm ? <h1>Update Recipe</h1> : <h1>Share Your Recipe</h1>}
            </div>
          </div>
        </header>

        <Grid container spacing={0}>
<<<<<<< HEAD
          <Grid item xs={12} sm={6}>
=======
        
          <Grid item xs={12} sm={12}>
>>>>>>> feature/form-work-v7
            <TextField
              fullWidth
              required
              id="title"
              label="Title"
              name="title"
              placeholder="Title"
              // FOR EDIT
              value={editForm ? editRecipe.title : null}
              onChange={(e) =>
                setRecipe((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </Grid>

<<<<<<< HEAD
          <Grid item xs={12} sm={6}>
            <input
              type="file"
              accept="image/jpeg"
=======
          <Grid item xs={12} sm={12}>
            <input
              className="choose-file"
              accept="image/*"
              type="file"
>>>>>>> feature/form-work-v7
              id="image_url"
              label="Image URL"
              name="image_url"
              onChange={(e) =>
                setRecipe(
                  (prev) => ({ ...prev, image_url: e.target.files[0].name }),
<<<<<<< HEAD
                  setImage(e.target.files[0])
                )
              }
            />
          </Grid>

=======
                  imageSetter(e.target.files[0])
                )
              }
              
            />
             {/* <Button
            startIcon={<AddCircleTwoToneIcon />}
            variant="outlined"
            color="yellow"
            onClick={(e) =>
              setRecipe(
                (prev) => ({ ...prev, image_url: e.target.files[0].name }),
                imageSetter(e.target.files[0])
              )
            }
            className="btn btn-default pull-left"
          >
            Add
          </Button> */}

            <div className="image-preview">
              <img  id="image-prev" src={previewImage.image} alt="image-preview" className={previewImage.isTextVisible}/>{previewImage.isTextVisible === 'image-preview__image' ? 'Preview your Image' : null}
            </div>
          </Grid>
              
>>>>>>> feature/form-work-v7
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              id="prep_time"
              label="Prep Time"
              name="prep_time"
              placeholder="Cook Time"
              // FOR EDIT
              value={editForm ? editRecipe.prep_time : null}
              onChange={(e) =>
                setRecipe((prev) => ({
                  ...prev,
                  prep_time: e.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              id="serves"
              label="Serves"
              name="serves"
              placeholder="serving size"
              // FOR EDIT
              value={editForm ? editRecipe.serving_size : null}
              onChange={(e) =>
                setRecipe((prev) => ({
                  ...prev,
                  serving_size: e.target.value,
                }))
              }
            />
          </Grid>

          {ingredientRows.map((item, idx) => (
            <Grid container spacing={0} id="addr0" key={idx}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {" "}
                        <DinnerDiningIcon />{" "}
                      </InputAdornment>
                    ),
                  }}
                  type="text"
                  name="ingredient"
                  placeholder={`Ingredient ${idx + 1}`}
                  value={ingredientRows[idx].ingredient}
                  onChange={handleIngredientRowChange(idx)}
                  className="form-control"
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {" "}
                        <ScaleIcon />{" "}
                      </InputAdornment>
                    ),
                  }}
                  type="text"
                  name="measurement"
                  placeholder={`Measurement ${idx + 1}`}
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
            startIcon={<AddCircleTwoToneIcon />}
            variant="outlined"
            color="yellow"
            disabled={ingredientRows.length >= 20}
            onClick={handleIngredientAddRow}
            className="btn btn-default pull-left"
          >
            Add
          </Button>

          <Button
            startIcon={<DeleteIconTwoTone />}
            color="black"
            variant="outlined"
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
                startAdornment: (
                  <InputAdornment position="start">
                    Step {idx + 1}
                  </InputAdornment>
                ),
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
            startIcon={<AddCircleTwoToneIcon />}
            variant="outlined"
            color="yellow"
            disabled={instructionRows.length >= 5}
            onClick={handleInstructionAddRow}
          >
            Add
          </Button>

          <Button
            startIcon={<DeleteIconTwoTone />}
            color="black"
            variant="outlined"
            onClick={handleInstructionRemoveRow}
          >
            Delete
          </Button>
        </Grid>

        <Paper elevation={3} align={"center"}>
          <span className="tags">
            <FormControlLabel
              className="checkbox-tag"
              control={
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "#CCA01D",
                    },
                  }}
                />
              }
              label="Vegan"
              labelPlacement="top"
              type="checkbox"
              value="vegan"
              name="tag"
              onChange={handleCheckboxChange}
            />

            <FormControlLabel
              className="checkbox-tag"
              control={
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "#CCA01D",
                    },
                  }}
                />
              }
              label="Gluten Free"
              labelPlacement="top"
              value="gluten_free"
              name="tag"
              color="yellow"
              onChange={handleCheckboxChange}
            />

            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "#CCA01D",
                    },
                  }}
                />
              }
              label="Dairy-Free"
              labelPlacement="top"
              type="checkbox"
              value="dairy_free"
              name="tag"
              color="yellow"
              onChange={handleCheckboxChange}
            />

            <FormControlLabel
              className="checkbox-tag"
              control={
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "#CCA01D",
                    },
                  }}
                />
              }
              label="Vegetarian"
              labelPlacement="top"
              type="checkbox"
              value="vegetarian"
              name="tag"
              color="yellow"
              onChange={handleCheckboxChange}
            />

            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "#CCA01D",
                    },
                  }}
                />
              }
              label="Keto"
              labelPlacement="top"
              type="checkbox"
              value="keto"
              name="tag"
              color="yellow"
              onChange={handleCheckboxChange}
            />
            <FormControlLabel
              className="checkbox-tag"
              control={
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "#CCA01D",
                    },
                  }}
                />
              }
              label="Breakfast"
              labelPlacement="top"
              type="checkbox"
              value="breakfast"
              name="tag"
              color="yellow"
              onChange={handleCheckboxChange}
            />

            <FormControlLabel
              className="checkbox-tag"
              control={
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "#CCA01D",
                    },
                  }}
                />
              }
              label="Lunch"
              labelPlacement="top"
              type="checkbox"
              value="lunch"
              name="tag"
              color="yellow"
              onChange={handleCheckboxChange}
            />

            <FormControlLabel
              className="checkbox-tag"
              control={
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "#CCA01D",
                    },
                  }}
                />
              }
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
        {!recipe.title ? null : postButton()}
        {/* EDIT PROP FOR "UPDATE BUTTON" */}
        {editForm ? updateButton() : null}
      </Container>
      <Footer />
    </Box>
  );
}
