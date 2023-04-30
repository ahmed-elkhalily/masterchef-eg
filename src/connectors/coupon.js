import { callServer, url } from "./callServer";

export default function () {
     const apply = async function (data) {
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
        apply
    }
}
