const express = require('express')
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  joinEvent
} = require('../controllers/eventController')
const { protect } = require('../middlewares/authMiddlewares')
const upload = require('../middlewares/fileUpload')
const { leaveEvent } = require('../controllers/eventController')

const router = express.Router()

// Rutas para manejar eventos
router.get('/', getEvents)
router.get('/:id', getEventById)
router.post('/', protect, upload.single('image'), createEvent)
router.put('/:id', protect, upload.single('image'), updateEvent)
router.delete('/:id', protect, deleteEvent)
router.post('/:id/join', protect, joinEvent)
router.post('/:id/leave', protect, leaveEvent)
router.post('/', protect, upload.single('image'), createEvent)

module.exports = router
