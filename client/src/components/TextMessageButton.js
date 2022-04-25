import * as React from "react";


import SendIcon from '@mui/icons-material/Send';

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
      ><SendIcon/></Button>
    
  );
}
