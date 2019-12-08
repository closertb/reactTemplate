import dva from 'dva';
import hook from '@doddle/dva';
import { setPaginationParam } from 'antd-doddle';
import { setApp } from 'antd-doddle/decorator';
import 'antd/dist/antd.css';
import './style/index.less';

// Initialize
const app = dva({
  onError(e) {
    console.log(e);
  }
});

setPaginationParam({
  PN: 'pn',
  PS: 'ps'
});

hook({ app });

// 注册Model
function importAll(r) {
  r.keys().forEach(key => app.model(r(key).default));
}

importAll(require.context('./Layout', true, /model\.js$/));
importAll(require.context('./pages', true, /model\.js$/));

setApp(app);

// Router
app.router(require('./router').default);
// Start
app.start('#app');
