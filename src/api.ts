const BASE_URL = "http://127.0.0.1:8000/api/v1";

export async function getWrites() {
  const response = await fetch(`${BASE_URL}/boards/free/writes`);
  const json = await response.json();
  return json;
}