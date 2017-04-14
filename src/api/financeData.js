import URL from './root'
//"quarter"

export function getQuarterController(id) {
    let options = { method: 'GET' },
        url = URL + "quarter/search/" + id;
    console.log(url);
    return fetch(url, options);
}

export function addQuarterController(year, numb, id) {

    console.log(data);

    let newData = Object.assign({}, data);

    // let options = {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json, text/plain, */*',
    //             'Content-Type': 'application/json'
    //             //'Token': getToken() || ''
    //         },
    //         body: JSON.stringify(newData) },
    //     url = URL + "quarter/" + id;
    // return fetch(url, options);
}