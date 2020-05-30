function authHeader() {
  let teacher = JSON.parse(localStorage.getItem('teacher'));
  if (teacher && teacher.token) {
      return { 'Authorization': 'Bearer ' + teacher.token };
  } else {
      return {};
  }
}

function profile() {
  const requestOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json', ...authHeader()},
  };

  return fetch(`${process.env.LEARN_API_HOST}/teachers/profile`, requestOptions)
    .then(handleResponse)
    .then(json => {
      return json.teacher;
    });
}

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };

  return fetch(`${process.env.LEARN_API_HOST}/teachers/login`, requestOptions)
    .then(handleResponse)
    .then(teacher => {
      if (teacher) {
          localStorage.setItem('teacher', JSON.stringify(teacher));
      }
      return teacher;
    });
}

function logout() {
  localStorage.removeItem('teacher');
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

export {
  profile,
  login,
  logout
}
