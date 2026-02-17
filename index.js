const express = require('express')
const cors = require('cors')
require('dotenv').config()


//Importaciones
const authRoutes = require('./routes/authRoutes')
const passwordResetRoutes = require('./routes/password.resetRoutes')


const app = express()
const PORT = process.env.PORT 

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rutas
app.use('/api/auth', authRoutes)
app.use('/api/password', passwordResetRoutes)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})