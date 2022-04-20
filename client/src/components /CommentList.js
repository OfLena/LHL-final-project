import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Box,
  Grid,
  Card,
  CardHeader,
  TextField,
  Button,
} from "@mui/material";

export default function CommentList(props) {
  const { comments, currentPage, state, setState } = props;

  let navigate = useNavigate();

  const [comment, setComment] = useState({
    recipe_id: [currentPage],
    user_id: [state.user.id],
  });

  function postComment() {
    Promise.all([axios.post("/comments", comment)])
      .then((all) => {
        setState((prev) => ({ ...prev, comments: [...comments, comment] }));
        navigate(`/`);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }
  const findCommentByRecipeID = comments.map((comment, index) => {
    if (comment.recipe_id === currentPage) {
      return (
        <Grid item xs={12} key={index}>
          {comment.comment}
        </Grid>
      );
    }
  });

  return (
    <Box container>
      <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Post a Comment" />
              <TextField
                id="filled-multiline-flexable"
                multiline
                fullWidth
                label="Post a Comment"
                type="text"
                name="Comments"
                onChange={(e) =>
                  setComment((prev) => ({ ...prev, comment: e.target.value }))
                }
              />
              <Button
                type="button"
                variant="contained"
                color="black"
                className="btn btn-default pull-left"
                onClick={postComment}
              >
                Submit your Comment
              </Button>

              <CardHeader title="Comments!" />
              {findCommentByRecipeID}
            </Card>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
