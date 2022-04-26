import "./styles/drawer.scss";

import React, { Fragment, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Button,
  useMediaQuery,
  useTheme,
  Link
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";


import DrawerComp from "./helperComponents/DrawerComp";


const Pages = [
  <Button component={RouterLink} to={"/"} sx={{ color: "black" }}>
    Home
  </Button>,
  <Button component={RouterLink} to={"/recipe_form"} sx={{ color: "black" }}>
    Add Recipe
  </Button>,
  <Button sx={{ color: "black" }} component={RouterLink} to={"/profile"}>
    Profile
  </Button>,
];

export default function NavNoSearch(props) {
  const { setSearch, search, user_id, user_name} = props;
  const [value, setValue] = useState(0);
  const theme = useTheme({});

  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Fragment>
      <AppBar sx={{ background: "#CCA01D" }}>
        <Toolbar>
          {isMatch ? (
            <>
               <Link
                 underline='none'
                 href='/'
                  sx={{'&:hover': {
                    color: 'white',
                  }
                 }}>
              <Typography fontFamily={'Bungee Shade'} sx={{ fontSize: "1.5rem", paddingLeft: "7.5%" }}>
                POTLUCK
              </Typography>
              </Link>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                style={{ textDecoration: "none", color: "black" }}
                textColor="primary"
                value={value}
                onChange={(e, value) => setValue(value)}
                indicatorColor="primary"
              >
                {Pages.map((page, index) => (
                  <Tab key={index} label={page} />
                ))}
              </Tabs>

                  {user_id ? (
                 <Link
                 underline='none'
                 href='/profile'
                 sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  marginLeft: "auto",
                  '&:hover': {
                    color: 'white',
                  }
                 }}>
                 
                  <Typography 
                  fontFamily={'Bungee Shade'}
                  style={{
                    fontSize: "1.8rem",
                  }}
                  > 
                     {user_name} 
                   </Typography>
                 </Link>
              
              ):
              
              <>
              <Button sx={{ marginLeft: "auto", color: "black" }}>
                Login
              </Button>
              <Button sx={{ marginLeft: "10px", color: "black" }} >
                Register
              </Button> 
              </>
              }

            </>
          )}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}
