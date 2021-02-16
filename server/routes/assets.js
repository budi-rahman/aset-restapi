const express = require('express')
const router = express.Router()
const assetController = require('../controllers/assetController')
const { authorize } = require('../middleware/auth')

router.get('/', assetController.getAsset)
router.post('/', assetController.createAsset)
// authorization proccess
//router.use(authorize)
router.delete('/:id', authorize, assetController.deleteAsset)

module.exports = router