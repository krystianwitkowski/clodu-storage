export default async (filter) => {
    let url;

    if(filter){
        url = `http://localhost:5001/api/uploadFile?file=${filter.file}`;
    }

    else {
        url = 'http://localhost:5001/api/uploadFile';
    }

    return fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
  }