const url = "https://masterchefeg.com/dashboard/public/";


const callServer = async (url, requestOptions, pass) => {
    if (!pass) {
        if (requestOptions && requestOptions.headers && localStorage.getItem('siteLang')) {
            requestOptions.headers['Accept-Language'] = localStorage.getItem('siteLang')
        } else if (localStorage.getItem('siteLang')) {
            requestOptions = {
                headers: { 'Accept-Language': localStorage.getItem('siteLang') }
            }
        }
    }
    const response = await fetch(url, requestOptions);
    const jsonData = await response.json();
    return jsonData
}

export { callServer, url }
