function add(classroomId, names) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ names })
  };

  return fetch(`${process.env.LEARN_API_HOST}/classrooms/${classroomId}/students`, requestOptions)
    .then(handleResponse)
    .then(json => {
      return json.students;
    });
}

function index(classroomId) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${process.env.LEARN_API_HOST}/classrooms/${classroomId}/students`, requestOptions)
    .then(handleResponse)
    .then(json => {
      return json.students;
    });
}

function destroy(classroomId, studentId) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${process.env.LEARN_API_HOST}/classrooms/${classroomId}/students/${studentId}`, requestOptions)
    .then(handleResponse)
    .then(json => {
      return json.student;
    });
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
  add,
  index,
  destroy
}
