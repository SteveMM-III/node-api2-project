const express = require('express');

const Posts = require('./posts-model.js');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
  Posts.find(req.query)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error: "The posts information could not be retrieved." 
    });
  });
});

router.get('/:id', (req, res) => {
  Posts.findById(req.params.id)
  .then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the post',
    });
  });
});

router.post('/', (req, res) => {
  Posts.add(req.body)
  .then(post => {
    res.status(201).json(post);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error adding the post',
    });
  });
});

router.delete('/:id', (req, res) => {
  Posts.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: 'The post has been nuked' });
    } else {
      res.status(404).json({ message: 'The post could not be found' });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error removing the post',
    });
  });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  Posts.update(req.params.id, changes)
  .then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'The post could not be found' });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error updating the post',
    });
  });
});

router.get( '/:id/comments', ( req, res ) => {
  Posts.findPostComments( req.params.id )
    .then( comments => {
      res.status( 200 ).json( comments );
    })
    .catch( error => {
      console.log( error );
      res.status( 500 ).json( { errorMessage: 'error getiting Posts comments' } );
    });
})

router.post('/:id/comments', (req, res) => {
  Posts.addComment(req.body)
  .then(comment => {
    res.status(201).json(comment);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error adding the comment',
    });
  });
});

module.exports = router;
/*

*/