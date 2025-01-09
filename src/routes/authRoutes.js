const express = require('express')
const {
  register,
  login,
  getMe,
  updateAvatar
} = require('../controllers/authController')
const { protect } = require('../middlewares/authMiddlewares')
const uploadAvatar = require('../middlewares/fileUpload')

const router = express.Router()

// Rutas públicas
router.post('/register', uploadAvatar.single('avatar'), register)
router.post('/login', login)

// Rutas protegidas
router.get('/me', protect, getMe)
router.post('/avatar', protect, uploadAvatar.single('avatar'), updateAvatar)

module.exports = router
