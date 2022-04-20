// ------------CSS FILES---------- //
import './App.scss';


// ------------DEPENDENCIES---------- //
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'



// ------------COMPONENT IMPORT---------- //
import Nav from './components /Nav';
import Profile from './components /Profile';
import RecipeForm from './components /RecipeForm';
import Home from './components /Home';
import Login from './components /Login';
import RecipeCard from './components /RecipeCard';



const theme = createTheme({
  palette: {

    primary:{
      main: '#000000',
    
    },
    yellow: {
      main: '#CCA01D',
      contrastText: '##000000',
    },
    black: {
      main: '#000000',
      contrastText: '#CCA01D',
    },
  },
});


function App() {
  
  const [state, setState] = useState({
    user: [],
    user_recipes: [],
    recipes: [],
    filtered_recipes: [],
    favs: []
  });

  const [currentPage, setCurrentPage] = useState('')
  const [search, setSearch] = useState('')


  const filterRecipes = function() {

  
    let searchTerm = search;

    let searchArray = searchTerm.trim().split(" ");
    
    let re = new RegExp(searchArray.join("|"), "i");
    
    let resultsObj = [...state.recipes.filter(recipe =>
    re.test(recipe.title))
    ]
  
    return resultsObj
  }
  


  useEffect(() => {
    setState((prev) => ({...prev, filtered_recipes: filterRecipes()}))
  }, [search])
  
  

  useEffect(() => {
    Promise.all([
      axios.get("/users/1"),
      axios.get("/recipes/1"),
      axios.get("/recipes"),
      axios.get("/favs")
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        user: all[0].data,
        user_recipes: all[1].data,
        recipes: all[2].data,
        filtered_recipes: all[2].data,
        favs: all[3].data
      }));
    });
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>

      <Router>
        <Nav
        search={search}
        setSearch={setSearch} 
        recipes={state.recipes}
        />
        <div>
          <Routes>
            <Route path="/" 
              element={
                <Home 
                  recipes={state.filtered_recipes}
                  user={state.user}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  setState={setState}
                  state={state}
                 />}
             />
            {/* <Route path="/recipes" element={<RecipeList recipes={state.filtered_recipes}/>}/> */}
            <Route path="/profile" 
            element={<Profile 
              user={state.user} 
              userRecipes={state.user_recipes} 
              // favs={state.favs}
              state={state}
              setState={setState}
              />}
            />
            <Route path="/recipes"
             element={<RecipeCard
            recipes={state.filtered_recipes}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            />}/>

            <Route path="/recipe_form" 
             element={<RecipeForm 
               recipes={state.filtered_recipes}
               user={state.user}
               setState={setState}
               state={state}
          
               />}
            />
            <Route path="/login" element={<Login />}/>
          </Routes>
        </div>
      {/* <Footer/> */}
      </Router>
              </ThemeProvider>
    </div>
  );
}

export default App;