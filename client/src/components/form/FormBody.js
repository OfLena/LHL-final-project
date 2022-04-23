import { Grid, TextField, InputAdornment, Button, } from "@mui/material";

import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import ScaleIcon from "@mui/icons-material/Scale";
import DeleteIconTwoTone from "@mui/icons-material/DeleteTwoTone";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";



export default function FormBody (props) {

  const {editRecipe, editForm, setRecipe, ingredientRows, handleIngredientAddRow, handleIngredientRemoveRow, handleIngredientRowChange, instructionRows, instructionsEdit, handleInstructionRemoveRow, handleInstructionRowChange, handleInstructionAddRow} = props

  return (
    <div>
      <Grid container>
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
        
        {/* EDIT FEAT - INSTRUCTIONS */}
        {editForm ?
          // <h1>hey</h1>
            instructionsEdit.map((item,idx) => (
            <Grid item container spacing={0} id="Step"  key={idx}>
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
              value={item[1]}
              onChange={handleInstructionRowChange  (idx)}
              className="form-control"
            />
          </Grid>
        ))
        :
          instructionRows.map((item, idx) => (
            <Grid item container spacing={0} id="Step"  key={idx}>
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
                onChange={handleInstructionRowChange  (idx)}
                className="form-control"
              />
            </Grid>
          ))
        } 
        {/* end of conditional for edit - instructions */}

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

     
</div>

  )
}