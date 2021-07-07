import TokensAPI from '../api/tokens.js';

export default async () => {
    const res = await TokensAPI.get();
    const tokens = await res.json();

    localStorage.setItem('tokens', JSON.stringify(tokens))

    return res;
}