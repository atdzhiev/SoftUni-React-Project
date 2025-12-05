const request = async (method, url, data) => {
    try {
        const baseUrl = "http://localhost:3030";

        const options = {};

        if (method !== 'GET') {
            options.method = method;

            if (data) {
                options.headers = {
                    'content-type': 'application/json',
                };

                options.body = JSON.stringify(data);
            }
        }

        const serializedAuth = localStorage.getItem('user');
        if (serializedAuth) {
            const auth = JSON.parse(serializedAuth);
            
            if (auth.accessToken) {
                options.headers = {
                    ...options.headers,
                    'X-Authorization': auth.accessToken,
                };
            }
        }

        const response = await fetch(baseUrl + url, options);

        if (response.status === 204) {
            return response;
        }

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || `Request failed with status ${response.status}`);

        }
        
        return result;
    } catch (err) {
        throw err;
    }
};

export const requestFactory = () => {
   
    return {
        get: request.bind(null, 'GET'),
        post: request.bind(null, 'POST'),
        put: request.bind(null, 'PUT'),
        delete: request.bind(null, 'DELETE'),
    }
};