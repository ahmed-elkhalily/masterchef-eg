import { callServer, url } from "./callServer";


export default function () {
    const list = async function (data) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("MasterchefToken")  }
        };
        const res = await callServer(url + "api/v1/carts", requestOptions);
        return res.cart_items.data
    }

    const add = async function (data) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("MasterchefToken")  },
            body: JSON.stringify(data)
        };
        const res = await callServer(url + "api/v1/carts/add", requestOptions);
        return res.data
    }


    const remove = async function (data) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("MasterchefToken")  },
            body: JSON.stringify(data)
        };
        const res = await callServer(url + "api/v1/carts/destroy", requestOptions);
        return res
    }


    const changeQty = async function (data) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("MasterchefToken")  },
            body: JSON.stringify(data)
        };
        const res = await callServer(url + "api/v1/carts/change-quantity", requestOptions);
        return res
    }

    const coupon = async function (data) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("MasterchefToken")  },
            body: JSON.stringify(data)
        };
        const res = await callServer(url + "api/v1/checkout/coupon/apply", requestOptions);
        return res
    }


    return {
        list, add, remove, changeQty, coupon
    }
}
