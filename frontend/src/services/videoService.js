import api from './api';

export const getVideos = () => api.get('/api/videos');
export const getVideo = (id) => api.get(`/api/videos/${id}`);
export const getVideosByStudent = (studentId) => api.get(`/api/videos/student/${studentId}`);
export const getMyVideos = () => api.get('/api/videos/my-videos');
export const createVideo = (data) => api.post('/api/videos', data);
export const updateVideo = (id, data) => api.put(`/api/videos/${id}`, data);
export const deleteVideo = (id) => api.delete(`/api/videos/${id}`);
