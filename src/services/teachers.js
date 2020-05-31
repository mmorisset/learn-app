import * as utils from './utils';

function profile() {
  const requestOptions = {
    method: 'GET',
    headers: utils.headers()
  };

  return fetch(`${process.env.LEARN_API_HOST}/teachers/profile`, requestOptions)
    .then(utils.handleResponse)
    .then(json => {
      return json.teacher;
    });
}

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: utils.headers(),
    body: JSON.stringify({ email, password })
  };

  return fetch(`${process.env.LEARN_API_HOST}/teachers/login`, requestOptions)
    .then(utils.handleResponse)
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

export {
  profile,
  login,
  logout
}
