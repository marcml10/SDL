const API_ROOT = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');
const AUTH_BASE = `${API_ROOT}/api/auth`;

function friendlyHttpError(status, data) {
  if (data?.error && typeof data.error === 'string') return data.error;
  if (status === 404) {
    return 'API not found. Run the backend (cd server && npm run dev) and use npm run dev for the frontend.';
  }
  return `Request failed (${status})`;
}

async function authFetch(path, options) {
  let res;
  try {
    res = await fetch(`${AUTH_BASE}${path}`, options);
  } catch {
    throw new Error(
      'Cannot reach the server. Start the API with: cd server && npm run dev'
    );
  }

  const text = await res.text();
  let data = {};
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      if (!res.ok) {
        throw new Error(friendlyHttpError(res.status, {}));
      }
      throw new Error('Invalid response from server.');
    }
  }

  if (!res.ok) {
    throw new Error(friendlyHttpError(res.status, data));
  }
  return data;
}

/** Ask the server (MySQL) whether this username is already registered. */
export async function checkUsernameTaken(username) {
  const data = await authFetch(
    `/check-username?username=${encodeURIComponent(username)}`
  );
  return Boolean(data.taken);
}

/** Ask the server (MySQL) whether this email is already registered. */
export async function checkEmailTaken(email) {
  const data = await authFetch(
    `/check-email?email=${encodeURIComponent(email)}`
  );
  return Boolean(data.taken);
}

export async function signUp({ username, email, password }) {
  return authFetch('/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
}

export async function signIn({ email, password }) {
  return authFetch('/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
}
