import "./styles/recipe.scss";

import RecipeListItem from "./RecipeListItem";
import Footer from "./Footer";

import { CardMedia, Box, Grid, Typography } from "@mui/material";


const styles = {
  media: { height: 700,
  maxWidth: 2400 },
  overlay: {
    position: 'relative',
    top: '20px',
    left: '20px',
    color: 'black',
    backgroundColor: 'white'
 }
};


export default function Home(props) {
  const { user, currentPage, setCurrentPage, state, setState } = props;

  const recipes = props.recipes.map((recipe) => {
    return (
      <RecipeListItem
        setState={setState}
        state={state}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        key={recipe.id}
        recipe_id={recipe.id}
        title={recipe.title}
        user_id={user.id}
        user_name={user.user_name}
        image_url={recipe.image_url}
        prep_time={recipe.prep_time}
        serving_size={recipe.serving_size}
      />
    );
  });

  return (
    <Box container>
      <CardMedia
        image={require("./images/victoria-shes-UC0HZdUitWY-unsplash.jpg")}
        alt="Header Picture"
        style={styles.media}
      />
        <Box
      sx={{
        position: 'absolute',
        bottom: '15rem',
        left: 0,
        width: '100%',
        bgcolor: 'rgba(0, 0, 0, 0.54)',
        color: 'white',
        padding: '10px',
      }}
    >
      <Typography fontFamily={'Bungee Shade'} variant="h1">POTLUCK</Typography>
      <Typography variant="body2">Fuck your Couch</Typography>
    </Box>

      <Grid container spacing={2}>
        {recipes}
      </Grid>
      <Footer />
    </Box>
  );
}
