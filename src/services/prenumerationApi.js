const API_URL = "http://localhost:5175/api/prenumerationer";

export async function getPrenumerationer() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}
