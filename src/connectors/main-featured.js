import { callServer, url } from './callServer'

export default function (data) {
	const getMainFeatured = async function () {
		// [{categoryId  , image }]
		const res = await callServer(url + 'api/v1/main-featured')
		return { data: res.data }
	}
	return {
		getMainFeatured
	}
}
