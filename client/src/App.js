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



function App() {
  
  const [state, setState] = useState({
    users: [],
    recipes: []
  });
   

  useEffect(() => {
    Promise.all([
      axios.get("/users"),
      axios.get("/recipes"),
      
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        users: all[0].data,
        recipes: all[1].data
      }));
    });
  }, []);

  
  return (
    <div className="App">
      <Router>
        <Nav />
        <div>
        
          <Routes>
        
            <Route path="/recipes" element={<RecipeList recipes={state.recipes}/>}/>
                 
            <Route path="/profile" element={<Profile users={state.users}/>}/>

            <Route path="/recipe_list_item" element={<RecipeListItem />}/>

            <Route path="/recipe_form" element={<RecipeForm />}/>
          </Routes>
        </div>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;