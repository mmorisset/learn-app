function add(name) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  };

  return fetch(`${process.env.LEARN_API_HOST}/classrooms`, requestOptions)
    .then(handleResponse)
    .then(json => {
      return json.classroom;
    });
}

function get(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  return fetch(`${process.env.LEARN_API_HOST}/classrooms/${id}`, requestOptions)
    .then(handleResponse)
    .then(json => {
      return json.classroom;
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
  get
}
