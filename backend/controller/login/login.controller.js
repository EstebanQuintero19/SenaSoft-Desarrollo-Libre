import { UserModel } from '../models/User.model.js';
import { LoginView } from '../views/Login.view.js';

/**
 * Controlador de Login - Maneja la lógica de negocio
 */
export class LoginController {
  constructor() {
    this.model = new UserModel();
    this.view = new LoginView();
  }

  /**
   * Inicializa el controlador
   */
  init() {
    const app = document.getElementById('app');
    app.innerHTML = this.view.render();
    this.attachEventListeners();
  }

  /**
   * Adjunta los event listeners
   */
  attachEventListeners() {
    const form = document.getElementById('loginForm');
    const goToRegister = document.getElementById('goToRegister');

    form.addEventListener('submit', (e) => this.handleLogin(e));
    goToRegister.addEventListener('click', (e) => this.handleGoToRegister(e));
  }

  /**
   * Maneja el evento de login
   * @param {Event} e 
   */
  async handleLogin(e) {
    e.preventDefault();
    
    this.view.hideError();
    this.view.disableSubmit();

    const credentials = this.view.getFormData();
    const result = await this.model.login(credentials);

    if (result.success) {
      // Guardar datos del usuario en localStorage
      localStorage.setItem('user', JSON.stringify(result.data.usuario));
      
      // Mostrar mensaje de éxito
      alert(`¡Bienvenido ${result.data.usuario.nombre}!`);
      
      // Aquí puedes redirigir a otra página o vista
      console.log('Usuario logueado:', result.data.usuario);
      
      this.view.clearForm();
    } else {
      this.view.showError(result.error);
    }

    this.view.enableSubmit();
  }

  /**
   * Maneja la navegación al registro
   * @param {Event} e 
   */
  handleGoToRegister(e) {
    e.preventDefault();
    // Disparar evento personalizado para cambiar de vista
    window.dispatchEvent(new CustomEvent('navigate', { detail: 'register' }));
  }
}
