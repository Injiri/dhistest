let baseUrl = ''

/**
 * Sets the base URL.
 * @param {String} url
 */
export const setBaseUrl = url => (baseUrl = `${url}/`)

/**
 * @param {String} endpoint
 * @returns Server response.
 */
export const get = async endpoint =>
    await (await fetch(baseUrl + endpoint, {
        method: 'GET',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
        },
    })).json()

/**
 * Puts data.
 * @param {String} endpoint
 * @param {Object} data
 * @returns Server response.
 */
export const put = async (endpoint, data) =>
    await (await fetch(baseUrl + endpoint, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
    })).json()
