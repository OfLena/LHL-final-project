const router = require("express").Router();

module.exports = (db) => {
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
    const wrappedValues = deleteCommentValue.map((elem) => `'${elem}'`);
    console.log("here", wrappedValues);
    const deleteComment = `DELETE FROM comments WHERE id = (${wrappedValues[0]})`;

    db.query(deleteComment).then((data) => {
      res.json(data.rows);
    });
  });

  return router;
};
