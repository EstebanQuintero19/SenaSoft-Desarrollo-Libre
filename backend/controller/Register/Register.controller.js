import { UserModel } from '../models/User.model.js';
import { RegisterView } from '../views/Register.view.js';

/**
 * Controlador de Registro - Maneja la lógica de negocio
 */
export class RegisterController {
  constructor() {
    this.model = new UserModel();
    this.view = new RegisterView();
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
    const form = document.getElementById('registerForm');
    const goToLogin = document.getElementById('goToLogin');

    form.addEventListener('submit', (e) => this.handleRegister(e));
    goToLogin.addEventListener('click', (e) => this.handleGoToLogin(e));
  }

  /**
   * Maneja el evento de registro
   * @param {Event} e 
   */
  async handleRegister(e) {
    e.preventDefault();
    
    this.view.hideMessages();
    this.view.disableSubmit();

    const userData = this.view.getFormData();
    const result = await this.model.register(userData);

    if (result.success) {
      this.view.showSuccess('¡Usuario registrado exitosamente! Redirigiendo al login...');
      
      // Limpiar formulario
      this.view.clearForm();
      
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: 'login' }));
      }, 2000);
    } else {
      this.view.showError(result.error);
    }

    this.view.enableSubmit();
  }

  /**
   * Maneja la navegación al login
   * @param {Event} e 
   */
  handleGoToLogin(e) {
    e.preventDefault();
    // Disparar evento personalizado para cambiar de vista
    window.dispatchEvent(new CustomEvent('navigate', { detail: 'login' }));
  }
}
