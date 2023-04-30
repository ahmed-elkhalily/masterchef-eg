import { callServer, url } from "./callServer"

export default function () {
    const list = async function (data) {
        const requestOptions = {
            method: 'get',
            headers: { 'Content-Type': 'application/json',
             'Authorization': localStorage.getItem("MasterchefToken") 
            }
        };
        const res = await callServer(url + "api/v1/user/wishlists", requestOptions);
        return res.data
    }

    const add = async function (data) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 
            'Authorization': localStorage.getItem("MasterchefToken") 
        },
            body: JSON.stringify(data)
        };
        const res = await callServer(url + "api/v1/user/wishlists", requestOptions);
        return res.product
    }


    const remove = async function (data) {
        const requestOptions = {
            method: 'delete',
            headers: { 'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("MasterchefToken") 
        }
        };
        const res = await callServer(url + "api/v1/user/wishlists/"+data.product_id, requestOptions);
        return res
    }

    return {
        list, add, remove
    }
}
