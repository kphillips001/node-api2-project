const express = require('express');
const router = express.Router();
const Posts = require('../data/db')

//Put request to /api/posts
router.post('/', {req, res} => {
  const postItems = req.body;
  if (!postItems.title || !postItems.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    })
  } else {
    Posts.insert(postItems)
    .then(posts => {
      res.status(201).json(posts)
    })
    .catch(err => {
      console.log('Error', err);
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      })
    })
  }
})

module.exports = router; 