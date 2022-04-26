import "./styles/home.scss";


import RecipeListItem from "./RecipeListItem";
import Footer from "./Footer";

import {  Grid, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useRef } from "react";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const bannerImage = require('./images/egg.jpeg');

const styles = {
  media: {
  maxWidth: 2560,
  backgroundImage: `url(${bannerImage})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  width: '100vw',
  height: '100vh' }
};


export default function Home(props) {
  const { user, currentPage, setCurrentPage, state, setState } = props;

  const recipesStart = useRef(null)

const reversedRecipes = [...props.recipes].reverse()  


const scrollDown = () => { 
  recipesStart.current.scrollIntoView({ behavior: "smooth", block: "end" })
  
}



useEffect(() => {
  
  const faders = document.querySelectorAll(".MuiGrid-item");
  const appearOptions = {
    threshold: 1,
    rootMargin: "100px"
  };
  
  const appearOnScroll = new IntersectionObserver(function(
    entries,
    appearOnScroll
  ) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("appear");
        appearOnScroll.unobserve(entry.target);
      }
    });
  },
  appearOptions);

  
  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
      
}, [state])







const theme = useTheme();
const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const recipes = reversedRecipes.map((recipe) => {
    return (
      
      <RecipeListItem
      className="fade-in"
        setState={setState}
        state={state}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        key={recipe.id}
        recipe_id={recipe.id}
        title={recipe.title}
        user_id={user.id}
        user_name={user.user_name}
        author={recipe.recipe_user_name}
        image_url={recipe.image_url}
        prep_time={recipe.prep_time}
        serving_size={recipe.serving_size}
        avatar={recipe.avatar}
      />
    
  
    );
  });

  return (
      <div className="fader-cards">
      <Grid container >
      <Grid item xs={12}
        alt="Header Picture"
        style={styles.media}>
      <Grid item xs={12}
        sx={{
        position: 'absolute',
        bottom: '30rem',
        left: 0,
        width: '100%',
        color: 'black',
        padding: '10px'}}>
      <Typography style={{color: "black"}} fontFamily={'Bungee Shade'} fontSize={'8rem'}>POTLUCK</Typography>
      <Typography style={{color: "black"}} fontSize={'3rem'}>... Just the Recipes</Typography>
    </Grid>
    <div className="bounce">
    <Grid item xs={12}
        sx={{
        position: 'absolute',
        bottom: '1rem',
        left: 0,
        width: '100%',
        bgcolor: 'rgba(0, 0, 0, 0.0)',
        color: 'white',
        padding: '1px'}}>
      
      <Typography onClick={scrollDown} fontSize={'4rem'}> 
        <ArrowDownwardIcon fontSize="inherit" color="black"/>
      </Typography>
    </Grid>
    </div>
    </Grid>
        
      
        <Grid container spacing={4} align={"center"} sx={     {marginTop:'2rem'}}>
        <div ref={recipesStart} />
          
          {recipes}
        </Grid>
      <Footer />
    </Grid>
    </div>
  );
}
