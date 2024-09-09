const { createComment, fetchAllcomments } = require('../../controllers/comments/comments.controller');

const router = require('express').Router()

// To Featch All Comments 
router.get('/', fetchAllcomments)

// Create Comment 
router.post('/', createComment)


module.exports = router;