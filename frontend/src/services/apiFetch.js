const API_URL = "http://localhost:3000";

export const apiFetch = async (endpoint, method = "GET", bodyData = null, customHeaders = {}) => {
  const url = `${API_URL}/${endpoint}`

  const config = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...customHeaders,
    },
  }

  if (bodyData && (method === "POST" || method === "PUT")) {
    config.body = JSON.stringify(bodyData);
  }

  console.log('--- apiFetch ---');
    console.log('URL:', url);
    console.log('Method:', method);
    console.log('Headers:', config.headers);
    
  try {
    const res = await fetch(url, config)
    const data = await res.json()

    if (!res.ok) {
      throw new Error(
        data.error || data.message || `Error en la solicitud a ${url}.`
      )
    }

    return data
  } catch (error) {
    console.error(`Error en apiFetch para ${url} (${method}):`, error)
    throw error
  }
};
