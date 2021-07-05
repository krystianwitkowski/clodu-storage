const post = async (user) => {
    const url = 'http://localhost:5001/api/users';

    return fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: user
    });
}

export default {
    post
}