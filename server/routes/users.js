const router = require('express').Router();

module.exports = (db) => {
  // all routes will go here 
  router.get('/:id', (req, res) => {
    const users = "SELECT * FROM users WHERE id = $1";
    
    db.query(users, [req.params.id]).then(data => {
      res.json(data.rows[0]);
    })
  });

  return router;
}