const router = require('express').Router();

module.exports = (db) => {
  // all routes will go here 
  router.get('/', (req, res) => {
    const tags = "SELECT * FROM tags";
    
    db.query(tags).then(data => {
     
      res.json(data.rows);
    })
  });

  router.post('/', (req, res) => {
   
    console.log(req.body)
  
  });

  return router;
}