import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom"

import { Drawer, IconButton, List, ListItemButton, Button, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';


const Pages = [<Button 
                  sx={{ color: "black"}}
                  component={Link}
                  to={'/'}
                  >Home
                </Button>,
                <Button
                  sx={{ color: "black"}} 
                  component={Link} 
                  to={'/recipe_form'}
                  >Add Recipe
                </Button>,
                <Button 
                  sx={{ color: "black"}}
                  component={Link}
                  to={'/profile'}
                  >Profile
                </Button>];


export default function DrawerComp() {

  const [openDrawer, setOpenDrawer] = useState(false)
  
  return (
    <Fragment>
      <Drawer  open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          {
            Pages.map((page, index) => (
              <ListItemButton onClick={() => setOpenDrawer(false)} key={index}>
              <ListItemIcon>
                <ListItemText>
                  {page}
                </ListItemText>
              </ListItemIcon>
            </ListItemButton>
            ))
          }

        </List>
      </Drawer>
      <IconButton sx={{color:'black', marginLeft: 'auto'}} onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon/>
      </IconButton>
    </Fragment>
  )
}