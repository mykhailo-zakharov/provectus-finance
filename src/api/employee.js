
const URL = 'http://54.202.244.88:8082';

export function getAllEmployeesController() {
    let options = { method: 'GET' },
        url = URL + '/employee/employees';
    return fetch(url, options);
}

export function createNewEmployee(data) {
    console.log(data);
    let newData = Object.assign({}, data);
    let options = {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
                //'Token': getToken() || ''
            },
            body: JSON.stringify(newData) },
        url = URL + '/employee/';
    return fetch(url, options);
}



// /employee/ POST
// create new employee

// /employee/xxx GET
// get employee by id

// /employee/search/vasya - GET
// search by name-lastName-surname

// /employee/employees GET
// get all employees

// /user/createSession?login=xxx&password=yyy GET
// createSession