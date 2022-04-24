import React, { useState } from "react";

import axios from "axios";

import { v4 as uuidv4 } from "uuid";

import SuccessSnackBar from "./SuccessSnackBar";

import {
  Box,
  Grid,
  Card,
  CardHeader,
  TextField,
  Button,
  Avatar,
  Typography,
  Alert,
  Snackbar,
  Slide,
} from "@mui/material";


import Backdrop from '@mui/material/Backdrop';

import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';



export default function CommentList(props) {
  const { comments, currentPage, state, setState } = props;

  const [value, setValue] = useState("");

  const [comment, setComment] = useState({
    recipe_id: currentPage,
    user_id: state.user.id,
    author_avatar: state.user.avatar,
    author: state.user.user_name,
    date_created: Date.now(),
  });

  function handlePostComment() {
    comment.id = uuidv4();
    axios
      .post("/comments", comment)
      .then((all) => {
        setState((prev) => ({ ...prev, comments: [...comments, comment] }));
      })
      .then(() => {
        setValue("");
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }

  function handleDeleteComment(param) {
    let commentID = param;
    axios
      .post("/comments/delete", {
        [`recipe_id`]: `${currentPage}`,
        [`user_id`]: `${state.user.id}`,
      })
      .then((all) => {
        setState((prev) => ({ ...prev, comments: removeComment(commentID) }));
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }

  //////////// PUSHES COMMENTS WE WANT TO KEEP TO NEW ARRAY FOR COMMENTS STATE //////////

  const removeComment = function (param) {
    const newCommentStateArray = [];
    comments.map((comment) => {
      if (comment.id !== param) {
        newCommentStateArray.push(comment);
      }
    });
    return newCommentStateArray;
  };

  const characterCounter = function (val) {
    let counter = val.length;
    const maxCount = 225;
    if (maxCount - counter === 0) {
      return (
        <Alert variant="filled" severity="yellow">
          Warning Max Characters Reached
        </Alert>
      );
    }
    return maxCount - counter;
  };


  

  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);






  const reversedComments = [...comments].reverse();

  const findCommentByRecipeID = reversedComments.map((comment, index) => {
    function getNumberOfDays(date1, date2) {
      const oneDay = 1000 * 60 * 60 * 24;
      const diffInTime = date1 - date2;
      const diffInDays = Math.round(diffInTime / oneDay);
      if (diffInDays === 0) {
        return "Today";
      }
      return diffInDays + " Days Ago";
    }

    if (comment.recipe_id === currentPage) {
      return (
        <Card
          key={index}
          sx={{ border: "dotted 1px black", margin: "1rem", boxShadow: 20 }}
        >
          <CardHeader
          avatar=
          {<Avatar
            src={`http://localhost:8080/images/${comment.author_avatar}`}/>}
            sx={{ bgcolor: "#CCA01D", margin: "0rem 0rem 0rem 0rem" }}
            aria-label="recipe"
            title={comment.author}
            titleTypographyProps={{align:'center', fontFamily:'bungee', marginRight:'4rem', fontSize:'1.5rem'}}
          />
          

          <Typography
            paragraph
            fontSize={"1.5rem"}
            sx={{
              margin: "0 0 2.5rem 0",
              wordWrap: "break-word",
              padding: "1rem",
            }}
          >
            "{comment.comment}"
          </Typography>
          <Typography align="right" marginRight={'2rem'}>
            Posted {" "}
            {getNumberOfDays(Date.now(), comment.date_created)}
          </Typography>
          <Card />

          {state.user.id === comment.user_id && (

          
              <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2" color='black'>
              Are you sure you want to Delete this post?
            </Typography>
            <Button
              type="button"
              variant="contained"
              color="black"
              onClick={() => {
                handleDeleteComment(comment.id);
              }}
              sx={{ margin: "0.5rem", padding: "2 2rem 2 2rem" }}
            >
              Delete
            </Button>
              
          </Box>
        </Fade>
      </Modal>
    </div>
    )}
        </Card>
      );
    }
  });

  return (
    <Box container>
      <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card
              sx={{
                padding: "0.5rem 4rem 2rem 4rem",
                boxShadow: 20,
                margin: "2rem 1rem 0rem 2rem",
                borderRadius: "1rem",
              }}
            >
              <CardHeader
                sx={{  margin: "0rem 0rem 0rem 0rem", borderRadius:'1rem', marginBottom:'1rem' }}
                titleTypographyProps={{
                  fontSize: "2rem",
                  fontFamily: "Bungee",
                }}
                title="Post a Comment"
              />

              <TextField
                id="filled-multiline-flexable"
                multiline={true}
                rows={3}
                fullWidth
                borderRadius="1rem"
                type="text"
                name="Comments"
                value={value}
                inputProps={{ style: { fontSize: 25 }, maxLength: 225 }}
                onChange={(e) => {
                  setValue(e.target.value);
                  setComment((prev) => ({ ...prev, comment: e.target.value }));
                }}
              />
              <Grid container justifyContent={"space-between"}>
              
                <Grid item
                  type="button"
                  variant="contained"
                  color="black"
                  onClick={handlePostComment}
                  sx={{ margin: "1rem", padding: "0 2rem 0 2rem", border: '1px solid black', background: 'black' }}
                >
                  <SuccessSnackBar />
                  </Grid>
                
                <Grid
                  item
                  sx={{
                    fontSize: "2rem",
                  }}
                >
                  {characterCounter(value)}
                </Grid>
              </Grid>

              <CardHeader
                titleTypographyProps={{
                  fontSize: "2rem",
                  fontFamily: "Bungee",
                }}
                title="Comments"
              />
              {findCommentByRecipeID}
            </Card>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
