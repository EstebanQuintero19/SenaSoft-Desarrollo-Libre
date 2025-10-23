/**
 * Inicializa datos de prueba en localStorage si no existen
 */
export const initializeData = () => {
  const usersJSON = localStorage.getItem('users');
  
  // Si ya hay usuarios, no hacer nada
  if (usersJSON) {
    return;
  }

  // Usuarios de prueba (quemados)
  const defaultUsers = [
    {
      id: 1,
      cedula: '1234567890',
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan@ejemplo.com',
      telefono: '3001234567',
      tipoDocumento: 'CC',
      genero: 'Masculino',
      password: '123456',
      fechaCreacion: '2024-01-01T00:00:00.000Z'
    },
    {
      id: 2,
      cedula: '9876543210',
      nombre: 'María',
      apellido: 'García',
      email: 'maria@ejemplo.com',
      telefono: '3009876543',
      tipoDocumento: 'CC',
      genero: 'Femenino',
      password: 'password123',
      fechaCreacion: '2024-01-02T00:00:00.000Z'
    },
    {
      id: 3,
      cedula: '5555555555',
      nombre: 'Carlos',
      apellido: 'Rodríguez',
      email: 'carlos@ejemplo.com',
      telefono: '3005555555',
      tipoDocumento: 'CE',
      genero: 'Masculino',
      password: 'carlos2024',
      fechaCreacion: '2024-01-03T00:00:00.000Z'
    }
  ];

  // Guardar usuarios por defecto en localStorage
  localStorage.setItem('users', JSON.stringify(defaultUsers));
  console.log('✅ Datos de prueba inicializados en localStorage');
  console.log('📋 Usuarios disponibles:', defaultUsers.map(u => ({ email: u.email, password: u.password })));
};
