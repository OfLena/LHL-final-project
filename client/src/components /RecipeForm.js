import "./styles/recipeform.scss";

import { useFormControl } from "@mui/material/FormControl";
import Input from "@mui/material/Input";

import React, { useState, useEffect } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function RecipeForm() {
  const [recipe, setRecipe] = useState({});
  const [tag, setTag] = useState({});
  const [ingredientRows, setIngredientRows] = useState([{}]);
  const [instructionRows, setInstructionRows] = useState([{}]);

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
    console.log(recipe);
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
    console.log(recipe);
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
    console.log(recipe);
  }, [ingredientRows]);

  // ==================CHECKBOX HANDLERS =================//

  function handleCheckboxChange(evt) {
    if (evt.target.checked === false) {
      const checkboxVal = evt.target.value;
      setTag((prev) => ({ ...prev, [checkboxVal]: false }));
    } else {
      const checkboxVal = evt.target.value;
      setTag((prev) => ({ ...prev, [checkboxVal]: true }));
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
    Promise.all([axios.post("/recipes", recipe), axios.post("/tags", tag)])
      .then((all) => {
        console.log(all);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <section class="section section-recipe ">
        <h1>Upload your Recipe!</h1>

        <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
          <td>Recipe Details</td>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper>
                <InputLabel>Title</InputLabel>
                <TextField
                  name="title"
                  placeholder="Title"
                  onChange={(e) =>
                    setRecipe((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper>
                <InputLabel>Image</InputLabel>
                <TextField
                  name="image_url"
                  placeholder="Upload Photo Url"
                  onChange={(e) =>
                    setRecipe((prev) => ({ ...prev, img_url: e.target.value }))
                  }
                />
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper>
                <InputLabel>Prep Time</InputLabel>
                <TextField
                  name="prep_time"
                  placeholder="Cook Time"
                  onChange={(e) =>
                    setRecipe((prev) => ({
                      ...prev,
                      prep_time: e.target.value,
                    }))
                  }
                />
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper>
                <InputLabel>Serving Size</InputLabel>
                <TextField
                  name="serves"
                  placeholder="serving size"
                  onChange={(e) =>
                    setRecipe((prev) => ({
                      ...prev,
                      serving_size: e.target.value,
                    }))
                  }
                />
              </Paper>
            </Grid>
          </Grid>
          <td>Ingredients</td>
          {ingredientRows.map((item, idx) => (
            <tr id="addr0" key={idx}>
              <td>{idx + 1}</td>
              <td>
                <TextField
                  type="text"
                  name="ingredient"
                  placeholder="Item"
                  value={ingredientRows[idx].ingredient}
                  onChange={handleIngredientRowChange(idx)}
                  className="form-control"
                />
              </td>
              <td>
                <TextField
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
          <Button
            variant="contained"
            disabled={ingredientRows.length >= 20}
            onClick={handleIngredientAddRow}
            className="btn btn-default pull-left"
          >
            Add Row
          </Button>
          <Button
            variant="contained"
            onClick={handleIngredientRemoveRow}
            className="pull-right btn btn-default"
          >
            Delete Row
          </Button>
          <table class="table table-instructions">
            <thead>
              <tr>
                <td>Instructions</td>
              </tr>
            </thead>
            <tbody>
              {instructionRows.map((item, idx) => (
                <tr id="addr0" key={idx}>
                  <td>Step {idx + 1}</td>
                  <td>
                    <TextField
                      type="text"
                      name="instruction"
                      placeholder="instruction"
                      value={instructionRows[idx].name}
                      onChange={handleInstructionRowChange(idx)}
                      className="form-control"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button
            variant="contained"
            disabled={instructionRows.length >= 5}
            onClick={handleInstructionAddRow}
            className="btn btn-default pull-left"
          >
            Add Row
          </Button>
          <Button
            variant="contained"
            onClick={handleInstructionRemoveRow}
            className="pull-right btn btn-default"
          >
            Delete Row
          </Button>
          <h1>Tags</h1>
          <Checkbox
            type="checkbox"
            value="vegan"
            name="tag"
            onChange={handleCheckboxChange}
          />{" "}
          Vegan
          <Checkbox
            type="checkbox"
            value="gluten_free"
            name="tag"
            onChange={handleCheckboxChange}
          />{" "}
          Gluten-Free
          <Checkbox
            type="checkbox"
            value="dairy_free"
            name="tag"
            onChange={handleCheckboxChange}
          />{" "}
          Dairy-Free
          <Checkbox
            type="checkbox"
            value="vegetarian"
            name="tag"
            onChange={handleCheckboxChange}
          />{" "}
          Vegetarian
          <Checkbox
            type="checkbox"
            value="keto"
            name="tag"
            onChange={handleCheckboxChange}
          />{" "}
          Keto
          <br />
          <br />
          <Button
            type="button"
            variant="contained"
            className="btn btn-default pull-left"
            onClick={postRecipeAndTags}
          >
            Post your Recipe
          </Button>
        </form>
      </section>
    </Box>
  );
}
