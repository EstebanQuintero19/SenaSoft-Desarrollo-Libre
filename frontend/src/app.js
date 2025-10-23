// Configuración de la API
const API_BASE_URL = 'http://localhost:5000/api';

// ==================== VISTAS ====================
const LoginView = {
  render() {
    return `
      <div class="login-container">
        <div class="login-card">
          <div class="logo">
            <h1>AirSkill</h1>
          </div>

          <form id="loginForm" class="login-form">
            <div class="form-group">
              <label for="email">Correo Electronico</label>
              <div class="input-wrapper">
                <span class="input-icon">@</span>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label for="password">Contraseña</label>
              <div class="input-wrapper">
                <span class="input-icon">🔒</span>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div id="errorMessage" class="error-message"></div>

            <button type="submit" class="btn-primary" id="loginBtn">
              Iniciar Sesion
            </button>

            <div class="register-link">
              <span>No tienes Cuenta?</span>
              <a id="goToRegister">Registrate</a>
            </div>
          </form>
        </div>
      </div>
    `;
  }
};

const RegisterView = {
  render() {
    return `
      <div class="login-container">
        <div class="login-card register-card">
          <div class="logo">
            <h1>AirSkill</h1>
            <p class="subtitle">Crear Cuenta</p>
          </div>

          <form id="registerForm" class="login-form">
            <div class="form-row">
              <div class="form-group">
                <label for="tipoDocumento">Tipo Documento</label>
                <select id="tipoDocumento" name="tipoDocumento" required>
                  <option value="">Seleccionar</option>
                  <option value="CC">CC</option>
                  <option value="TI">TI</option>
                  <option value="CE">CE</option>
                </select>
              </div>

              <div class="form-group">
                <label for="cedula">Cédula</label>
                <input 
                  type="text" 
                  id="cedula" 
                  name="cedula" 
                  placeholder="123456789"
                  required
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="nombre">Nombre</label>
                <input 
                  type="text" 
                  id="nombre" 
                  name="nombre" 
                  placeholder="Juan"
                  required
                />
              </div>

              <div class="form-group">
                <label for="apellido">Apellido</label>
                <input 
                  type="text" 
                  id="apellido" 
                  name="apellido" 
                  placeholder="Pérez"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label for="email">Correo Electrónico</label>
              <div class="input-wrapper">
                <span class="input-icon">@</span>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="telefono">Teléfono</label>
                <input 
                  type="tel" 
                  id="telefono" 
                  name="telefono" 
                  placeholder="3001234567"
                  required
                />
              </div>

              <div class="form-group">
                <label for="genero">Género</label>
                <select id="genero" name="genero">
                  <option value="">Seleccionar</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="registerPassword">Contraseña</label>
              <div class="input-wrapper">
                <span class="input-icon">🔒</span>
                <input 
                  type="password" 
                  id="registerPassword" 
                  name="password" 
                  placeholder="Mínimo 6 caracteres"
                  required
                  minlength="6"
                />
              </div>
            </div>

            <div id="errorMessage" class="error-message"></div>
            <div id="successMessage" class="success-message"></div>

            <button type="submit" class="btn-primary" id="registerBtn">
              Registrarse
            </button>

            <div class="register-link">
              <span>¿Ya tienes cuenta?</span>
              <a id="goToLogin">Iniciar Sesión</a>
            </div>
          </form>
        </div>
      </div>
    `;
  }
};

// ==================== CONTROLADORES ====================
const LoginController = {
  init() {
    const app = document.getElementById('app');
    app.innerHTML = LoginView.render();
    
    const form = document.getElementById('loginForm');
    const goToRegister = document.getElementById('goToRegister');
    
    form.addEventListener('submit', this.handleLogin.bind(this));
    goToRegister.addEventListener('click', (e) => {
      e.preventDefault();
      Router.navigate('register');
    });
  },

  async handleLogin(e) {
    e.preventDefault();
    
    const errorDiv = document.getElementById('errorMessage');
    const btn = document.getElementById('loginBtn');
    
    errorDiv.style.display = 'none';
    btn.disabled = true;
    btn.textContent = 'Iniciando...';

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.usuario));
        alert(`¡Bienvenido ${data.usuario.nombre}!`);
        document.getElementById('loginForm').reset();
      } else {
        errorDiv.textContent = data.message || 'Error al iniciar sesión';
        errorDiv.style.display = 'block';
      }
    } catch (error) {
      errorDiv.textContent = 'Error de conexión con el servidor';
      errorDiv.style.display = 'block';
    }

    btn.disabled = false;
    btn.textContent = 'Iniciar Sesion';
  }
};

const RegisterController = {
  init() {
    const app = document.getElementById('app');
    app.innerHTML = RegisterView.render();
    
    const form = document.getElementById('registerForm');
    const goToLogin = document.getElementById('goToLogin');
    
    form.addEventListener('submit', this.handleRegister.bind(this));
    goToLogin.addEventListener('click', (e) => {
      e.preventDefault();
      Router.navigate('login');
    });
  },

  async handleRegister(e) {
    e.preventDefault();
    
    const errorDiv = document.getElementById('errorMessage');
    const successDiv = document.getElementById('successMessage');
    const btn = document.getElementById('registerBtn');
    
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';
    btn.disabled = true;
    btn.textContent = 'Registrando...';

    const userData = {
      cedula: document.getElementById('cedula').value,
      nombre: document.getElementById('nombre').value,
      apellido: document.getElementById('apellido').value,
      email: document.getElementById('email').value,
      telefono: document.getElementById('telefono').value,
      tipoDocumento: document.getElementById('tipoDocumento').value,
      genero: document.getElementById('genero').value || undefined,
      password: document.getElementById('registerPassword').value
    };

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        successDiv.textContent = '¡Usuario registrado exitosamente! Redirigiendo al login...';
        successDiv.style.display = 'block';
        document.getElementById('registerForm').reset();
        
        setTimeout(() => {
          Router.navigate('login');
        }, 2000);
      } else {
        errorDiv.textContent = data.message || 'Error al registrar usuario';
        errorDiv.style.display = 'block';
      }
    } catch (error) {
      errorDiv.textContent = 'Error de conexión con el servidor';
      errorDiv.style.display = 'block';
    }

    btn.disabled = false;
    btn.textContent = 'Registrarse';
  }
};

// ==================== ROUTER ====================
const Router = {
  routes: {
    login: LoginController,
    register: RegisterController
  },

  navigate(route) {
    if (this.routes[route]) {
      this.routes[route].init();
    }
  },

  init() {
    this.navigate('login');
  }
};

// ==================== INICIALIZACIÓN ====================
Router.init();
