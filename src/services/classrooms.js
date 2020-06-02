import * as utils from './utils';

function add(name) {
  const requestOptions = {
    method: 'POST',
    headers: utils.headers(),
    body: JSON.stringify({ name }),
  };

  return fetch(`${process.env.LEARN_API_HOST}/classrooms`, requestOptions)
    .then(utils.handleResponse)
    .then((json) => json.classroom);
}

function get(id) {
  const requestOptions = {
    method: 'GET',
    headers: utils.headers(),
  };

  return fetch(`${process.env.LEARN_API_HOST}/classrooms/${id}`, requestOptions)
    .then(utils.handleResponse)
    .then((json) => json.classroom);
}

export {
  add,
  get,
};
