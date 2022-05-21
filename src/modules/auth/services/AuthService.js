import axios from 'axios';
import store from "@/store";
import router from "@/router/router";

export default {

  setToken(token) {
    localStorage.setItem('token', token);
  },

  async login(loginData) {
    const endpoint = loginData.token ? '/verify' : '/login'
    const {data} = await axios.post(endpoint, loginData);
    return data;
  },

  async getProfile() {
    let result = await axios.get('/profile');
    return result.data;
  },

  async updateProfile(data) {
    return axios.post(`/profile`, data);
  },

  async register(data) {
    return await axios.post('/restify/register', data);
  },

  async resetData() {
    store.reset({
      self: true,
      modules: {
        route: {
          self: false
        }
      }
    })
    localStorage.clear();
    delete axios.defaults.headers.common['Authorization'];
    await router.push('/blogs');
  },

  async changePassword(data) {
    return axios.post('/users/actions?action=change-password', data);
  },

  async resetPassword(data) {
    return axios.post('/reset-password', data);
  },

  async forgotPassword(data) {
    return axios.post('restify/forgot-password', data);
  },
}
