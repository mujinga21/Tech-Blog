const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      // user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.get('/:id', async (req, res) => {
  console.log('hello world')
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      }
      
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/', async (req, res) => {
  console.log('hello world')
  try {
    const postData = await Post.findAll({
      // where: {
      //   id: req.params.id,
        // user_id: req.session.user_id,
      
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:post_id', (req, res) => {
  //Calls the update method on the Book model
  Post.update(
    {
      // All the fields you can update and the data attached to the request body.
      title: req.body.title,
      content: req.body.content,
    
    },
    {
      // Gets a book based on the book_id given in the request parameters
      where: {
        id: req.params.post_id,
      },
    }
  )
    .then((updatedPost) => {
      res.json(updatedPost);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;