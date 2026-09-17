const API_BASE_URL = "http://localhost:5175";
const API_URL = `${API_BASE_URL}/api/prenumerationer`;

export const MAX_FILE_SIZE_MB = 25;

export function getFileUrl(path) {
  return `${API_BASE_URL}${path}`;
}

async function getErrorMessage(response) {
  const contentType = response.headers.get("Content-Type") || "";
  if (contentType.startsWith("text/plain")) {
    return response.text();
  }
  return `Servern svarade med felkod ${response.status}.`;
}

async function request(url, options) {
  let response;
  try {
    response = await fetch(url, options);
  } catch {
    throw new Error("Kunde inte ansluta till servern.");
  }
  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
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

export async function deletePrenumeration(id) {
  await request(`${API_URL}/${id}`, { method: "DELETE" });
}

async function uploadFile(id, type, file) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await request(`${API_URL}/${id}/${type}`, {
    method: "POST",
    body: formData,
  });
  return response.json();
}

export function uploadLogo(id, file) {
  return uploadFile(id, "logo", file);
}

export function uploadDocument(id, file) {
  return uploadFile(id, "document", file);
}
