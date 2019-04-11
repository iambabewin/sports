import React from 'react';
import { Router, Route, Switch ,Link} from 'dva/router';
import IndexPage from './routes/IndexPage';
import styles from './router.css';
import Login from './routes/Login';
import Register from './routes/Register';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <div className={styles['tall']}>
        <Switch>
          <Route path="/" exact component={IndexPage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/:id" component={IndexPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default RouterConfig;
