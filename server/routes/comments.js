const router = require('express').Router();

module.exports = (db) => {
  // all routes will go here 
  router.get('/', (req, res) => {
   
    const comments = "SELECT * FROM comments";

    db.query(comments).then(data => {
     
      res.json(data.rows);
    })
  
  });

  return router;
}