import React, { Component } from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createLocalInterface } from 'apollo-local-query';
import schema from './server/schema';
import { execute } from 'graphql';

import './App.css';

import PostList from './PostList';

class App extends Component {
  constructor(...args) {
    super(...args);

    const localInterface = createLocalInterface({execute}, schema);

    this.client = new ApolloClient({
      networkInterface: localInterface,
      dataIdFromObject: r => r.id,
    });
  }
  render() {
    return (
      <ApolloProvider client={this.client}>
        <PostList />
      </ApolloProvider>
    );
  }
}

export default App;
