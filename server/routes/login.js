const router = require("express").Router();

module.exports = (db) => {
  // all routes will go here
  // router.post('/', (req, res) => {
  //   const username = req.body.username;
  //   const password = req.body.password;

  //   const users = "SELECT * FROM users WHERE username = ?"

  //   db.query(users).then(data => {

  //     res.json(data.rows);
  //   })
  // });

  return router;
};
