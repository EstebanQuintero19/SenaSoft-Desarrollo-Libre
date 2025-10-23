import axios from 'axios';
import { API_CONFIG } from '../config/api.config.js';

/**
 * Modelo de Usuario - Maneja la lógica de datos
 */
export class UserModel {
  constructor() {
    this.api = axios.create({
      baseURL: API_CONFIG.baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Login de usuario
   * @param {Object} credentials - { email, password } o { cedula, password }
   * @returns {Promise}
   */
  async login(credentials) {
    try {
      const response = await this.api.post(API_CONFIG.endpoints.login, credentials);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al iniciar sesión'
      };
    }
  }

  /**
   * Registro de usuario
   * @param {Object} userData - Datos del usuario
   * @returns {Promise}
   */
  async register(userData) {
    try {
      const response = await this.api.post(API_CONFIG.endpoints.register, userData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al registrar usuario'
      };
    }
  }

  /**
   * Obtener usuarios
   * @returns {Promise}
   */
  async getUsers() {
    try {
      const response = await this.api.get(API_CONFIG.endpoints.users);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al obtener usuarios'
      };
    }
  }
}
