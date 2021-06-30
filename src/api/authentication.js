export default async (user) => {
    const url = `http://localhost:5001/api/users?name=${user.name}&password=${user.password}`;
    
    return fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}