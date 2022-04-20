import "./styles/recipecard.scss";

import * as React from "react";

import { red } from "@mui/material/colors";

import {
  Container,
  Grid,
  Typography,
  Paper,
  Avatar,
  Box,
  TextField,
  CardMedia,
  CardHeader,
  Card,
} from "@mui/material";

import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import ScaleIcon from "@mui/icons-material/Scale";
import MenuBookIcon from '@mui/icons-material/MenuBook';

import Footer from "./Footer";

export default function RecipeCard(props) {
  const { recipes, currentPage, setCurrentPage } = props;

  const findRecipe = recipes.map((recipe, index) => {
    const filteredRecipes = Object.fromEntries(
      Object.entries(recipe).filter(([_, v]) => v)
    );

    const recipePairs = Object.entries(filteredRecipes);

    console.log('RecipePairs', recipePairs)

    if (filteredRecipes.id === currentPage) {
      return (
        <Box
          key={index}
          marginTop={"8rem"}
          marginBottom={"2rem"}
          sx={{ p: 2, border: "1px solid black", backgroundColor: "#CCA01D" }}
        >
          <Card sx={{ paddingBottom: "2rem", bgcolor: "beige" }}>
            <CardHeader
              title={filteredRecipes.title}
              avatar={
                <Avatar sx={{ bgcolor: "black" }} aria-label="recipe">
                  R
                </Avatar>
              }
            />
            <div
              className="top-card"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <CardMedia
                component="img"
                sx={{ maxWidth: 600 }}
                height="300"
                image={filteredRecipes.image_url}
                alt={filteredRecipes.title}
              />
            </div>
          </Card>
              <Card sx={{ paddingBottom: "2rem", bgcolor: "beige", marginTop: '2rem' }}>
                <CardHeader
                title={"Preparation Time " + filteredRecipes.prep_time}
                subtitle={"Serves " + filteredRecipes.serving_size} />


  
          <Grid container justifyContent={'center'}>
          <Card sx={{ padding: "0.5rem 4rem 2rem 4rem", bgcolor: "beige", marginTop: '2rem' }}>
              <CardHeader title='Ingredients' />
              {recipePairs.map((value, index) => {
                let ingredient;
                if (value[0].includes("ingredient")) {
                  ingredient = value[1];
                  return (
                    <Grid item key={index}>
                      <DinnerDiningIcon/> {ingredient}
                    </Grid>
                  );
                }
              })}
            </Card>
            <Card sx={{ padding: "0.5rem 4rem 2rem 4rem", bgcolor: "beige", marginTop: '2rem' }}>
              
              <CardHeader 
              title="Measurements" />
              {recipePairs.map((value, index) => {
                let measurement;
                if (value[0].includes("measurement")) {
                  measurement = value[1];
                  return (
                    <Grid
                      item
                      key={index}
                      alignSelf="left"
                      
                    >
                      <ScaleIcon /> {measurement}
                    </Grid>
                  );
                }
              })}
            </Card>
            </Grid>

            
              
            <Grid>
            <Card sx={{ padding: "0.5rem 4rem 2rem 4rem", bgcolor: "beige", margin: '2rem 2rem 0rem 2rem' }}>
              <CardHeader
              title="Instructions" />
              {recipePairs.map((value, index) => {
                let instruction;
                if (value[0].includes("instruction")) {
                  instruction = value[1];
                  return (
                    <Grid item key={index}>
                      <MenuBookIcon/> {instruction}
                    </Grid>
                  );
                }
              })}
              </Card>
              
            </Grid>
          
          </Card>
        </Box>
      );
    }
  });

  return <Container>
    {findRecipe}
    <Footer/>
  </Container>;
}
