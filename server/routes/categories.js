const router = require('express').Router();

module.exports = (db) => {
  // all routes will go here 
  router.get('/', (req, res) => {
   
    const categories = "SELECT * FROM categories";
    
    db.query(categories).then(data => {
     
      res.json(data.rows);
    })
  
  });

  return router;
}