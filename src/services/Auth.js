import request from 'superagent';

function isAuthenticated() {
    return !!localStorage.token;
}

function login(username, password, url) {
    const buffer = new Buffer(`${username}:${password}`);
    const token = buffer.toString('base64');
    console.log(url);
     return request.get(`${url}/cb/rest/user/${username}`)
        .set('Authorization', `Basic ${token}`)
        .type('application/json')
        .then((data) => {
            localStorage.setItem('token', token);
            console.log(data);
        });
}

function logout() {
    localStorage.removeItem('token');
}

export default {
    isAuthenticated,
    login,
    logout
}