import axios from 'axios'

class HttpService {
	static async getRequest({ url }) {
		return axios
			.get(url)
			.then((res) => res.data)
			.catch((err) => {
				throw err.response.data || err
			})
	}

	static async postRequest({ url, body }) {
		return axios
			.post(url, body)
			.then((res) => res.data)
			.catch((err) => {
				throw err.response.data || err
			})
	}

	static async putRequest({ url, body }) {
		return axios
			.put(url, body)
			.then((res) => res.data)
			.catch((err) => {
				throw err.response.data || err
			})
	}

	static async patchRequest({ url, body }) {
		return axios
			.patch(url, body)
			.then((res) => res.data)
			.catch((err) => {
				throw err.response.data || err
			})
	}

	static async deleteRequest({ url }) {
		return axios
			.delete(url)
			.then((res) => res.data)
			.catch((err) => {
				throw err.response.data || err
			})
	}
}

export default HttpService
