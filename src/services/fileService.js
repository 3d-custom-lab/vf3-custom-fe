import api from "../utils/api";

/**
 * Upload avatar file to server
 * @param {File} file - The image file to upload
 * @param {string} module - The module name (default: "USER")
 * @param {string} entityId - The ID of the entity (user ID)
 * @param {string} uploadedBy - The uploader identifier (user ID)
 * @returns {Promise<Object>} Response data containing the file URL
 * @example
 * const response = await uploadFile(file, "USER", "10", "10");
 * const avatarUrl = response.result.url;
 */
export const uploadFile = async (file, module = "USER", entityId, uploadedBy) => {
  const formData = new FormData();
  formData.append("file", file);

  const queryParams = new URLSearchParams({
    module,
    entityId,
    uploadedBy,
  });

  const response = await api.post(
    `/files/upload-avatar?${queryParams.toString()}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  
  return response.data;
};
