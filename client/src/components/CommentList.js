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
          <Avatar
            src={`http://localhost:8080/images/${comment.author_avatar}`}
            sx={{ bgcolor: "#CCA01D", margin: "1rem 0rem 0rem 1rem" }}
            aria-label="recipe"
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
          <Typography>
            Posted By {comment.author}{" "}
            {getNumberOfDays(Date.now(), comment.date_created)}
          </Typography>
          <Card />

          {state.user.id === comment.user_id && (
            <Button
              type="button"
              variant="contained"
              color="black"
              onClick={() => {
                handleDeleteComment(comment.id);
              }}
              sx={{ margin: "0.5rem", padding:'2 2rem 2 2rem' }}
            >
              Delete
            </Button>
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
                titleTypographyProps={{
                  fontSize: "2rem",
                  fontFamily: "Signika Negative",
                }}
                title="Post a Comment"
              />

              <TextField
                id="filled-multiline-flexable"
                multiline
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
              <Grid container justifyContent={'space-between'}>
                <Button
                  type="button"
                  variant="contained"
                  color="black"
                  onClick={
                    handlePostComment}
                  sx={{ margin: "1rem", padding:'0 2rem 0 2rem' }}
                >
        
        <SuccessSnackBar />
                </Button>
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
                  fontFamily: "Signika Negative",
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
