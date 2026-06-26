import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export async function getTasks(status) {
  const response = await api.get('/tasks', {
    params: status ? { status } : {}
  });
  return response.data.data;
}

export async function getTask(id) {
  const response = await api.get(`/tasks/${id}`);
  return response.data.data;
}

export async function createTask(taskData) {
  const response = await api.post('/tasks', taskData);
  return response.data.data;
}

export async function updateTask(id, taskData) {
  const response = await api.put(`/tasks/${id}`, taskData);
  return response.data.data;
}

export async function deleteTask(id) {
  const response = await api.delete(`/tasks/${id}`);
  return response.data.data;
}
