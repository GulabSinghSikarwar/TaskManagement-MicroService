const router = require('express').Router()

// File modules 

const commentRouter = require('./comments/comments.routes')

router.use('/comments', commentRouter);

router.use('/comments/', (req, resp, next) => {
    resp.json({
        messages: "sucessfully redirected  to Tasks service "
    })
})

router.use('/', (req, resp, next) => {
    return resp.json({ status: 'Success' })
})

module.exports = router