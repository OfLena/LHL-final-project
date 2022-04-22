import React, { useState, useEffect } from "react";

import axios from "axios";

import {
  Box,
  Grid,
  Card,
  CardHeader,
  TextField,
  Button,
  Avatar,
  Typography,
} from "@mui/material";

export default function CommentList(props) {
  const { comments, currentPage, setCurrentPage, state, setState } = props;

  const [comment, setComment] = useState({
    recipe_id: currentPage,
    user_id: state.user.id,
  });

<<<<<<< HEAD
  function handlePostComment() {
=======
  function postComment() {
>>>>>>> feature/form-work-v7
    Promise.all([axios.post("/comments", comment)])
      .then((all) => {
        setState((prev) => ({ ...prev, comments: [...comments, comment] }));
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }

  function handleDeleteComment() {
    Promise.all([
      axios.post("/comments/delete", {
        [`recipe_id`]: `${currentPage}`,
        [`user_id`]: `${state.user.id}`,
      }),
    ])
      .then((all) => {
        setState((prev) => ({ ...prev, comments: removeComment() }));
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }

  const getCommentToDelete = function () {
    const newCommentArray = comments;
    const test = newCommentArray.filter((val) =>
      currentPage === val.recipe_id ? true : false
    );
    const removeCommentArray = test.filter((comment) =>
      state.user.id === comment.user_id ? true : false
    );
    return removeCommentArray;
  };

  const removeComment = function () {
    const theCommentToDelete = getCommentToDelete();
    const newCommentArray = [];
    comments.map((comment) => {
      if (comment.comment !== theCommentToDelete[0].comment) {
        newCommentArray.push(comment);
      }
    });
    return newCommentArray;
  };

  const user = Object.entries(state.user);

  const findUserNameByUserId = user.map((val, index) => {
    if (val[0] === "id" && val[1] === comments[0].user_id) {
      return state.user.user_name;
    }
  });

  const findCommentByRecipeID = comments.map((comment, index) => {
    if (comment.recipe_id === currentPage) {
      return (
        <Card key={index} sx={{ border: "dotted 1px black", margin: "1rem" }}>
          <Avatar sx={{ bgcolor: "#CCA01D" }} aria-label="recipe">
            {findUserNameByUserId}
          </Avatar>

          <Typography paragraph>{comment.comment}</Typography>
          <Card />

          {state.user.id === comment.user_id && (
            <Button
              type="button"
              variant="contained"
              color="black"
              onClick={handleDeleteComment}
              sx={{ margin: "0.5rem" }}
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

                margin: "2rem 1rem 0rem 2rem",
              }}
            >
              <CardHeader title="Post a Comment" />
              <TextField
                id="filled-multiline-flexable"
                multiline
                fullWidth
                type="text"
                name="Comments"
                // sx={{margin: '0.5rem'}}
                onChange={(e) =>
                  setComment((prev) => ({ ...prev, comment: e.target.value }))
                }
              />
              <Button
                type="button"
                variant="contained"
                color="black"
                onClick={handlePostComment}
                sx={{ margin: "0.5rem" }}
              >
                Submit
              </Button>
              <CardHeader title="Comments" />
              {findCommentByRecipeID}
            </Card>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
