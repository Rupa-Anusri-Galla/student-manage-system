import api from './api';

const getStats = async () => {
  const response = await api.get('/students/stats');
  return response.data;
};

const getStudents = async (params) => {
  const response = await api.get('/students', { params });
  return response.data;
};

const getStudent = async (id) => {
  const response = await api.get(`/students/${id}`);
  return response.data;
};

const createStudent = async (formData) => {
  const response = await api.post('/students', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const updateStudent = async (id, formData) => {
  const response = await api.put(`/students/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const deleteStudent = async (id) => {
  const response = await api.delete(`/students/${id}`);
  return response.data;
};

const studentService = {
  getStats,
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};

export default studentService;
