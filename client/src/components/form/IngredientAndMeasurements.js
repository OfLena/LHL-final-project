import { Grid, TextField, InputAdornment } from "@mui/material";

import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import ScaleIcon from "@mui/icons-material/Scale";

export default function IngredientAndMeasurement({
  ingredientRows,
  handleIngredientRowChange,
}) {
  return ingredientRows.map((item, idx) => (
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
  ));
}
