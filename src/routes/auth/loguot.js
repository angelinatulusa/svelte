import * as api from 'api.js';

export function post(req, res) {
    api.del('session', req.body ).then(response => {
        res.setHeader('Content-Type', 'application/json');

        res.end(JSON.stringify(response));
    });
}