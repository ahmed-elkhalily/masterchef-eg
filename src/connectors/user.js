import { callServer, url } from "./callServer"

export default function () {
    const login = async function (formData) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };
        return callServer(url + "api/v1/auth/login", requestOptions, true);
    }


    const signup = async function (formData) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };
        return callServer(url + "api/v1/auth/signup", requestOptions, true);
    }

    const verify = async function (formData) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };
        return callServer(url + "api/v1/auth/verify", requestOptions, true);
    }

    const resendCode = async function (formData) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };
        return callServer(url + "api/v1/auth/resend-code", requestOptions, true);
    }


    const createPassword = async function (formData) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };
        return callServer(url + "api/v1/auth/password/create", requestOptions, true);
    }

    const resetPassword = async function (formData) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };
        return callServer(url + "api/v1/auth/password/reset", requestOptions, true);
    }

    const logOut = async function () {
        return callServer(url + "api/v1/auth/logout");
    }

    const userInfo = async function () {
        const requestOptions = {
            method: 'get',
            headers: { 'Authorization': localStorage.getItem("MasterchefToken")  },
        };
        return callServer(url + "api/v1/user/info", requestOptions, true);
    }
  
    const editUser = async function (formData) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Authorization': localStorage.getItem("MasterchefToken")  },
            body: JSON.stringify(formData)
        };
        return callServer(url + "api/v1/user/info/update", requestOptions, true);
    }

    return {
        login, signup, verify, resendCode, createPassword, resetPassword, logOut, userInfo, editUser
    }
}
