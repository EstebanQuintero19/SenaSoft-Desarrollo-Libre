# AirSkill - Sistema de Login/Registro

Aplicación frontend con arquitectura MVC usando Vite que consume una API de autenticación.

## 🏗️ Arquitectura MVC

```
src/
├── models/          # Capa de datos (Model)
│   └── User.model.js
├── views/           # Capa de presentación (View)
│   ├── Login.view.js
│   └── Register.view.js
├── controllers/     # Capa de lógica (Controller)
│   ├── Login.controller.js
│   └── Register.controller.js
├── router/          # Enrutador de vistas
│   └── Router.js
├── config/          # Configuración
│   └── api.config.js
└── styles/          # Estilos CSS
    └── main.css
```

## 📦 Dependencias

### Dependencias de producción:
- **axios** (^1.6.2): Cliente HTTP para consumir la API

### Dependencias de desarrollo:
- **vite** (^5.0.8): Build tool y dev server

## 🚀 Instalación

```bash
# Instalar dependencias
npm install
```

## ⚙️ Configuración

Edita el archivo `src/config/api.config.js` para configurar la URL de tu backend:

```javascript
export const API_CONFIG = {
  baseURL: 'http://localhost:5000/api', // Cambia esto según tu backend
  endpoints: {
    login: '/auth/login',
    register: '/auth/register',
    users: '/auth/users'
  }
};
```

## 🎯 Uso

```bash
# Modo desarrollo (puerto 3000)
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 🔌 API Endpoints

La aplicación consume los siguientes endpoints:

### POST /api/auth/login
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña"
}
```
O alternativamente:
```json
{
  "cedula": "123456789",
  "password": "contraseña"
}
```

### POST /api/auth/register
```json
{
  "cedula": "123456789",
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@ejemplo.com",
  "telefono": "3001234567",
  "tipoDocumento": "CC",
  "genero": "Masculino",
  "password": "contraseña123"
}
```

### GET /api/auth/users
Obtiene la lista de usuarios registrados.

## 🎨 Características

- ✅ Arquitectura MVC clara y organizada
- ✅ Diseño responsive y moderno
- ✅ Validación de formularios
- ✅ Manejo de errores
- ✅ Navegación entre vistas (Login/Registro)
- ✅ Mensajes de éxito y error
- ✅ Almacenamiento local del usuario
- ✅ UI inspirada en el diseño proporcionado

## 📱 Vistas

### Login
- Email o cédula
- Contraseña
- Link a registro

### Registro
- Tipo de documento (CC, TI, CE)
- Cédula
- Nombre y apellido
- Email
- Teléfono
- Género (opcional)
- Contraseña (mínimo 6 caracteres)
- Link a login

## 🛠️ Tecnologías

- **Vite**: Build tool moderno y rápido
- **Vanilla JavaScript**: Sin frameworks, JavaScript puro
- **CSS3**: Estilos modernos con gradientes y animaciones
- **Axios**: Cliente HTTP para peticiones a la API
- **MVC Pattern**: Separación clara de responsabilidades

## 📝 Notas

- La aplicación guarda los datos del usuario en `localStorage` después del login
- Los formularios tienen validación básica del lado del cliente
- El diseño es totalmente responsive
- Los colores y estilos están basados en el diseño proporcionado
