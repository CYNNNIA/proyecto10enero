import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './EventDetails.css'

const EventDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const token = localStorage.getItem('token')
        const { data } = await axios.get(
          `http://localhost:5001/api/events/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        setEvent(data)
      } catch (err) {
        console.error('Error al cargar el evento:', err)
        setError('Error al cargar los detalles del evento.')
      }
    }

    fetchEventDetails()
  }, [id])

  const handleJoinEvent = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `http://localhost:5001/api/events/${id}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      alert('Te has unido al evento.')
      navigate('/events')
    } catch (error) {
      console.error('Error al unirse al evento:', error)
      alert('No se pudo unir al evento. Inténtalo de nuevo.')
    }
  }

  const handleLeaveEvent = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `http://localhost:5001/api/events/${id}/leave`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      alert('Has salido del evento.')
      navigate('/events')
    } catch (error) {
      console.error('Error al salir del evento:', error)
      alert('No se pudo salir del evento. Inténtalo de nuevo.')
    }
  }

  if (error) return <p>{error}</p>
  if (!event) return <p>Cargando detalles del evento...</p>

  return (
    <div className='event-details-page'>
      <div className='event-details-container'>
        <h1>{event.title}</h1>
        <img
          src={`http://localhost:5001${event.image}`}
          alt={event.title}
          className='event-details-image'
        />
        <p>
          <strong>Descripción:</strong> {event.description}
        </p>
        <p>
          <strong>Fecha:</strong> {new Date(event.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Ubicación:</strong> {event.location}
        </p>
        <div className='event-details-buttons'>
          <button className='join-event-button' onClick={handleJoinEvent}>
            Unirse al Evento
          </button>
          <button className='leave-event-button' onClick={handleLeaveEvent}>
            Salir del Evento
          </button>
        </div>
        <button
          className='back-to-events-button'
          onClick={() => navigate('/events')}
        >
          Volver a Eventos
        </button>
      </div>
    </div>
  )
}

export default EventDetails
