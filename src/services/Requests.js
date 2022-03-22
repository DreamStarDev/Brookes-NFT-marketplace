function createFormObject(params) {
  const formData = new FormData();
  for (const key in params) {
    formData.set(key, params[key]);
  }
  return formData;
}

class Request {
  appEndpoint;
  appCode;
  constructor() {
    this.appEndpoint =
      process.env.REACT_APP_API_ENDPOINT;
  }

  getAuth() {
    let result = {};
    const brookesToken = localStorage.getItem("brookes-token");
    if (brookesToken) {
      result = { Authorization: `Token ${brookesToken}` };
    }
    return result;
  }

  async post(endpoint, formData, is_json = true) {
    let body = formData;
    if (is_json === false) {
      body = createFormObject(formData);
    }
    try {
      const url = `${this.appEndpoint}${endpoint}`;
      return await fetch(url, {
        method: "POST",
        body,
        ...(![
          "api/v1/login/",
          "api/auth/user/",
          "api/v1/check_token/",
        ].includes(endpoint) && {
          headers: {
            ...this.getAuth(),
          },
        }),
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async put(endpoint, formData, is_json = true) {
    try {
      const url = `${this.appEndpoint}${endpoint}`;
      let body = formData;
      if (is_json === false) {
        body = createFormObject(formData);
      }
      return await fetch(url, {
        method: "PUT",
        body,
        headers: {
          ...this.getAuth(),
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async get(endpoint, params = {}) {
    try {
      const url = `${this.appEndpoint}${endpoint}`;
      return await fetch(`${url}`, {
        headers: {
          ...this.getAuth(),
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(endpoint, formData) {
    try {
      const url = `${this.appEndpoint}${endpoint}`;
      return await fetch(url, {
        method: "DELETE",
        body: formData,
        headers: {
          ...this.getAuth(),
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new Request();
