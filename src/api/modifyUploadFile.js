export default async (filter) => {
    let url = `http://localhost:5001/api/uploadFile?trash=${filter.trash}&id=${filter.id}`;

    return fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT'
    });
  }