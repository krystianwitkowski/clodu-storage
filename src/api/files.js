/* Utilities */
import getTokens from '../utilities/getTokens.js';

const post = async (file) => {
    const url = 'http://localhost:5001/api/files';

    let formData = new FormData();

    formData.append('file', file)

    return fetch(url, {
        headers: {
            'X-Access-Token':  getTokens().accessToken
        },
        method: 'POST',
        body: formData
    });
    
}

const get = async (query) => {
    let url;

    if(query && query.id) {
        url = `http://localhost:5001/api/files?id=${query.id}`;
    }

    else {
        url = 'http://localhost:5001/api/files';
    }

    return fetch(url, {
        headers: {
            'X-Access-Token':  getTokens().accessToken,
            'Content-Type': 'application/json'
        }
    });

}

const put = async (query) => {
    let url;

    if(query && query.name === 'trash'){
        url = `http://localhost:5001/api/files?id=${query.id}&trash=${query.trash}`;
    }

    else if (query && query.name === 'starred'){
        url = `http://localhost:5001/api/files?id=${query.id}&starred=${query.starred}`;
    }

    return fetch(url, {
        headers: {
            'X-Access-Token':  getTokens().accessToken,
            'Content-Type': 'application/json'
        },
        method: 'PUT'
    });
}

const del = async (query) => {
    if(query){
        const url = `http://localhost:5001/api/files?id=${query}`;

        return fetch(url, {
            headers: {
                'X-Access-Token':  getTokens().accessToken,
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        })
    }
}

export default {
    post,
    get,
    put,
    delete: del
}
