import api from './api';

export const getSchedules = () => api.get('/api/schedules');
export const getSchedule = (id) => api.get(`/api/schedules/${id}`);
export const createSchedule = (data) => api.post('/api/schedules', data);
export const updateSchedule = (id, data) => api.put(`/api/schedules/${id}`, data);
export const deleteSchedule = (id) => api.delete(`/api/schedules/${id}`);
