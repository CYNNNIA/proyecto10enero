require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path') // Asegúrate de importar 'path'
const authRoutes = require('./routes/authRoutes') // Ajusta la ruta según tu estructura
const eventRoutes = require('./routes/eventRoutes') // Ajusta la ruta según tu estructura

const app = express()

// Conectar a MongoDB
const connectDB = async () => {
  try {
    // Conexión con MongoDB sin opciones obsoletas
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB conectado correctamente')
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message)
    process.exit(1) // Salir del proceso en caso de error
  }
}

connectDB()

// Middleware para CORS
app.use(
  cors({
    origin: [
      'http://localhost:3000', // URL para desarrollo local
      'https://proyecto10-noviembre.vercel.app'
    ],
    credentials: true // Permite el uso de cookies y cabeceras en las solicitudes
  })
)

// Middleware para recibir datos JSON
app.use(express.json())

// Servir archivos estáticos (como imágenes) desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Rutas de autenticación y eventos
app.use('/api/auth', authRoutes)
app.use('/api/events', eventRoutes)

// Iniciar el servidor
const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
