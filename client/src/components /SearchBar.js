import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import { TextField } from "@mui/material";

import { useState } from "react";

export default function SearchBar(props) {
  const {} = props;
  const [search, setSearch] = useState("");
  
  const MyInput = ({search, onChange}) => (
    <div>
      <input value={search} onChange={onChange} onKeyPress={onClickSearch}/>
    </div>
  );

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  function handleSearch(event) {
    setSearch(event.target.value)
  };

  function onClickSearch(event) {
    if (event.key === "Enter"){
      console.log('Hello!')
    }
    // need to query the current recipes populated (either favourites or your recipes) and find the recipes that match the text and populate those recipes
  }

  return (
    // <Box sx={{ flexGrow: 1 }}>
    //   <Toolbar>
        
    //   <form onSubmit ={e => e.preventDefault()}>
    //     <input
    //       type="text"
    //       onChange={handleSearch}
            
    //       onKeyPress={onClickSearch}
          
    //       value={search}
    //       placeholder="E.g. Vegetarian"
    //     />
    //   </form>
      
    //   </Toolbar>
    // </Box>
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        />
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
          inputProps={{ "aria-label": "search" }}>
            <MyInput
            
            
            // type="text"
            // name="recipe"
            // placeholder="Search..."
            
            onChange={event => setSearch(event.target.value)}
            value={search}
       
            
           />
            </StyledInputBase>
        </Search>
      </Toolbar>
      </form>
    </Box>
  );
}