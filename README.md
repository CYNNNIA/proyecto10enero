Eventastic

Eventastic es una plataforma web diseñada para gestionar eventos. Permite a los usuarios registrarse, iniciar sesión, crear eventos, unirse a ellos, y gestionar su perfil. Todo esto acompañado de un diseño moderno, intuitivo y funcional.

Características principales 1. Gestión de usuarios:
• Registro con avatar personalizado.
• Inicio de sesión con autenticación segura mediante tokens JWT.
• Perfil de usuario con eventos creados y a los que se ha unido. 2. Gestión de eventos:
• Crear eventos con detalles como título, descripción, fecha, ubicación e imagen.
• Visualizar eventos disponibles.
• Unirse o salir de eventos existentes.
• Eliminar eventos creados por el usuario. 3. UX/UI moderna:
• Diseño responsivo adaptado a dispositivos móviles.
• Navegación intuitiva con barra fija (Navbar y Footer).
• Feedback al usuario mediante mensajes de error y “loaders” en procesos asíncronos.

Tecnologías utilizadas

Frontend
• React con componentes funcionales.
• React Router DOM para manejo de rutas.
• CSS con diseño moderno y animaciones.
• Axios para las solicitudes HTTP.

Backend
• Node.js con Express como framework.
• MongoDB con Mongoose para la base de datos.
• JSON Web Token (JWT) para autenticación.
• Bcrypt para hashing de contraseñas.
• Multer para subir archivos (avatars y carteles de eventos).

Requisitos de instalación 1. Node.js versión >= 14.0.0 2. MongoDB (local o en la nube como MongoDB Atlas). 3. Variables de entorno en un archivo .env (ver la sección “Configuración”).

Configuración

1. Crea un archivo .env en la raíz del backend con las siguientes variables:

PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

2. Instala las dependencias tanto en el backend como en el frontend:

# Backend

cd backend
npm install

# Frontend

cd frontend
npm install

3. Inicia el proyecto:

# Backend

cd backend
npm start

# Frontend

cd frontend
npm start

4. Accede a la aplicación desde: http://localhost:3000.

Despliegue

El proyecto está desplegado en las siguientes plataformas:
• Frontend: Vercel - Enlace al proyecto
• Backend: Render - Enlace al proyecto

Estructura del proyecto

proyecto10-noviembre/
│
├── backend/
│ ├── src/
│ │ ├── config/ # Configuración de la base de datos
│ │ ├── controllers/ # Lógica del backend
│ │ ├── middlewares/ # Middlewares como autenticación
│ │ ├── models/ # Modelos de MongoDB (Usuario y Evento)
│ │ ├── routes/ # Rutas del backend
│ │ └── uploads/ # Archivos subidos (avatares e imágenes)
│ └── index.js # Entrada del servidor
│
├── frontend/
│ ├── src/
│ │ ├── components/ # Componentes reutilizables
│ │ ├── pages/ # Páginas principales (Inicio, Registro, etc.)
│ │ ├── utils/ # Funciones reutilizables (fetchAPI)
│ │ └── App.js # Entrada principal del frontend
│ └── public/ # Archivos estáticos
│
└── README.md # Este archivo

To-Do/Futuras mejoras
• Implementar notificaciones en tiempo real con WebSockets para eventos.
• Añadir búsqueda y filtrado de eventos.
• Mejorar la accesibilidad (A11y) del diseño.

Autores

Desarrollado con ❤️ por Cynn.

Licencia

Este proyecto está bajo la licencia MIT. Puedes ver más detalles en el archivo LICENSE (si lo añades).
