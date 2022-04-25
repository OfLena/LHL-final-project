import "./styles/youtube.scss";
import React, { useEffect } from "react";

import {
  Container,
  Grid,
  Avatar,
  Box,
  CardMedia,
  CardHeader,
  Card,
  FormControlLabel,
  Button,
  Tooltip
} from "@mui/material";

import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import ScaleIcon from "@mui/icons-material/Scale";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import YoutubeEmbed from "./YoutubeEmbed";
import Footer from "./Footer";
import CommentList from "./CommentList";
import TextMessageButton from "./TextMessageButton";

export default function RecipeCard(props) {
  const { recipes, currentPage, comments, state, setState } = props;

    // Map Over All Recipes in Database
    const findRecipe = recipes.map((recipe, index) => {
    // Filter Out All Key/Value Pairs where the Value is Falsey
    const filteredRecipes = Object.fromEntries(
      Object.entries(recipe).filter(([_, v]) => v)
    );

    console.log("FILTERED RECIPES", filteredRecipes)

    //Return Array of All filteredRecipes
    const recipePairs = Object.entries(filteredRecipes);
    const image = `http://localhost:8080/images/${filteredRecipes.image_url}`;

    //If the recipe ID matches the CurrentPage state (which is set to the recipe_id that the user clicks on home page)
    if (filteredRecipes.id === currentPage) {
      const thisAvatar = `http://localhost:8080/images/${recipe.avatar}`;

      // GET ALL KEY:VALUE PAIRS WITH INGREDIENTS
      const findIngredients = recipePairs.filter((item) =>
        item[0].includes("ingredient") ? item : false
      );
      // GET ALL KEY:VALUE PAIRS WITH MEASUREMENTS
      const findMeasurements = recipePairs.filter((item) =>
        item[0].includes("measurement") ? item : false
      );

      //GENERATE A NEW OBJ WITH INGREDIENTS AND MEASUREMENTS COMBINED
      function generateIngMeasObj(ingredients, measurements) {
        return ingredients.map((ingredient, idx) => ({
          ingredient: ingredient[1],
          measurement: measurements[idx][1],
        }));
      }

      //CALL THIS VARIABLE IN RETURN TO RENDER MEASUREMENTS AND INGREDIENTS ON SAME TABLE
      const combinedIngMeasObj = generateIngMeasObj(
        findIngredients,
        findMeasurements
      );

      return (
        <Box
          key={index}
          marginTop={"8rem"}
          marginBottom={"2rem"}
          sx={{
            p: 2,
            border: "1px solid black",
            background: "#CCA01D",
            borderRadius: "1rem",
          }}
        >
          <Card sx={{ paddingBottom: "2rem", borderRadius: "1rem" }}>
            <CardHeader
              titleTypographyProps={{
                marginRight: "0rem",
                fontSize: "4rem",
                fontFamily: "Bungee Shade",
              }}
              title={filteredRecipes.title}
              avatar={
                <Avatar
                  src={thisAvatar}
                  sx={{ bgcolor: "black", width: "5rem", height: "5rem" }}
                  aria-label="recipe"
                />
              }
              action={
                <Tooltip arrow title={<h1 style={{ color: "yellow" }}>Text the Recipe</h1>}>
                <Button>
                <PhoneIphoneIcon sx={{fontSize:'4rem', marginTop:'1rem'}} aria-label="settings"
                onClick={<TextMessageButton/>}
                />
                </Button>
                </Tooltip>
              }
            />

            
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CardMedia
                component="img"
                sx={{
                  maxWidth: 600,
                  border: "1px solid black",
                  boxShadow: 10,
                  borderRadius: "1rem",
                }}
                height="300"
                image={image}
                alt={filteredRecipes.title}
              />
            
            </div>
            <Card
              align={"center"}
              sx={{
                padding: "1rem 0rem 1rem 0rem",
                marginLeft: "2rem",
                marginRight: "2rem",
                boxShadow: 4,
                marginTop: "2rem",
                borderRadius: "1rem",
              }}
            >
              {recipePairs.map((value, index) => {
                const test = [
                  "vegan",
                  "vegetarian",
                  "keto",
                  "breakfast",
                  "lunch",
                  "dinner",
                  "dairy_free",
                  "gluten_free",
                ];
                let val;
                if (test.includes(value[0])) {
                  val = value[0].replace("_", " ");
                  const upperCaseVal =
                    val.charAt(0).toUpperCase() + val.slice(1);

                  return (
                    <FormControlLabel
                      control={<CheckCircleOutlineIcon />}
                      key={index}
                      label={upperCaseVal}
                      labelPlacement="top"
                      value={upperCaseVal}
                      name="tag"
                      color="yellow"
                    />
                  );
                }
              })}
            </Card>
          </Card>
          <Card
            sx={{
              padding: "2rem 0rem 2rem 0rem",
              borderRadius: "1rem",
              marginTop: "2rem",
            }}
          >
            <CardHeader
              titleTypographyProps={{ fontSize: "2rem", fontFamily: "Bungee" }}
              title={"Preparation Time " + filteredRecipes.prep_time}
              subheaderTypographyProps={{
                fontSize: "1.5rem",
                fontFamily: "Signika Negative",
              }}
              subheader={"Serves " + filteredRecipes.serving_size}
            />

            <div className="App">
              <YoutubeEmbed embedId={filteredRecipes.video_link} />
            </div>

            <Grid container justifyContent={"center"}>
              <Card
                sx={{
                  padding: "0.5rem 15rem 2rem 15rem",
                  boxShadow: 10,
                  marginTop: "2rem",
                  borderRadius: "1rem",
                }}
              >
                <CardHeader
                  titleTypographyProps={{
                    fontSize: "2rem",
                    fontFamily: "Bungee",
                  }}
                  title="Ingredients"
                />
                {combinedIngMeasObj.map((value, index) => {
                  return (
                    
                    <Grid item key={index} xs={12} align="left" fontSize={"1.5rem"}>
                    <li>{value.measurement} of {value.ingredient}</li>
                    </Grid>
                    
                  );
                })}
              </Card>
            </Grid>

            <Grid>
              <Card
                sx={{
                  padding: "0.5rem 4rem 2rem 4rem",
                  boxShadow: 10,
                  margin: "2rem 2rem 0rem 2rem",
                  borderRadius: "1rem",
                }}
              >
                <CardHeader
                  titleTypographyProps={{
                    fontSize: "2rem",
                    fontFamily: "Bungee",
                  }}
                  title="Instructions"
                />
                <ol>
                  {recipePairs.map((value, index) => {
                    let instruction;
                    if (value[0].includes("instruction")) {
                      instruction = value[1];
                      return (
                        <Grid item key={index} fontSize={"1.5rem"}>
                          {/* <MenuBookIcon /> */} <li> {instruction} </li>
                        </Grid>
                      );
                    }
                  })}
                </ol>
              </Card>
            </Grid>
            <CommentList
              comments={comments}
              currentPage={currentPage}
              state={state}
              setState={setState}
            />
          </Card>
        </Box>
      );
    }
  });

  return (
    <Container>
      {findRecipe}
      <Footer />
    </Container>
  );
}
