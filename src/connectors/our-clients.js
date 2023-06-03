import { callServer, url } from './callServer'

export default function() {
	const clientsList = async function() {
		const res = await callServer(url + 'api/v1/clients')
		return { data: res.data }
	}
	return { clientsList }
}
