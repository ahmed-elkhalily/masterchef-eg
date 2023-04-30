
import { callServer, url } from "./callServer"

export default function () {
    const list = async function (page) {
        const requestOptions = {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("MasterchefToken")
            },
        };
        const res = await callServer(url + "api/v1/user/orders"+ page, requestOptions);
        return {data: res.data, totalPage: res.meta.last_page }
    }

    const getOne = async function (data) {
        const requestOptions = {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("MasterchefToken")
            },
        };
        const res = await callServer(url + "api/v1/user/order/" + data.id, requestOptions);
        return res.data
    }

    const cancelOrder = async function (data) {
        const requestOptions = {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("MasterchefToken")
            },
        };
        const res = await callServer(url + "api/v1/user/order/cancel/" + data.id, requestOptions);
        return res
    }

    const invoice = async function (data) {
        const requestOptions = {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("MasterchefToken")
            },
        };
        const res = await callServer(url + "api/v1/user/order/invoice-download/" + data.id, requestOptions);
        return res
    }

    const refund = async function (data) {
        const requestOptions = {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("MasterchefToken")
            },
        };
        const res = await callServer(url + "api/v1/user/refund-request/create/" + data.id, requestOptions);
        return res
    }

    const add = async function (data) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("MasterchefToken")
            },
            body: JSON.stringify(data)
        };
        const res = await callServer(url + "api/v1/checkout/order/store", requestOptions);
        return res
    }


    const getShipping = async function (data) {
        const requestOptions = {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("MasterchefToken")
            }
        };
        const res = await callServer(url + "api/v1/checkout/get-shipping-cost/"+ data.id, requestOptions);
        return res
    }
    return {
        list, getOne, add, cancelOrder, invoice, refund, getShipping
    }
}
