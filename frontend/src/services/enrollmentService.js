import api from './api';

export const getEnrollments = () => api.get('/api/enrollments');
export const getEnrollment = (id) => api.get(`/api/enrollments/${id}`);
export const createEnrollment = (data) => api.post('/api/enrollments', data);
export const updateEnrollment = (id, data) => api.put(`/api/enrollments/${id}`, data);
export const deleteEnrollment = (id) => api.delete(`/api/enrollments/${id}`);
