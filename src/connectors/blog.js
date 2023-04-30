import { callServer, url } from "./callServer"

export default function (data) {
    const list = async function (page) {
        const res = await callServer(url + "api/v1/all-blogs/search"+page);
        return {data: res.blogs.data, totalPage: res.totalPage}
    }

    const getOne = async function (data) {
        const res = await callServer(url + "api/v1/blog/details/" + data.id);
        return res.data
    }

    return {
        list, getOne
    }
}
