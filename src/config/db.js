const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // Opciones recomendadas para evitar posibles advertencias en el futuro:
      useNewUrlParser: true, // Asegura que se utilice el nuevo parser de URL (opcional, ya no es necesario)
      useUnifiedTopology: true // Maneja automáticamente la topología de conexiones
    })
    console.log('MongoDB conectado correctamente...')
  } catch (err) {
    console.error('Error al conectar con MongoDB:', err.message)
    process.exit(1) // Finaliza el proceso si la conexión falla
  }
}

module.exports = connectDB
