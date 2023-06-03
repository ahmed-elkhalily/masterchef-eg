import { callServer, url } from './callServer'

export default function() {
	const list = async function() {
		const res = await callServer(url + 'api/v1/all-categories')
		// const res = await callServer(
		// 	'https://koolen.shaha.com.sa/public/api/v1/categories/first-level'
		// )
		return res.data
	}

	return {
		list
	}
}
