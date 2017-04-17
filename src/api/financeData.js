import URL from './root'
//"quarter"

export function getQuarterController(id) {
    let options = { method: 'GET' },
        url = URL + "quarter/search/" + id;
    console.log(url);
    return fetch(url, options);
}

export function addQuarterController(year, numb, id) {

    console.log(year, numb, id);

    let newData = {
        "quarterDefinition": {
            "quarterName": "Q"+numb,
            "year": year
        }
    };

    let options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
                //'Token': getToken() || ''
            },
            body: JSON.stringify(newData) },
        url = URL + "quarter/" + id;
    return fetch(url, options);
}

export function addTaxController(year, numb, idEmployee, idQuarter) {

    console.log(year, numb, idEmployee, idQuarter);

    let newData = {
        "counterpartyName": name,
        "receivingDate": date
    };

    let options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
                //'Token': getToken() || ''
            },
            body: JSON.stringify(newData) },
        url = URL + "taxRecord/" + idEmployee + "/" + idQuarter;
    return fetch(url, options);
}


export function getKursController(date) {
    let options = { method: 'GET' },
        url = URL + "exchangeRatesUah/USD/" + date;
    return fetch(url, options);
}
