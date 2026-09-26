const API_BASE_URL = "http://localhost:8000/api/v1";
// const API_BASE_URL = "https://servicehub-backend-388b.onrender.com";

export const apiClient = async (endpoint, options = {}) => {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong"
    );
  }

  return data;
};
