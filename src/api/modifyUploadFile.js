export default async (filter) => {
    let url;

    if(filter.name === 'trash'){
        url = `http://localhost:5001/api/uploadFile?trash=${filter.trash}&id=${filter.id}`;
    }

    else if (filter.name === 'starred'){
        url = `http://localhost:5001/api/uploadFile?starred=${filter.starred}&id=${filter.id}`;
    }

    return fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT'
    });
  }