const express = require('express')
const router = express.Router()
const technomecanicController = require('../controllers/technomecanicController')

router.get('/', technomecanicController.getAll)
router.get('/id/:id', technomecanicController.getById)
router.get('/user/:id', technomecanicController.getByIdUser)
router.post('/', technomecanicController.create)

module.exports = router