import { LoginController } from '../controllers/Login.controller.js';
import { RegisterController } from '../controllers/Register.controller.js';

/**
 * Router simple para manejar la navegación entre vistas
 */
export class Router {
  constructor() {
    this.routes = {
      login: new LoginController(),
      register: new RegisterController()
    };
    this.currentRoute = 'login';
  }

  /**
   * Inicializa el router
   */
  init() {
    // Cargar la ruta inicial
    this.navigate(this.currentRoute);

    // Escuchar eventos de navegación
    window.addEventListener('navigate', (e) => {
      this.navigate(e.detail);
    });
  }

  /**
   * Navega a una ruta específica
   * @param {string} route 
   */
  navigate(route) {
    if (this.routes[route]) {
      this.currentRoute = route;
      this.routes[route].init();
    } else {
      console.error(`Ruta no encontrada: ${route}`);
    }
  }
}
