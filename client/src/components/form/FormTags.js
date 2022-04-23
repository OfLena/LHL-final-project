import { Paper, Checkbox, FormControlLabel } from "@mui/material";


export default function FormTags (props) {

  const {editForm, editRecipe, handleCheckboxChange }= props


  return (
    

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
                   // EDIT - VEGAN
                  checked={editForm && editRecipe.vegan ? true : false}
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
                  // EDIT - GF
                  checked={editForm && editRecipe.gluten_free ? true : false}
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
                  // EDIT - DF
                  checked={editForm && editRecipe.dairy_free ? true : false}
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
                  // EDIT - VEGETARIAN
                  checked={editForm && editRecipe.vegetarian ? true : false}
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
                  // EDIT - KETO
                  checked={editForm && editRecipe.keto ? true : false}
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
                  // EDIT - BREAKFAST
                  checked={editForm && editRecipe.breakfast ? true : false}
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
                  // EDIT - LUNCH
                  checked={editForm && editRecipe.lunch ? true : false}
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
                  // EDIT - DINNER
                  checked={editForm && editRecipe.dinner ? true : false}
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
    )
}