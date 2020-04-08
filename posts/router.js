const express = require('express');
const router = express.Router();
const Posts = require('../data/db')

//Post request to /api/posts
router.post('/', (req, res) => {
  const postItems = req.body;
  if (!postItems.title || !postItems.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    })
  } else {
    Posts.insert(postItems)
    .then(posts => {
      res.status(201).json(posts);
    })
    .catch(err => {
      console.log('Error', err);
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      })
    })
  }
})

//Post request to /api/:id/comments
router.post('/:id/comments', (req, res) => {
  const { id } = req.params; 
  const commentItems = {...req.body, post_id: id}; 

  if (!id) {
    res.status(404).json({
      message: "The post with the specified ID does not exist."
    });
  } else if (!req.body.text) {
    res.status(400).json({
      errorMessage: "Please provide text for the comment."
    });
  } else {
    Posts.insertComment(commentItems)
    .then(comment => {
      res.status(201).json(comment);
    })
    .catch(error => {
      console.log('Error', error);
      res.status(500).json({
        error: "There was an error while saving the comment to the database"
      });
    });
  }
});

module.exports = router; 