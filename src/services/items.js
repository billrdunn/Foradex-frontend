import axios from "axios";

const baseUrl = "https://localhost:3001/items";

const getAll = () => {
  // axios.get(...) returns a promise
  const request = axios.get(baseUrl);
  // 'then' method is executed when the promise is fulfilled
  // 'then' also returns a promise
  return request.then((response) => response.data);
};

const create = (item) => {
  const request = axios.post(baseUrl, item);
  return request.then((response) => response.data);
};

const update = (id, item) => {
  const request = axios.put(`${baseUrl}/${id}`, item);
  return request.then((response) => response.data);
};

export default { getAll, create, update };
