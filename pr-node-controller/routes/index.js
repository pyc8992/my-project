const express = require('express');
const router = express.Router();

const userCtrl = require('../controller/users');

/* user 라우팅 로직 */
router.get('/users', userCtrl.index);
router.get('/users/:id', userCtrl.read);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.delete('/:id', controller.destroy);


module.exports = router;