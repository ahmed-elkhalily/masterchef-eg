import { callServer, url } from "./callServer"

export default function () {
  const list = async function () {
    const res = await callServer(url + "api/v1/all-categories")
    return res.data
  }

  return {
    list
  }
}
