const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5043";

async function parseJson(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch (e) {
    return text;
  }
}

function authHeaders(): HeadersInit {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

export async function register(username: string, password: string) {
  const res = await fetch(`${baseUrl}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return await parseJson(res);
}

export async function login(username: string, password: string) {
  const res = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return await parseJson(res);
}

export async function getTasks() {
  const res = await fetch(`${baseUrl}/api/tasks`, {
    method: "GET",
    headers: authHeaders(),
  });
  return await parseJson(res);
}

export async function createTask(title: string, description?: string) {
  const res = await fetch(`${baseUrl}/api/tasks`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ title, description, isCompleted: false }),
  });
  return await parseJson(res);
}

export async function updateTask(
  id: number,
  fields: { title?: string; description?: string; isCompleted?: boolean }
) {
  const res = await fetch(`${baseUrl}/api/tasks/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(fields),
  });
  return await parseJson(res);
}

export async function deleteTask(id: number) {
  const res = await fetch(`${baseUrl}/api/tasks/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return res.ok;
}
