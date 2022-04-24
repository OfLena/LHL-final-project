import React, { useState } from "react";

import axios from "axios";

import { v4 as uuidv4 } from "uuid";

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
  const { comments, currentPage, state, setState } = props;

  const [value, setValue] = useState("");

  const [comment, setComment] = useState({
    recipe_id: currentPage,
    user_id: state.user.id,
    author_avatar: state.user.avatar,
    author: state.user.user_name,
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

  const reversedComments = [...comments].reverse();

  const findCommentByRecipeID = reversedComments.map((comment, index) => {
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
            sx={{ margin: "0 0 2.5rem 0" }}
          >
            {comment.comment}
          </Typography>
          <Typography>Posted By {comment.author}</Typography>
          <Card />

          {state.user.id === comment.user_id && (
            <Button
              type="button"
              variant="contained"
              color="black"
              onClick={() => {
                handleDeleteComment(comment.id);                
              }}
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
                type="text"
                name="Comments"
                value={value}
                // sx={{margin: '0.5rem'}}
                onChange={(e) => {
                  setValue(e.target.value);
                  setComment((prev) => ({ ...prev, comment: e.target.value }));
                }}
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
