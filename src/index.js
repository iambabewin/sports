import dva from 'dva';
import './index.css';
import 'antd/dist/antd.css';
import createHistory from 'history/createBrowserHistory';

// 1. Initialize
const app = dva({
  history: createHistory()
});
// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/user').default);
app.model(require('./models/college').default);
app.model(require('./models/profession').default);
app.model(require('./models/class').default);
app.model(require('./models/year').default);
app.model(require('./models/project').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
