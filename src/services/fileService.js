import api from "../utils/api";

/**
 * Upload file
 * @param {File} file - The file to upload
 * @param {string} module - The module name (default: USER)
 * @param {string} entityId - The ID of the entity
 * @param {string} uploadedBy - The uploader identifier
 * @returns {Promise} - Response data containing the file URL
 */
export const uploadFile = async (file, module = "USER", entityId, uploadedBy) => {
  const formData = new FormData();
  formData.append("file", file);

  const queryParams = new URLSearchParams({
    module,
    entityId,
    uploadedBy
  });

  const response = await api.post(`/files/upload-avatar?${queryParams.toString()}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
