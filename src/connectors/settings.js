import { callServer, url } from "./callServer"

export default function () {

  const getFooter = async function () {
   const data1 = await callServer(url+"api/v1/setting/footer");
   const data2 = await callServer(url+"api/v1/setting/all_footer_btns");   
    return {
        ...data1, ...data2.data
    }
  }

  return {
    getFooter
  }
}
