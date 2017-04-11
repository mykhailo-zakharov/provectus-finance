import URL from './root'
//"quarter"

export function getQuarterController(id) {
    let options = { method: 'GET' },
        url = URL + "quarter/" + id;
    console.log(url);
    return fetch(url, options);
}

// export function createNewEmployee(data) {
//     // console.log(data);
//     let newData = Object.assign({}, data);
//     let options = {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json, text/plain, */*',
//                 'Content-Type': 'application/json'
//                 //'Token': getToken() || ''
//             },
//             body: JSON.stringify(newData) },
//         url = URL + "employee/";
//     return fetch(url, options);
// }