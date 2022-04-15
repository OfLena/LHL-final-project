const router = require('express').Router();

module.exports = (db) => {
  // all routes will go here 
  router.get('/', (req, res) => {
    const users = "SELECT * FROM users";
    
    db.query(users).then(data => {
     
      res.json(data.rows);
    })
  });

  return router;
}