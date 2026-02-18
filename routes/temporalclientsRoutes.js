const express = require('express')
const router = express.Router()
const temporalClientController = require('../controllers/temporalClientController')
const {uploadImageOrDocument} = require('../middlewares/upfile.middleware')

router.get('/', temporalClientController.getAll)
router.get('/id/:id', temporalClientController.getById)
router.get('/name', temporalClientController.getByName)
router.get('/lastname', temporalClientController.getByLastName)
router.get('/email', temporalClientController.getByEmail)
router.get('/document', temporalClientController.getByDocument)
router.get('/phone', temporalClientController.getByPhone)
router.post('/', temporalClientController.create)
router.put('/id/:id', temporalClientController.update)
router.put('/licence/id/:id', uploadImageOrDocument('licence'), temporalClientController.uploadLicence)
router.put('/soat/id/:id', uploadImageOrDocument('soat'), temporalClientController.uploadSoat)
router.delete('/id/:id', temporalClientController.deleteTemporalClient)

module.exports = router