import * as React from "react";

import PhoneIphone from "@mui/icons-material/PhoneIphone";

import { Button } from "@mui/material";

import axios from "axios";


export default function TextMessageButton(props) {


  const sendShoppingList = function () {

      axios.post("http://localhost:8080/sms")
      .then((res) => {
        console.log('SENT')
        })
      .catch((err) => {
        console.log("ERR", err);
      });

  }


  return (
    
      <Button 
      sx={{color: 'black'}}
      onClick={sendShoppingList}
      ><PhoneIphone sx={{fontSize:'4rem', marginTop:'1rem'}} aria-label="settings"/></Button>
    
  );
}
