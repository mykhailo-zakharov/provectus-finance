//
// import {getAllEmployeesController, deleteEmployeesController} from '../api/employee'
//
// import {SAVE_LIST_EMPLOYEE, DELETE_EMPLOYEE} from '../constants/System'
//
//
// export const getAllEmployees = (params = {}) => (dispatch, getState) => {
//
//     getAllEmployeesController(dispatch)
//         .then(function (response) {
//                 return response.json();
//             })
//         .then(function (message) {
//
//             console.log('message in operators :', message);
//
//             if (message.error) throw new Error();
//
//             dispatch({
//                 type: SAVE_LIST_EMPLOYEE,
//                 data: message.content
//             });
//
//
//         }).catch((error) => console.log(error));
//
// };
//
//
// export const deleteEmployees = (params = {}) => (dispatch, getState) => {
//
//     deleteEmployeesController(dispatch)
//         .then(function (response) {
//                 return response.json();
//             })
//         .then(function (message) {
//
//             console.log('message in operators :', message);
//
//             if (message.error) throw new Error();
//
//             dispatch({
//                 type: DELETE_EMPLOYEE
//             });
//
//
//         }).catch((error) => console.log(error));
//
// };
//
