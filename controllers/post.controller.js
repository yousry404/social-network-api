const { Post } = require("../models")

module.exports.createPost = (req, res) => {
  req.user.createPost({
    title: req.body.title,
    content: req.body.content
  })
  .then(post => {
    res.status(200).json({
      msg: "post added successfully"
    })
  }).catch(err => {
    console.log(err)
    res.status(400).json({
      msg: "error"
    })
  })
}

module.exports.getPosts = (req, res) => {
  req.user.getPosts()
  .then(posts => {
    res.status(200).json({
      msg: "post added successfully",
      posts
    })
  }).catch(err => {
    console.log(err)
    res.status(400).json({
      msg: "error"
    })
  })
}

module.exports.editPost = (req, res) => {
  Post.update({
    content: req.body.content
  }, {
    where: {
      id: req.body.postId
    }
  }).then(updatedRows => {
    if (updatedRows > 0) {
      return res.status(200).json({
        msg: "updated successfully"
      })
    } else {
      return res.status(400).json({
        msg: "nothing updated successfully"
      })
    }
  }).catch(err => {
    res.status(400).json({
      msg: "error"
    })
  })
}