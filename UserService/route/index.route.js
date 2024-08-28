const router = require('express').Router()
const authRouter = require('./auth/auth.route');
router.use('/users', (req, resp, next) => {
    resp.json({
        messages: "sucessfully redirected  to User service in docker container Test test  "
    });
})

router.use('/auth',authRouter)
module.exports = router