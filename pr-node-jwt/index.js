const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const { verifyToken } = require('./middleware');

router.post('/token', async (req, res) => {
    // const client_secret = req.body.client_secret;

    try{
        //API 등록 정보 조회
        const token = jwt.sign({
            id: 'pyc8992',
            auth_code: 'super-admin'
        }, 'jwt_secret');

        return res.json(token);
    } catch(e) {
        return res.status(500).end();
    }
});

router.get('/test', verifyToken, (req, res) => {
    res.json(req.decoded);
});

const app = express();

app.use('/', router);

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});