const Router = require('koa-router');
const controllers = require('../controllers');
const router = new Router();

router.get('/index', controllers.home.index);

module.exports = router;