import api from './api';

const register = async (name, email, password) => {
  const response = await api.post('/auth/register', { name, email, password });
  return response.data;
};

const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

const forgotPassword = async (email, newPassword) => {
  const response = await api.post('/auth/forgot-password', { email, newPassword });
  return response.data;
};

const getProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};

const updateProfile = async (profileData) => {
  const response = await api.put('/auth/profile', profileData);
  return response.data;
};

const authService = {
  register,
  login,
  forgotPassword,
  getProfile,
  updateProfile,
};

export default authService;
