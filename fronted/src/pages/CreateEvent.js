import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './CreateEvent.css'

const CreateEvent = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [image, setImage] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('date', date)
    formData.append('location', location)
    if (image) formData.append('image', image)

    try {
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:5001/api/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })

      alert('Evento creado con éxito.')
      navigate('/events')
    } catch (error) {
      console.error('Error al crear el evento:', error)
      alert('Error al crear el evento. Inténtalo de nuevo.')
    }
  }

  return (
    <div className='create-event-page'>
      <div className='create-event-container'>
        <h1 className='create-event-title'>Crear Evento</h1>
        <form className='create-event-form' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Título'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder='Descripción'
            rows='4'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <input
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type='text'
            placeholder='Ubicación'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button type='submit' className='create-event-button'>
            Crear Evento
          </button>
        </form>
        <div className='event-info'>
          <h3>Condiciones para Crear un Evento</h3>
          <ul>
            <li>El título debe ser claro y representativo.</li>
            <li>La fecha debe ser futura.</li>
            <li>La descripción debe incluir todos los detalles.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CreateEvent
