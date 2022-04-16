import React, { Fragment, useState } from "react";
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuBookIcon from '@mui/icons-material/MenuBook';


const Pages = ["Home", "Recipes", "Profile", "About Us", "Contact Us", "Login", "Logout"];

export default function DrawerComp() {

  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <Fragment>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
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
      <IconButton sx={{color:'white', marginLeft: 'auto'}} onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuBookIcon/>
      </IconButton>
    </Fragment>
  )
}