import "./styles/recipe.scss";

import RecipeListItem from "./RecipeListItem";
import Footer from "./Footer";


import { CardMedia, Box, Grid, Card, CardHeader } from "@mui/material";

const styles = {
  height: 500,
  maxWidth: 1500,
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
    <Box>
      <CardMedia
        image={require("./images/victoria-shes-UC0HZdUitWY-unsplash.jpg")}
        title="greeting image"
        style={styles}
      />
      {/* <Card>
        <CardHeader 
        title="POTLUCK"
        subheader="Bring Your Friends"
        />
      </Card> */}

      <Grid container spacing={2}>
        {recipes}
      </Grid>
      <Footer />
    </Box>
  );
}
