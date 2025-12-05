import api from "../utils/api";

export const getAllModels = async () => {
  const response = await api.get("/models");
  return response.data;
};

export const getModelById = async (id) => {
  const response = await api.get(`/models/${id}`);
  return response.data;
};

export const createModel = async (modelData) => {
  const response = await api.post("/models/create", modelData);
  return response.data;
};
