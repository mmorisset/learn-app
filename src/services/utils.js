function logout() {
  localStorage.removeItem('teacher');
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function authHeader() {
  const teacher = JSON.parse(localStorage.getItem('teacher'));
  if (teacher && teacher.token) {
    return { Authorization: `Bearer ${teacher.token}` };
  }
  return {};
}

function headers() {
  return { 'Content-Type': 'application/json', ...authHeader() };
}

export {
  handleResponse,
  authHeader,
  headers,
  logout,
};
