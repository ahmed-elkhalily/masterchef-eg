import { callServer, url } from "./callServer";

export default function (data) {
  const list = async function (page) {
    const res = await callServer(url + "api/v1/product/all-products"+ page);
    return {data: res.data, totalPage: res.meta.last_page }
  }

  const getOne = async function (data) {
    const requestOptions = {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    };
    const res = await callServer(url + "api/v1/product/details/" + data.id, requestOptions);
    return res.data
  }

  const listRelatedProducts = async function (data) {
    const res = await callServer(url + "api/v1/product/related/" + data.id);
    return res.data
  }
  const listCategoryProducts = async function (data) {
    const res = await callServer(url + "api/v1/product/get_products_by_category/" + data.id);
    return res.data
  }

  const searchProducts = async (data) => {

    const requestOptions = {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    };
    let query = '?'
    if (data.category_slug) {
      query = query + 'category_slug=' + data.category_slug
    }
    if (data.keyword) {
      query === '?' ? query = query + 'keyword=' + data.keyword :query = query + '&keyword=' + data.keyword
    }
    if (data.min_price) {
      query === '?' ? query =query + 'min_price=' + data.min_price : query =query + '&min_price=' + data.min_price
    }
    if (data.max_price) {
      query === '?' ? query =query + 'max_price=' + data.max_price :query = query + '&max_price=' + data.max_price
    }
    const res = await callServer(url + "api/v1/product/search"+ query, requestOptions);
    return res.products.data
  }

  const productReviews = async (data) => {
    const requestOptions = {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    };
    const res = await callServer(url + "api/v1/product/reviews/" + data.id, requestOptions);
    return res.data
  }


  const submitReview = async (data) => {
    const requestOptions = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("MasterchefToken")
      },
      body: JSON.stringify(data)
    };
    const res = await callServer(url + "api/v1/user/review/submit", requestOptions, true);
    return res.data
  }

  return {
    list, getOne, listCategoryProducts, searchProducts, productReviews, submitReview, listRelatedProducts
  }
}
