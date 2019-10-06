import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { TOKEN as token } from './configs/constants';
import { resolvers, typeDefs, defaults } from './client/index';
import LayoutRouter from './router';
import './style/index.less';
import './style/markdown.css';

// Initialize
const cache = new InMemoryCache();
const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    Authorization: `bearer ${token}`,
  }
}));
const httpLink = new HttpLink({
  uri: `https://api.github.com/graphql?_graphql_explorer_session=${token}`,
  batchInterval: 10,
  opts: {
    credentials: 'cross-origin',
  },
});
const client = new ApolloClient({
  clientState: { resolvers, defaults, cache, typeDefs },
  cache, // 本地数据存储
  link: authLink.concat(httpLink)
});

function App() {
  return (
    <ApolloProvider client={client}>
      <LayoutRouter />
    </ApolloProvider>
  );
}

render((
  <App />
), document.getElementById('app'));
