import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchAPI } from '../utils/api' // Asegúrate de que esta función esté configurada correctamente
import './Events.css'

const Events = () => {
  const [events, setEvents] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [loadingAction, setLoadingAction] = useState(false) // Para manejar la acción de unirse o salir
  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  const userId = token ? JSON.parse(atob(token.split('.')[1])).user.id : null // Decodifica el token para obtener el userId

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await fetchAPI('GET', '/events') // URL para obtener eventos del backend
        setEvents(data)
      } catch (error) {
        setError('Error al cargar los eventos.')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const handleJoinEvent = async (eventId) => {
    setLoadingAction(true)
    try {
      await fetchAPI('POST', `/events/${eventId}/join`) // Petición para unirse al evento
      alert('Te has unido al evento con éxito.')
      navigate('/profile')
    } catch (error) {
      alert('Error al unirse al evento.')
    } finally {
      setLoadingAction(false)
    }
  }

  const handleLeaveEvent = async (eventId) => {
    setLoadingAction(true)
    try {
      await fetchAPI('POST', `/events/${eventId}/leave`) // Petición para salir del evento
      alert('Has salido del evento con éxito.')
      navigate('/profile')
    } catch (error) {
      alert('Error al salir del evento.')
    } finally {
      setLoadingAction(false)
    }
  }

  if (loading) return <p>Cargando eventos...</p>
  if (error) return <p>{error}</p>

  return (
    <div className='events-container'>
      <h1 className='events-title'>Lista de Eventos</h1>
      {events.length === 0 ? (
        <p>No hay eventos disponibles.</p>
      ) : (
        <div className='events-grid'>
          {events.map((event) => (
            <div key={event._id} className='event-card'>
              {event.image && (
                <img
                  src={`http://localhost:5001${event.image}`} // Asegúrate de que la URL de la imagen sea correcta
                  alt={event.title}
                  className='event-image'
                />
              )}
              <div className='event-content'>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p>Fecha: {new Date(event.date).toLocaleDateString()}</p>
                <p>Ubicación: {event.location}</p>
              </div>
              <div className='event-buttons'>
                <button onClick={() => navigate(`/events/${event._id}`)}>
                  <i className='fas fa-info-circle'></i> Más detalles
                </button>
                {event.attendees.includes(userId) ? (
                  <button
                    onClick={() => handleLeaveEvent(event._id)}
                    disabled={loadingAction}
                  >
                    {loadingAction ? (
                      <span>Cargando...</span>
                    ) : (
                      <>
                        <i className='fas fa-sign-out-alt'></i> Salir
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => handleJoinEvent(event._id)}
                    disabled={loadingAction}
                  >
                    {loadingAction ? (
                      <span>Cargando...</span>
                    ) : (
                      <>
                        <i className='fas fa-sign-in-alt'></i> Unirse
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Events
