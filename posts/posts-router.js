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
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error: "The post information could not be retrieved."
    });
  });
});

router.post('/', (req, res) => {
  const userData = req.body;

  if ( userData.title === undefined || userData.contents === undefined ) {
    return res.status( 400 ).json( {
      errorMessage: "Please provide title and contents for the post."
    })
  }

  Posts.add(req.body)
  .then(post => {
    res.status(201).json(post);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  });
});

router.delete('/:id', (req, res) => {
  Posts.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: 'The post has been nuked' });
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error: "The post could not be removed"
    });
  });
});

router.put('/:id', (req, res) => {
  const changes = req.body;

  if ( changes.title === undefined || changes.contents === undefined ) {
    return res.status( 400 ).json( {
      errorMessage: "Please provide title and contents for the post."
    })
  }
  Posts.update(req.params.id, changes)
  .then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error: "The post information could not be modified."
    });
  });
});

router.get( '/:id/comments', ( req, res ) => {
  Posts.findPostComments( req.params.id )
    .then( comments => {
      if ( comments ) {
        res.status( 200 ).json( comments );
      } else {
        res.status( 404 ).json( { message: "The post with the specified ID does not exist." } );
      }
      
    })
    .catch( error => {
      console.log( error );
      res.status( 500 ).json( { error: "The comments information could not be retrieved." } );
    });
})

router.post('/:id/comments', (req, res) => {
  const userData = req.body;
  const id = req.params.id;

  if ( id === 0 ) {
    return res.status( 404 ).json( { message: "The post with the specified ID does not exist." } );
  }
  if ( userData.text === undefined ) {
    return res.status( 400 ).json( { errorMessage: "Please provide text for the comment." } )
  }
  Posts.addComment(req.body)
  .then(comment => {
    res.status(201).json(comment);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error: "There was an error while saving the comment to the database"
    });
  });
});

module.exports = router;
/*

*/