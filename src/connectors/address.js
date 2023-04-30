import { callServer, url } from "./callServer"

export default function () {
    const list = async function () {
        const requestOptions = {
            method: 'get',
            headers: { 'Content-Type': 'application/json', 
            'Authorization': localStorage.getItem("MasterchefToken") 
        }
        };
        const res = await callServer(url + "api/v1/user/addresses", requestOptions);
        return res.data
    }

    const add = async function (data) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 
            'Authorization': localStorage.getItem("MasterchefToken")  },
            body: JSON.stringify(data)
        };
        const res = await callServer(url + "api/v1/user/address/create", requestOptions);
        return res.data
    }

    const remove = async function (data) {
        const requestOptions = {
            method: 'get',
            headers: { 'Content-Type': 'application/json', 
            'Authorization': localStorage.getItem("MasterchefToken")  }
        };
        const res = await callServer(url + "api/v1/user/address/delete/"+data.id, requestOptions);
        return res
    }

    const allCountries = async function () {
        const res = await callServer(url + "api/v1/all-countries");
        return res.data
    }

    const allStates = async function (data) {
        const res = await callServer(url + "api/v1/states/"+data.id);
        return res.data
    }

    const allCities = async function (data) {
        const res = await callServer(url + "api/v1/cities/"+data.id);
        return res.data
    }

    return {
        list, add, remove, allCountries, allStates, allCities
    }
}
