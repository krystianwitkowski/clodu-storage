export default async (file) => {
  const url = 'http://localhost:5001/api/uploadFile';

  let formData = new FormData();
  
  formData.append('file', file)

  return fetch(url, {
      method: 'POST',
      body: formData
  });
}