import './App.scss';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import axios from 'axios'


import Nav from './components /Nav';
import Footer from './components /Footer';
import RecipeList from './components /RecipeList';
import Profile from './components /Profile';
import RecipeListItem from './components /RecipeListItem';

function App() {
  
  const [users, setUsers] = useState([]) 

  useEffect(() => {
    // for demo purposes, hardcoded URL
    axios.get('/users').then(res => {
      console.log(res.data);
      setUsers(res.data)
    })
  }, [])

  return (
    <div className="App">
      <Router>
        <Nav />
        <div>
          <Routes>
            
            <Route path="/recipes" element={<RecipeList />}/>
                 
            <Route path="/profile" element={<Profile users={users}/>}/>

            <Route path="/recipe_list_item" element={<RecipeListItem />}/>

          </Routes>
        </div>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;