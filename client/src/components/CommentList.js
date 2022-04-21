import React, { useState, useEffect } from "react";

import RecipeCard from "./RecipeCard";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Box,
  Grid,
  Card,
  CardHeader,
  TextField,
  Button,
  Avatar,
} from "@mui/material";

export default function CommentList(props) {
  const { comments, currentPage, setCurrentPage, state, setState } = props;

  let navigate = useNavigate();

  const [comment, setComment] = useState({
    recipe_id: [currentPage],
    user_id: [state.user.id],
  });

  console.log('currentpage', currentPage)

  // useEffect(() => {
  //   setState((prev) => ({...prev, comments: [...comments, comment]}))
  // },[comments]);

  function postComment() {
    Promise.all([axios.post("/comments", comment)])
      .then((all) => {
        setState((prev) => ({ ...prev, comments: [...comments, comment] }));
        
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }

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
          <CardHeader
            sx={{ marginRight: "3.3rem" }}
            avatar={
              <Avatar sx={{ bgcolor: "#CCA01D" }} aria-label="recipe">
                {findUserNameByUserId}
              </Avatar>
            }
            title={comment.comment}
          />
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
                className="btn btn-default pull-left"
                onClick={postComment}
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
