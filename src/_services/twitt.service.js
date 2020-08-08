// import config from 'config';
import { authHeader } from "../_helpers";

const API_URL = "http://127.0.0.1:8000";

export const twittService = {
  getAllTwitts,
  create,
};

function getAllTwitts() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${API_URL}/api/twitts`, requestOptions)
    .then(_handleResponse)
    .then(_handleUserData);
}

function create(twitt) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(twitt),
  };

  return fetch(`${API_URL}/api/twitts`, requestOptions).then(_handleResponse);
}

function _handleResponse(response) {
  return response.text().then((text) => {
    const dataObject = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        // logout();
        window.location.reload(true);
      }

      const error = (dataObject && dataObject.message) || response.statusText;
      return Promise.reject(error);
    }

    // console.log('dataObject - ', dataObject);
    return dataObject;
  });
}

// this function getting data from response and returns them as an array
function _handleUserData(dataObject) {
  const data = dataObject ? dataObject.data : [];
  const dataArray = Array.isArray(data)
    ? data.map((item) => _transformData(item))
    : _transformData(data);

  return dataArray;
}

// this function transforms and returns a structure of user's data for next using
function _transformData(data) {
  return {
    id: data.id,
    userId: data.user_id,
    name: data.name,
    email: data.email,
    avatarImgPath: data.path,
    body: data.body,
  };
}
