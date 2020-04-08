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

//GET request to /api/posts
router.get('/', (req, res) => {
  Posts.find(req.query)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(err => {
    console.log('Error', error);
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  });
})

//GET request to /api/posts/:id
router.get('/:id', (req, res) => {
  Posts.findById(req.params.id)
  .then(posts => {
    if (posts) {
      res.status(200).json(posts)
    } else {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      })
    }
  })
  .catch(error => {
    console.log('Error', error);
    res.status(500).json({
      error: "The post information could not be retrieved."
    })
  })
})

//GET request to /api/posts/:id/comments
router.get('/:id/comments', (req, res) => {
  const commentId = req.params.id;
  Posts.findPostComments(commentId)
  .then(posts => {
    if (posts.length === 0) {
      resp.status(404).json({
         message: 'The post with the specified ID does not exist.'
       });
    } else {
     res.status(200).json(posts);
    }
      })
      .catch(error => {
          console.log("Error: ", error);
          res.status(500).json({ error: 'The comments information could not be retrieved.' });
      });
});
// DELETE request to /api/posts/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Posts.remove(id)
      .then(posts => {
          if (!posts) {
              res.status(404).json({
                  message: "The post with the specified ID does not exist."
              });
          } else {
              res.status(200).json(posts);
          }
      })
      .catch(error => {
          console.log("Error: ", error);
          res
              .status(500)
              .json({ errorMessage: "The post could not be removed" });
      });
});
// PUT request to /api/posts/:id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  Posts.update(id, updates)
      .then(posts => {
          if (!posts) {
              res
                  .status(404)
                  .json({ message: "The post with the specified ID does not exist." });
          } else if (!updates.title || !updates.contents) {
              res.status(400).json({
                  errorMessage: "Please provide title and contents for the post."
              });
          } else {
              res.status(200).json(posts);
          }
      })
      .catch(error => {
          console.log("Error: ", error);
          res
              .status(500)
              .json({ error: "The post information could not be modified." });
      });
});

module.exports = router; 