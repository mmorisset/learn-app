import * as utils from './utils';

function index() {
  const requestOptions = {
    method: 'GET',
    headers: utils.headers()
  };

  return fetch(`${process.env.LEARN_API_HOST}/levels/`, requestOptions)
    .then(utils.handleResponse)
    .then(json => {
      return json.levels;
    });
}

export {
  index
}
