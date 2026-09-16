const API_URL = "http://localhost:5175/api/prenumerationer";

async function request(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response;
}

function toJsonBody(prenumeration) {
  return JSON.stringify({
    ...prenumeration,
    startDate: prenumeration.startDate || null,
    endDate: prenumeration.endDate || null,
  });
}

export async function getPrenumerationer() {
  const response = await request(API_URL);
  return response.json();
}

export async function createPrenumeration(prenumeration) {
  const response = await request(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: toJsonBody(prenumeration),
  });
  return response.json();
}

export async function updatePrenumeration(prenumeration) {
  await request(`${API_URL}/${prenumeration.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: toJsonBody(prenumeration),
  });
}
