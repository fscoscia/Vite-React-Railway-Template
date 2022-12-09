import axios from 'axios';

const errorCodes = {
  badRequest: 'badRequest',
  unauthorized: 'unauthorized',
  forbidden: 'forbidden',
  notFound: 'notFound',
  serverError: 'serverError',
  unexpected: 'unexpected',
  invalidCredentials: 'invalidCredentials',
};

class API {
  constructor(collection) {
    this.baseUrl = 'https://django-server-production-e15b.up.railway.app';
    this.collectionUrl = `https://django-server-production-e15b.up.railway.app/${collection}`;
  }

  _handleError(error) {
    if (error.response.status === 400)
      return Promise.reject({
        code: errorCodes.badRequest,
        data: error.response?.data,
      });
    if (error.response.status === 401)
      return Promise.reject({
        code: errorCodes.unauthorized,
        data: error.response?.data,
      });
    if (error.response.status === 403)
      return Promise.reject({
        code: errorCodes.forbidden,
        data: error.response?.data,
      });
    if (error.response.status === 404)
      return Promise.reject({
        code: errorCodes.notFound,
        data: error.response?.data,
      });
    if (500 <= error.response.status <= 599)
      return Promise.reject({
        code: errorCodes.serverError,
        data: error.response?.data,
      });
    return Promise.reject({
      code: errorCodes.unexpected,
      data: error.response?.data,
      e: 'a',
    });
  }

  async getMulti(ordering = null, search = null, limit = 100, offset = 0, extra = {}) {
    const params = { limit, offset, ...extra };
    if (ordering) params.ordering = ordering;
    if (search && search.length > 0) params.search = search;
    try {
      const response = await axios.get(`${this.collectionUrl}/`, { params });
      return Promise.resolve(response.data);
    } catch (error) {
      return this._handleError(error);
    }
  }

  async getOne(id) {
    try {
      const response = await axios.get(`${this.collectionUrl}/${id}/`);
      return Promise.resolve(response.data);
    } catch (e) {
      return this._handleError(e);
    }
  }

  async create(data) {
    try {
      const response = await axios.post(`${this.collectionUrl}/`, data);
      return Promise.resolve(response.data);
    } catch (e) {
      return this._handleError(e);
    }
  }
}

class UserAPI extends API {
  async getToken(username, password) {
    try {
      const response = await axios.post(`${this.baseUrl}/token/`, {
        username,
        password,
      });
      return Promise.resolve(response.data);
    } catch (e) {
      return Promise.reject(errorCodes.invalidCredentials);
    }
  }
}

const api = {
  users: new UserAPI('users'),
  products: new API('products'),
};

export default api;
export { errorCodes, API, UserAPI };
