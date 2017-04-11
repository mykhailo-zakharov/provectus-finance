import URL from './root'


export function getAllEmployeesController() {
    let options = { method: 'GET' },
        url = URL + 'employee/employees';
    return fetch(url, options);
}

export function createNewEmployee(data) {
    // console.log(data);
    let newData = Object.assign({}, data);
    let options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
                //'Token': getToken() || ''
            },
            body: JSON.stringify(newData) },
        url = URL + "employee/";
    return fetch(url, options);
}


export function deleteEmployeesController(id) {
    let options = {
        method: 'DELETE',
    },
        // body: JSON.stringify(newData) },
        url = URL + "employee/" + id;
    console.log(url);

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