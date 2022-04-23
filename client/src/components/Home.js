// import "./styles/recipe.scss";


import RecipeListItem from "./RecipeListItem";
import Footer from "./Footer";

import { CardMedia, Box, Grid, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const bannerImage = require('./images/victoria-shes-UC0HZdUitWY-unsplash.jpg');

const styles = {
  media: { height: 700,
  maxWidth: 2560,
  backgroundImage: `url(${bannerImage})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  width: '100vw',
  height: '100vh' },
  overlay: {
    position: 'relative',
    top: '20px',
    left: '20px',
    color: 'black',
    backgroundColor: 'white'
 },
};


export default function Home(props) {
  const { user, currentPage, setCurrentPage, state, setState } = props;

  const theme = useTheme();
const matches = useMediaQuery(theme.breakpoints.up('sm'));

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
    <Grid container >
      <Grid item xs={12}
        image={require("./images/victoria-shes-UC0HZdUitWY-unsplash.jpg")}
        alt="Header Picture"
        style={styles.media}>
      <Grid item xs={12}
        sx={{
        position: 'absolute',
        bottom: '35rem',
        left: 0,
        width: '100%',
        bgcolor: 'rgba(0, 0, 0, 0.54)',
        color: 'white',
        padding: '10px'}}>
      <Typography fontFamily={'Bungee Shade'} fontSize={'5rem'}>POTLUCK</Typography>
      <Typography fontSize={'1.75rem'}>Just the Recipes</Typography>
    </Grid>
    </Grid>
      <Grid container spacing={4} align='center'>
        {recipes}
      </Grid>
      <Footer />
    </Grid>
  );
}
