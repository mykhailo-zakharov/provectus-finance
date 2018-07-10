import {DEV_USER_ID, PROD_USER_ID} from '../constants/constants'

export const getFormData = (formData) => {
  const { file, quarterName, year } = formData;
  const data=new FormData();
  data.append('file', file);
  data.append('quarterName', quarterName);
  data.append('year', year);

  return data;      
};

export const getUserId=()=>
  window.location.hostname==='localhost' 
    ? PROD_USER_ID
    : DEV_USER_ID; 


