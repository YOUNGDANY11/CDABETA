const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const auth = require('../middlewares/auth.middleware')
const role = require('../middlewares/role.middleware')

//Rutas roles superiores
router.get('/', auth, role(1),userController.getAll)
router.get('/id/:id', auth, role(1), userController.getById)
//      Filtros
router.get('/name', auth, role(1), userController.getByName)
router.get('/lastname', auth, role(1), userController.getByLastName)
router.get('/email', auth, role(1), userController.getByEmail)
router.get('/document', auth, role(1), userController.getByDocument)
router.get('/phone', auth, role(1), userController.getByPhone)
//      Actualizacion
router.put('/id/:id', auth, role(1), userController.updateUser)
//      Eliminacion
router.delete('/id/:id', auth, role(1), userController.deleteUser)


//Usuarios clientes
router.get('/active', auth, role(1,2,3,4),userController.getByUserActive)
router.put('/active', auth, role(1,2,3,4), userController.updateByUserActive)

module.exports = router