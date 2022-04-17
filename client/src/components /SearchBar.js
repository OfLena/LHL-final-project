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
  console.log("SEARCH--->", search);

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

  function onClickSearch() {
    // need to query the current recipes populated (either favourites or your recipes) and find the recipes that match the text and populate those recipes
  }

  return (
    // <div>

    //   <form onSubmit ={e => e.preventDefault()}>
    //     <input
    //       type="text"
    //       // value={}
    //       onChange={(event) => setSearch(event.target.value)}
    //       value={search}
    //       placeholder="E.g. Vegetarian"
    //     />
    //     <button>Search</button>
    //   </form>
    // </div>
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        />
        <Search
        onChange ={e => e.preventDefault()}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            
            inputProps={{ "aria-label": "search" }}
            type="text"
            onChange={(event) => setSearch(event.target.value)}
            value={search}
            placeholder="Search..."
          />
        </Search>
      </Toolbar>
    </Box>
  );
}