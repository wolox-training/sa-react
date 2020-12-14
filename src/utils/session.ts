const TOKEN_NAME = 'token';

export function saveSession(token: string) {
  localStorage.setItem(TOKEN_NAME, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_NAME);
}
