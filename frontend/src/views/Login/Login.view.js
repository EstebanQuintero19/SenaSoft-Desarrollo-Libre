/**
 * Vista de Login - Maneja la presentación
 */
export class LoginView {
  constructor() {
    this.container = null;
  }

  /**
   * Renderiza la vista de login
   * @returns {string} HTML de la vista
   */
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

            <div id="errorMessage" class="error-message" style="display: none;"></div>

            <button type="submit" class="btn-primary" id="loginBtn">
              Iniciar Sesion
            </button>

            <div class="register-link">
              <span>No tienes Cuenta?</span>
              <a href="#" id="goToRegister">Registrate</a>
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
    if (errorDiv) {
      errorDiv.textContent = message;
      errorDiv.style.display = 'block';
    }
  }

  /**
   * Oculta el mensaje de error
   */
  hideError() {
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv) {
      errorDiv.style.display = 'none';
    }
  }

  /**
   * Obtiene los datos del formulario
   * @returns {Object}
   */
  getFormData() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    return { email, password };
  }

  /**
   * Limpia el formulario
   */
  clearForm() {
    document.getElementById('loginForm').reset();
    this.hideError();
  }

  /**
   * Deshabilita el botón de submit
   */
  disableSubmit() {
    const btn = document.getElementById('loginBtn');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Iniciando...';
    }
  }

  /**
   * Habilita el botón de submit
   */
  enableSubmit() {
    const btn = document.getElementById('loginBtn');
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Iniciar Sesion';
    }
  }
}
