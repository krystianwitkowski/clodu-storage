/* Utilities */
import getTokens from '../utilities/getTokens.js';

const get = () => {
    const url = 'http://localhost:5001/api/tokens';
    
    return fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'X-Refresh-Token': getTokens().refreshToken
        }
    })
}

export default {
    get
}