import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8082/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getWaiterBoard(){
    return axios.get(API_URL + 'waiter', { headers: authHeader() });
  }

  getCashierBoard(){
    return axios.get(API_URL + 'cashier', { headers: authHeader() });
  }

  getChefBoard(){
    return axios.get(API_URL + 'chef', { headers: authHeader() });
  }

  getManagerBoard() {
    return axios.get(API_URL + 'manager', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

}

export default new UserService();
