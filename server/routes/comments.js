const router = require("express").Router();

module.exports = (db) => {
  // all routes will go here
  router.get("/", (req, res) => {
    const comments = "SELECT * FROM comments";

    db.query(comments).then((data) => {
      res.json(data.rows);
    });
  });

  router.post("/", (req, res) => {
    const commentKey = Object.keys(req.body);
    const commentValue = Object.values(req.body);
    const wrappedValues = commentValue.map((elem) => `'${elem}'`);
    const insertComment = `INSERT INTO comments (${commentKey}) VALUES (${wrappedValues})`;

    db.query(insertComment).then((data) => {
      res.json(data.rows);
    });
  });

  router.post("/delete", (req, res) => {
    const deleteCommentValue = Object.values(req.body);
    console.log('DELETECOMMENT', deleteCommentValue)
    const wrappedValues = deleteCommentValue.map((elem) => `'${elem}'`);
    console.log('WRAPPEDVALUES ZERO', wrappedValues[0])
    console.log('WRAPPEDVALUES ONE', wrappedValues[1])

    const deleteComment = `DELETE FROM comments WHERE recipe_id = (${wrappedValues[0]}) AND user_id = (${wrappedValues[1]})`
  
    db.query(deleteComment).then(data => {
      res.json(data.rows);
    })
  });

  return router;
};
