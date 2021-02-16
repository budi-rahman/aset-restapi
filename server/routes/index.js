const express = require('express')
const router = express.Router()
const authRouter = require('./auth')
const assetRouter = require('./assets')
const {authenticate} = require('../middleware/auth')

router.get('/welcome', (req, res) => {
    res.send('Hello World')
})

router.use('/', authRouter)
router.use(authenticate)
router.use('/assets', assetRouter)


module.exports = router