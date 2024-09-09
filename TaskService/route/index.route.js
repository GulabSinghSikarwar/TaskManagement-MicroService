const router = require('express').Router()
const taskRouter = require('./Task/tasks.routes')


router.use('/tasks', taskRouter)

//   redirected to Default Route 
router.use('/tasks', (req, resp, next) => {
    resp.json({
        messages: "No Route Found in Task Service ,Hence  sucessfully redirected  to default  Tasks service "
    })
})


module.exports = router