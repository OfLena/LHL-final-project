import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import { SnackbarContent } from '@mui/material';


function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function SuccessSnackBar() {
  const [snackState, setSnackState] = useState({
    open: false,
    Transition: Fade,
  });

  const handleClick = (Transition) => () => {
    setSnackState({
      open: true,
      Transition,
    });
  };

  const handleClose = () => {
    setSnackState({
      ...snackState,
      open: false,
    });
  };

  return (
    <div>
      <Button onClick={handleClick(SlideTransition)} color='yellow'>Submit</Button>
      <Snackbar
        autoHideDuration={6000}
        open={snackState.open}
        onClose={handleClose}
        TransitionComponent={snackState.Transition}
        message=""
        key={snackState.Transition.name}
      >
        <SnackbarContent style={{
      backgroundColor:'green',
      justifyContent:'center'
    }}
    message={<span id="client-snackbar">Comment Posted Successfully</span>}
  />
  </Snackbar>
    </div>
  );
}