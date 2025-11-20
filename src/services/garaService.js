import api from "../utils/api";

export const getAllGaras = async () => {
  const response = await api.get("/garas");
  return response.data;
};

export const getGaraById = async (id) => {
  const response = await api.get(`/garas/${id}`);
  return response.data;
};

export const createGara = async (garaData) => {
  const response = await api.post("/garas", garaData);
  return response.data;
};

export const updateGara = async (id, garaData) => {
  const response = await api.put(`/garas/${id}`, garaData);
  return response.data;
};

export const deleteGara = async (id) => {
  const response = await api.delete(`/garas/${id}`);
  return response.data;
};