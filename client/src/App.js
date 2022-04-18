// ------------CSS FILES---------- //
import './App.scss';


// ------------DEPENDENCIES---------- //
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import axios from 'axios'
// import { useCookies } from 'react-cookie';



// ------------COMPONENT IMPORT---------- //
import Nav from './components /Nav';
import Footer from './components /Footer';
import RecipeList from './components /RecipeList';
import Profile from './components /Profile';
import RecipeListItem from './components /RecipeListItem';
import RecipeForm from './components /RecipeForm';
import Home from './components /Home';
import Login from './components /Login';


function App() {
  
  const [state, setState] = useState({
    user: [],
    user_recipes: [],
    recipes: [],
    filtered_recipes: [],
    favs: []
  });

  const [search, setSearch] = useState('')


  useEffect(() => {
  
    setState((prev) => ({...prev, filtered_recipes: [...state.recipes.filter((val) =>{
      if (search === '') {
        return val
      } else if (val.title.toLowerCase().includes(search.toLowerCase())) {
        return val 
      }
    })]
    }))}, [search])
  
  

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
      <Router>
        <Nav
        search={search}
        setSearch={setSearch} 
        recipes={state.recipes}
        />
        <div>
          <Routes>
            <Route path="/" element={<Home recipes={state.filtered_recipes} user={state.user}/>}/>
            <Route path="/recipes" element={<RecipeList recipes={state.filtered_recipes}/>}/>
            <Route path="/profile" element={<Profile user={state.user} userRecipes={state.user_recipes} favs={state.favs}/>}/>
            <Route path="/recipe_form" element={<RecipeForm recipes={state.recipes} user={state.user}/>}/>
            <Route path="/login" element={<Login />}/>
          </Routes>
        </div>

      </Router>
      
    </div>
  );
}

export default App;