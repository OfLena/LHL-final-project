// ------------CSS FILES---------- //
import "./App.scss";

// ------------DEPENDENCIES---------- //
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Fade } from "@mui/material";

// ------------COMPONENT IMPORT---------- //
import Nav from "./components/Nav";
import NavNoSearch from "./components/NavNoSearch";
import Profile from "./components/Profile";
import RecipeForm from "./components/form/RecipeForm";
import Home from "./components/Home";
import Login from "./components/Login";
import RecipeCard from "./components/RecipeCard";
import useApplicationData from "./components/hooks/AppHooks";
import ScrollToTop from "./components/helperComponents/ScrollToTop";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    yellow: {
      main: "#CCA01D",
      contrastText: "##000000",
    },
    black: {
      main: "#000000",
      contrastText: "#CCA01D",
    },
  },
  typography: {
      fontFamily: [
        'Bungee Shade',
        'Signika Negative'
      ],
    },
});

function App() {
  const { state, setState, currentPage, setCurrentPage, search, setSearch, show} =
    useApplicationData();


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <ScrollToTop />
          <Fade in={show} timeout={3000}>
           <div>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                  <Nav
                  search={search}
                  setSearch={setSearch}
                  recipes={state.recipes}
                  user_id={state.user.id}
                  user_name={state.user.user_name}
                   />

                  <Home
                    recipes={state.filtered_recipes}
                    user={state.user}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setState={setState}
                    state={state}
                  />
                  </>
                }
              />

              <Route
                path="/profile"
                element={
                 <>
                  
                  <NavNoSearch
                  search={search}
                  setSearch={setSearch}
                  recipes={state.recipes}
                  user_id={state.user.id}
                  user_name={state.user.user_name}
                   />

                  <Profile
                    user={state.user}
                    recipes={state.filtered_recipes}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    state={state}
                    setState={setState}
                  />
                  </>
                }
              />
              <Route
                path="/recipes"
                element={
                  <>
                  
                  <NavNoSearch
                  search={search}
                  setSearch={setSearch}
                  recipes={state.recipes}
                  user_id={state.user.id}
                  user_name={state.user.user_name}
                   />

                  <RecipeCard
                    recipes={state.filtered_recipes}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    comments={state.comments}
                    state={state}
                    setState={setState}
                  />
                </>
                }
              />

              <Route
                path="/recipe_form"
                element={
                  <>
                  
                  <NavNoSearch
                  search={search}
                  setSearch={setSearch}
                  recipes={state.recipes}
                  user_id={state.user.id}
                  user_name={state.user.user_name}
                   />
                  <RecipeForm
                    recipes={state.filtered_recipes}
                    user={state.user}
                    setState={setState}
                    state={state}
                  />
                 </>
                }
              />

              <Route
                path="/edit_recipe_form"
                element={
                  <>
                  
                  <NavNoSearch
                  search={search}
                  setSearch={setSearch}
                  recipes={state.recipes}
                  user_id={state.user.id}
                  user_name={state.user.user_name}
                   />

                  <RecipeForm
                    recipes={state.filtered_recipes}
                    user={state.user}
                    setState={setState}
                    state={state}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    editForm
                  />
                </>
                }
              />

              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
      </Fade>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
