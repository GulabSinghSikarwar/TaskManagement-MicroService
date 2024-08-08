const router = require('express').Router()

router.use('/api/tasks', (req, resp, next) => {
    resp.json({
       messages: "sucessfully redirected  to Tasks service "
    })
})

module.exports = router