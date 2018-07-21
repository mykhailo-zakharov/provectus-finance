export const getFormData = (formData) => {
  const { files, quarterName, year } = formData;
  const data = new FormData();
  for (let i = 0; i < files.length; i++) {
    data.append('files', files[i]);
  }
  data.append('quarterName', quarterName);
  data.append('year', year);

  return data;
};
