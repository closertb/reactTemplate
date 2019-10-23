require('colors');
const path = require('path');
const Koa = require('koa');
const staticSource = require('koa-static');
const router = require('./router');

const app = new Koa();
const staticPath = '../static';
const assetsPath = '../assets';

app.use(staticSource(path.join(__dirname, staticPath)));
app.use(staticSource(path.join(__dirname, assetsPath)));


app.use(router.routes())
  .use(router.allowedMethods());

const server = app.listen(8091, () => {
  const { port } = server.address();
  console.log(`当前服务器已经启动,请访问, http://127.0.0.1:${port}`.green);
});
