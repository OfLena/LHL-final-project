// ------------CSS FILES---------- //
import './App.scss';

// ------------DEPENDENCIES---------- //
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';

// ------------COMPONENT IMPORT---------- //
import Nav from './components/Nav';
import Profile from './components/Profile';
import RecipeForm from './components/RecipeForm';
import Home from './components/Home';
import Login from './components/Login';
import RecipeCard from './components/RecipeCard';
import useApplicationData from './components/hooks/AppHooks'


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
  
  const { 
    state,
    setState, 
    currentPage,
    setCurrentPage,
    search,
    setSearch} = useApplicationData();

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
            
            <Route path="/profile" 
            element={<Profile 
              user={state.user} 
              recipes={state.filtered_recipes}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              state={state}
              setState={setState}
              />}
            />
            <Route path="/recipes"
             element={<RecipeCard
            recipes={state.filtered_recipes}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            comments={state.comments}
            state={state}
            setState={setState}
            />}/>

            <Route path="/recipe_form" 
             element={<RecipeForm 
               recipes={state.filtered_recipes}
               user={state.user}
               setState={setState}
               state={state}
               />}
            />

            <Route path="/edit_recipe_form" 
             element={<RecipeForm 
               recipes={state.filtered_recipes}
               user={state.user}
               setState={setState}
               state={state}
               currentPage={currentPage}
               editForm
               />}
            />

            <Route path="/login" element={<Login />}/>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
    </div>
  );
}

export default App;