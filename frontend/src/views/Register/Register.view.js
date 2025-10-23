/**
 * Vista de Registro - Maneja la presentación
 */
export class RegisterView {
  constructor() {
    this.container = null;
  }

  /**
   * Renderiza la vista de registro
   * @returns {string} HTML de la vista
   */
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
              <label for="password">Contraseña</label>
              <div class="input-wrapper">
                <span class="input-icon">🔒</span>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  placeholder="Mínimo 6 caracteres"
                  required
                  minlength="6"
                />
              </div>
            </div>

            <div id="errorMessage" class="error-message" style="display: none;"></div>
            <div id="successMessage" class="success-message" style="display: none;"></div>

            <button type="submit" class="btn-primary" id="registerBtn">
              Registrarse
            </button>

            <div class="register-link">
              <span>¿Ya tienes cuenta?</span>
              <a href="#" id="goToLogin">Iniciar Sesión</a>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  /**
   * Muestra un mensaje de error
   * @param {string} message 
   */
  showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    const successDiv = document.getElementById('successMessage');
    if (successDiv) successDiv.style.display = 'none';
    if (errorDiv) {
      errorDiv.textContent = message;
      errorDiv.style.display = 'block';
    }
  }

  /**
   * Muestra un mensaje de éxito
   * @param {string} message 
   */
  showSuccess(message) {
    const errorDiv = document.getElementById('errorMessage');
    const successDiv = document.getElementById('successMessage');
    if (errorDiv) errorDiv.style.display = 'none';
    if (successDiv) {
      successDiv.textContent = message;
      successDiv.style.display = 'block';
    }
  }

  /**
   * Oculta los mensajes
   */
  hideMessages() {
    const errorDiv = document.getElementById('errorMessage');
    const successDiv = document.getElementById('successMessage');
    if (errorDiv) errorDiv.style.display = 'none';
    if (successDiv) successDiv.style.display = 'none';
  }

  /**
   * Obtiene los datos del formulario
   * @returns {Object}
   */
  getFormData() {
    return {
      cedula: document.getElementById('cedula').value,
      nombre: document.getElementById('nombre').value,
      apellido: document.getElementById('apellido').value,
      email: document.getElementById('email').value,
      telefono: document.getElementById('telefono').value,
      tipoDocumento: document.getElementById('tipoDocumento').value,
      genero: document.getElementById('genero').value || undefined,
      password: document.getElementById('password').value
    };
  }

  /**
   * Limpia el formulario
   */
  clearForm() {
    document.getElementById('registerForm').reset();
    this.hideMessages();
  }

  /**
   * Deshabilita el botón de submit
   */
  disableSubmit() {
    const btn = document.getElementById('registerBtn');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Registrando...';
    }
  }

  /**
   * Habilita el botón de submit
   */
  enableSubmit() {
    const btn = document.getElementById('registerBtn');
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Registrarse';
    }
  }
}
