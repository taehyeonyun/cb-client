import request from 'superagent';

function isAuthenticated() {
    return !!localStorage.token;
}

function login(username, password) {
    const buffer = new Buffer(`${username}:${password}`);
    const token = buffer.toString('base64');

    return request.get('http://localhost:8080/cb/rest/version')
        .set('Authorization', `Basic ${token}`)
        .type('application/json')
        .then((data) => {
            localStorage.setItem('token', token);
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