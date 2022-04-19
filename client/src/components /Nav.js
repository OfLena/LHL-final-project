import "./styles/drawer.scss";

import React, { Fragment, useState } from "react";
import { AppBar, Toolbar, Typography, Tabs, Tab, Button, useMediaQuery, useTheme, } from '@mui/material'
import { Link } from "react-router-dom";
import { createTheme } from '@mui/material/styles';



import SearchBar from "./SearchBar";
import DrawerComp from "./DrawerComp";


const Pages = [<Button 
                component={Link}
                to={'/'}
                sx={{ color: "black"}}
                >Home
                </Button>,
                <Button
                 component={Link}
                 to={'/recipe_form'}
                 sx={{ color: "black"}}
                >Add Recipe
                </Button>,
                <Button
                 sx={{ color: "black"}}
                 component={Link}
                 to={'/profile'}>Profile
                 </Button>];

export default function Nav(props) {

  const { setSearch, search } = props

  
 

const [value, setValue] = useState(0);
 const theme = useTheme({})

const isMatch = useMediaQuery(theme.breakpoints.down('md'))
// console.log(isMatch)

  return (
    <Fragment>
      <AppBar sx={{background: '#CCA01D'}}>
        <Toolbar>
          {
            isMatch ? (
              <>
              <Typography 
              sx={{fontSize:'1.5rem', paddingLeft:'7.5%',}}>
                POTLUCK
              </Typography>
              <SearchBar
              search={search}
              setSearch={setSearch}
              />
              <DrawerComp/>
              </>
            ) : (
              <>
            <Tabs style={{ textDecoration: 'none', color: 'black' }} textColor='black' value={value} onChange={(e, value) => setValue(value)} indicatorColor="black">
              {
                Pages.map((page, index) => (
                  <Tab key={index} label={page}/>
                ))
              }
              {/* <Typography sx={{fontSize: '1.5rem'}} textAlign='center'>
                PotLuck
              </Typography> */}
            </Tabs>
              <SearchBar 
              search={search}
              setSearch={setSearch}
    
              />
          <Button sx={{marginLeft: 'auto', color: "black"}} variant=''>Login</Button>
          <Button sx={{marginLeft: '10px',  color: "black"}}variant=''>Register</Button>
          </>
            )
          }
 
        </Toolbar>
        
      </AppBar>
    </Fragment>
  )
}
