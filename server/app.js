const Koa = require('koa');
const config = require('./config');
const router = require('./routes');
const app = new Koa();


app.use(router.routes());

app.listen(config.post, () => {
    console.log(`server is started at port listen ${config.post}`);
})
