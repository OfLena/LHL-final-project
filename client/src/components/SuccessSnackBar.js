import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import { SnackbarContent } from '@mui/material';


function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function SuccessSnackBar() {
  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  });

  const handleClick = (Transition) => () => {
    setState({
      open: true,
      Transition,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return (
    <div>
      <Button onClick={handleClick(SlideTransition)} color='yellow'>Submit</Button>
      <Snackbar
        autoHideDuration={6000}
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        message=""
        key={state.Transition.name}
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