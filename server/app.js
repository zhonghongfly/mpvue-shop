const Koa = require('koa');
const Router = require('koa-router');
const config = require('./config');
const app = new Koa();

const router = new Router();

router.get('*', (ctx, next) => {
    ctx.body = "hello world";
});

app.use(router.routes());

app.listen(config.post, () => {
    console.log(`server is started at port listen ${config.post}`);
})
