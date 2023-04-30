import { callServer, url } from "./callServer"

export default function () {
  const listOffers = async function () {
    const requestOptions = {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
  };
   const res = await callServer(url+"api/v1/all-offers", requestOptions );   
    return res.data
  }

  const list = async function (data) {
    const requestOptions = {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
  };
   const res = await callServer(url+"api/v1/offer/"+data.id, requestOptions );   
    return res.data
  }

  return {
    list, listOffers
  }
}
