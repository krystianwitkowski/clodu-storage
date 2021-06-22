export default async (file) => {
    let formData = new FormData();
    
    formData.append('file', file)
  
    return fetch('http://localhost:5001/api/uploadFile', {
        headers: {
            'Content-Type': 'application/json'
        }
        method: 'POST',
        body: formData
    });
  }