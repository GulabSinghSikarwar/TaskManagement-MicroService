const router = require('express').Router()

router.use('/users', (req, resp, next) => {
    resp.json({
        messages: "sucessfully redirected  to User service in docker container Test 1 "
    });
})

module.exports = router