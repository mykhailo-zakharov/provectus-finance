import URL from './root';
import { getFormData } from '../utils/utils';
import axios from 'axios';
// "quarter"

export function getQuarterController(id) {
  let options = { method: 'GET' },
    url = `${URL}quarter/search/${id}`;
  console.log(url);
  return fetch(url, options);
}

export function addQuarterController(year, numb, id) {
  console.log(year, numb, id);

  const newData = {
    quarterDefinition: {
      quarterName: `Q${numb}`,
      year,
    },
  };

  let options = {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
                // 'Token': getToken() || ''
      },
      body: JSON.stringify(newData) },
    url = `${URL}quarter/${id}`;
  return fetch(url, options);
}

export function addTaxController(data, idEmployee, idQuarter) {
  let options = {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
                // 'Token': getToken() || ''
      },
      body: JSON.stringify(data) },
    url = `${URL}taxRecord/${idEmployee}/${idQuarter}`;
  return fetch(url, options);
}

export function editeTaxController(employeeId, quarterId, data) {
  let options = {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
                // 'Token': getToken() || ''
      },
      body: JSON.stringify(data) },
    url = `${URL}taxRecord/${employeeId}/${quarterId}`;
  return fetch(url, options);
}

export function getKursController(date) {
  let options = { method: 'GET' },
    url = `${URL}exchangeRatesUah/USD/${date}`;
  return fetch(url, options);
}

export function delTaxController(employeeId, quarterId, taxRecordId) {
  let options = {
      method: 'DELETE',
    },
        // body: JSON.stringify(newData) },
    url = `${URL}taxRecord/${employeeId}/${quarterId}/${taxRecordId}`;
  console.log('delete', url);

  return fetch(url, options);
}

export const upload = (formData, employeeId) => {
  const data = getFormData(formData);
  return axios({
    method: 'post',
    url: `${URL}import/parseTaxReport/${employeeId}`,
    data,
    config: { headers: { 'Content-Type': 'multipart/form-data' } },
  });
};

export const sendQuarterRecords = (quarterObj) => {
  return axios.post(`${URL}import/generateTaxReport`,
    JSON.stringify(quarterObj), { headers: { 'Content-Type': 'application/json' } },
  );
};

export const downloadFile = (location) => {
  window.location = `${URL}import/getFile/${location}`;
};
