import * as utils from './utils';

function add(classroomId, names) {
  const requestOptions = {
    method: 'POST',
    headers: utils.headers(),
    body: JSON.stringify({ names }),
  };

  return fetch(`${process.env.LEARN_API_HOST}/classrooms/${classroomId}/students`, requestOptions)
    .then(utils.handleResponse)
    .then((json) => json.students);
}

function index(classroomId) {
  const requestOptions = {
    method: 'GET',
    headers: utils.headers(),
  };

  return fetch(`${process.env.LEARN_API_HOST}/classrooms/${classroomId}/students`, requestOptions)
    .then(utils.handleResponse)
    .then((json) => json.students);
}

function destroy(classroomId, studentId) {
  const requestOptions = {
    method: 'DELETE',
    headers: utils.headers(),
  };

  return fetch(`${process.env.LEARN_API_HOST}/classrooms/${classroomId}/students/${studentId}`, requestOptions)
    .then(utils.handleResponse)
    .then((json) => json.student);
}

export {
  add,
  index,
  destroy,
};
