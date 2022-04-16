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


// ------------COMPONENT IMPORT---------- //
import Nav from './components /Nav';
import Footer from './components /Footer';
import RecipeList from './components /RecipeList';
import Profile from './components /Profile';
import RecipeListItem from './components /RecipeListItem';
import RecipeForm from './components /RecipeForm';
import Home from './components /Home';


function App() {
  
  const [state, setState] = useState({
    users: [],
    recipes: [],
    favs: []
  });
   

  useEffect(() => {
    Promise.all([
      axios.get("/users"),
      axios.get("/recipes"),
      axios.get("/favs")
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        users: all[0].data,
        recipes: all[1].data,
        favs: all[2].data
      }));
    });
  }, []);

  
  return (
    <div className="App">
      <Router>
        {/* <Nav /> */}
        <div>
          <Routes>
            <Route path="/" element={<Home recipes={state.recipes}/>}/>
            <Route path="/recipes" element={<RecipeList recipes={state.recipes}/>}/>
            <Route path="/profile" element={<Profile users={state.users} recipes={state.recipes} favs={state.favs}/>}/>
            <Route path="/recipe_form" element={<RecipeForm recipes={state.recipes} />}/>
          </Routes>
        </div>

      </Router>
      
    </div>
  );
}

export default App;