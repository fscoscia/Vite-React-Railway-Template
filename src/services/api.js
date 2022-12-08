import axios from "axios";

const errorCodes = {
    badRequest: "badRequest",
    unauthorized: "unauthorized",
    forbidden: "forbidden",
    notFound: "notFound",
    serverError: "serverError",
    unexpected: "unexpected",
    invalidCredentials: "invalidCredentials",
};

class API {
    constructor(collection) {
        this.baseUrl = import.meta.envREACT_APP_API_BASE_URL;
        this.collectionUrl = `${
            import.meta.envREACT_APP_API_BASE_URL
        }/${collection}`;
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
        });
    }
}

class UserAPI extends API {
    async getToken(username, password) {
        try {
            const response = await axios.post(`${this.collectionUrl}/token/`, {
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
    users: new UserAPI("users"),
};

export default api;
export { errorCodes, API, UserAPI };
