export const getFormData = (formData) => {
  const { file, quarterName, year } = formData;
  const data=new FormData();
  data.append('file', file);
  data.append('quarterName', quarterName);
  data.append('year', year);

  return data;      
};