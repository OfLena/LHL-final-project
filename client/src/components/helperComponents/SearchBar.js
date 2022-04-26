import * as React from "react";

import { styled, alpha } from "@mui/material/styles";

import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

export default function SearchBar(props) {
  const { setSearch, search } = props;

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

      paddingLeft: `calc(1em + ${theme.spacing(4)})`,

      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "25ch",
      },
    },
  }));

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  return (
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
            <LocalDiningIcon color="black" />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search..."
            inputRef={(input) => input && input.focus()}
            onChange={handleSearch}
            value={search}
          ></StyledInputBase>
        </Search>
      </Toolbar>
    </form>
  );
}
