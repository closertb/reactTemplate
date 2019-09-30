import React from 'react';
import { Router, Route } from 'dva/router';
import Layout from './Layout';

export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Layout} />
    </Router>
  );
}
