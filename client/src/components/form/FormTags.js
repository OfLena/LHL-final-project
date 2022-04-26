import { Container, Checkbox, FormControlLabel } from "@mui/material";
import { useState, useEffect } from "react";

export default function FormTags(props) {
  const { editForm, editRecipe, handleCheckboxChange } = props;

  const [dietaryState, setDietaryState] = useState({
    vegan: false,
    gluten_free: false,
    dairy_free: false,
    vegetarian: false,
    keto: false,
    breakfast: false,
    lunch: false || editRecipe.lunch,
    dinner: false || editRecipe.dinner,
  });

  useEffect(() => {
    handleCheckboxChange(dietaryState);
  }, [dietaryState]);

  useEffect(() => {
    if (editForm && editRecipe) {
      setDietaryState({
        vegan: editRecipe.vegan,
        gluten_free: editRecipe.gluten_free,
        dairy_free: editRecipe.dairy_free,
        vegetarian: editRecipe.vegetarian,
        keto: editRecipe.keto,
        breakfast: editRecipe.breakfast,
        lunch: editRecipe.lunch,
        dinner: editRecipe.dinner,
      });
    }
  }, [editRecipe]);

  return (
    <Container sx={{ marginTop: "30px", borderRadius: "7%" }} align={"center"}>
      <span className="tags">
        <FormControlLabel
          className="checkbox-tag"
          control={
            <Checkbox
              sx={{
                "&.Mui-checked": {
                  color: "black",
                },
              }}
              // EDIT - VEGAN
              checked={dietaryState.vegan}
            />
          }
          label="Vegan"
          labelPlacement="top"
          type="checkbox"
          value="vegan"
          name="tag"
          onChange={() => {
            setDietaryState({
              ...dietaryState,
              vegan: !dietaryState.vegan,
            });
          }}
        />

        <FormControlLabel
          className="checkbox-tag"
          control={
            <Checkbox
              sx={{
                "&.Mui-checked": {
                  color: "black",
                },
              }}
              // EDIT - GF
              checked={dietaryState.gluten_free}
            />
          }
          label="Gluten Free"
          labelPlacement="top"
          value="gluten_free"
          name="tag"
          color="yellow"
          onChange={() =>
            setDietaryState({
              ...dietaryState,
              gluten_free: !dietaryState.gluten_free,
            })
          }
        />

        <FormControlLabel
          control={
            <Checkbox
              sx={{
                "&.Mui-checked": {
                  color: "#black",
                },
              }}
              // EDIT - DF
              checked={dietaryState.dairy_free}
            />
          }
          label="Dairy-Free"
          labelPlacement="top"
          type="checkbox"
          value="dairy_free"
          name="tag"
          color="yellow"
          onChange={() =>
            setDietaryState({
              ...dietaryState,
              dairy_free: !dietaryState.dairy_free,
            })
          }
        />

        <FormControlLabel
          className="checkbox-tag"
          control={
            <Checkbox
              sx={{
                "&.Mui-checked": {
                  color: "#black",
                },
              }}
              // EDIT - VEGETARIAN
              checked={dietaryState.vegetarian}
            />
          }
          label="Vegetarian"
          labelPlacement="top"
          type="checkbox"
          value="vegetarian"
          name="tag"
          color="yellow"
          onChange={() =>
            setDietaryState({
              ...dietaryState,
              vegetarian: !dietaryState.vegetarian,
            })
          }
        />

        <FormControlLabel
          control={
            <Checkbox
              sx={{
                "&.Mui-checked": {
                  color: "#black",
                },
              }}
              // EDIT - KETO
              checked={dietaryState.keto}
            />
          }
          label="Keto"
          labelPlacement="top"
          type="checkbox"
          value="keto"
          name="tag"
          color="yellow"
          onChange={() =>
            setDietaryState({
              ...dietaryState,
              keto: !dietaryState.keto,
            })
          }
        />
        <FormControlLabel
          className="checkbox-tag"
          control={
            <Checkbox
              sx={{
                "&.Mui-checked": {
                  color: "#black",
                },
              }}
              // EDIT - BREAKFAST
              checked={dietaryState.breakfast}
            />
          }
          label="Breakfast"
          labelPlacement="top"
          type="checkbox"
          value="breakfast"
          name="tag"
          color="yellow"
          onChange={() =>
            setDietaryState({
              ...dietaryState,
              breakfast: !dietaryState.breakfast,
            })
          }
        />

        <FormControlLabel
          className="checkbox-tag"
          control={
            <Checkbox
              sx={{
                "&.Mui-checked": {
                  color: "black",
                },
              }}
              // EDIT - LUNCH
              checked={dietaryState.lunch}
            />
          }
          label="Lunch"
          labelPlacement="top"
          type="checkbox"
          value="lunch"
          name="tag"
          color="yellow"
          onChange={() =>
            setDietaryState({
              ...dietaryState,
              lunch: !dietaryState.lunch,
            })
          }
        />

        <FormControlLabel
          className="checkbox-tag"
          control={
            <Checkbox
              sx={{
                "&.Mui-checked": {
                  color: "black",
                },
              }}
              // EDIT - DINNER
              checked={dietaryState.dinner}
            />
          }
          label="Dinner"
          labelPlacement="top"
          type="checkbox"
          value="dinner"
          name="tag"
          onChange={() =>
            setDietaryState({
              ...dietaryState,
              dinner: !dietaryState.dinner,
            })
          }
        />
      </span>
    </Container>
  );
}
