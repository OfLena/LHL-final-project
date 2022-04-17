// import "./styles/nav.scss";

// import Button from '@mui/material/Button';

// import { Link } from "react-router-dom";

// export default function Nav(props) {
//   return (
//     <div class="navbar">
//       <div class="home-link">  
//       <Link to="/">Home</Link>
//       <Button variant="contained" color="primary">
//       Hello World
//     </Button>
//       </div>
//       <p class="project-name">PotLuck</p>
//       <div class="dropdown">
//         <button class="dropbtn">Dropdown
//           <i class="fa fa-caret-down"></i>
//         </button>
//         <div class="dropdown-content">
//           <Link to="/profile">Profile</Link>
//           <Link to="/recipe_form">Recipe Form</Link>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { Fragment, useState } from "react";
import { AppBar, Toolbar, Typography, Tabs, Tab, Button, useMediaQuery, useTheme } from '@mui/material'
import { Link } from "react-router-dom";


import SearchBar from "./SearchBar";
import DrawerComp from "./DrawerComp";


const Pages = [<Button component={Link} to={'/'}>Home</Button>,
                <Button component={Link} to={'/recipe_form'}>Add Recipe</Button>,
                <Button component={Link} to={'/profile'}>Profile</Button>];

export default function Nav(props) {


const [value, setValue] = useState(0);
const theme = useTheme()
// console.log(theme)
const isMatch = useMediaQuery(theme.breakpoints.down('md'))
// console.log(isMatch)

  return (
    <Fragment>
      <AppBar sx={{background: '#063970'}}>
        <Toolbar>
          {
            isMatch ? (
              <>
              <Typography sx={{fontSize:'1.5rem', paddingLeft:'7.5%'}}>
                POTLUCK
              </Typography>
              <SearchBar/>
              <DrawerComp/>
              </>
            ) : (
              <>
            <Tabs style={{ textDecoration: 'none' }} textColor='inherit' value={value} onChange={(e, value) => setValue(value)} indicatorColor='secondary'>
              {
                Pages.map((page, index) => (
                  <Tab key={index} label={page}/>
                ))
              }
              {/* <Typography sx={{fontSize: '1.5rem'}} textAlign='center'>
                PotLuck
              </Typography> */}
            </Tabs>
              <SearchBar/>
          <Button sx={{marginLeft: 'auto'}} variant='contained'>Login</Button>
          <Button sx={{marginLeft: '10px'}}variant='contained'>Register</Button>
          </>
            )
          }
 
        </Toolbar>
        
      </AppBar>
    </Fragment>
  )
}
