const router = require('express').Router();

module.exports = (db) => {
  // all routes will go here 
  router.get('/', (req, res) => {
    const favs = "SELECT * FROM favs";
    
    db.query(favs).then(data => {
     
      res.json(data.rows);
    })
  });

  return router;
}