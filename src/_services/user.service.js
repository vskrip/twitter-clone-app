// import config from 'config';
import { authHeader } from "../_helpers";

// const API_URL = "http://stylist-api.test/api/v1";
const API_URL = "http://127.0.0.1:8000";

export const userService = {
  login,
  logout,
  register,
  getAll,
  getAllClients,
  getAllUsers,
  getById,
  update,
  delete: _delete,
};

function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${API_URL}/auth/login`, requestOptions)
    .then(_handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user.data));

      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${API_URL}/users`, requestOptions)
    .then(_handleResponse)
    .then(_handleUserData);
}

function getAllClients() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${API_URL}/allclients`, requestOptions)
    .then(_handleResponse)
    .then(_handleUserData);
}

function getAllUsers() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${API_URL}/allusers`, requestOptions)
    .then(_handleResponse)
    .then(_handleUserData);
}

// function getAllByAccountId(id) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(`${API_URL}/account/${id}/users`, requestOptions).then(_handleResponse);
// }

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${API_URL}/users/${id}`, requestOptions)
    .then(_handleResponse)
    .then(_handleUserData);
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`${API_URL}/auth/register`, requestOptions).then(
    _handleResponse
  );
}

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`${API_URL}/users/${user.id}`, requestOptions)
    .then(_handleResponse)
    .then(_handleUserData);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(`${API_URL}/users/${id}`, requestOptions).then(_handleResponse);
}

function _handleResponse(response) {
  return response.text().then((text) => {
    const dataObject = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        // window.location.reload(true);
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
    // role: data.role,
    isAdmin: data.is_admin,
    isUser: data.is_user,
    isClient: data.is_client,
    status: data.is_user_active,
    accountId: data.account_id,
    contactId: data.contact_id,
    firstName: data.user_first_name,
    lastName: data.user_last_name,
    username: data.name,
    phone: data.user_phone,
    email: data.email,
  };
}
