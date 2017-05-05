import React, { Component } from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createLocalInterface } from 'apollo-local-query';
import schema from './server/schema';
import { execute } from 'graphql';
import GraphiQL from 'graphiql';
import gql from 'graphql-tag';

import './App.css';
import './graphiql.css';

import PostList from './PostList';

class App extends Component {
  constructor(...args) {
    super(...args);

    const localInterface = createLocalInterface({execute}, schema);

    this.graphQLFetcher = function (graphQLParams) {
      var parsedQuery = gql`${graphQLParams.query}`;

      return localInterface.query({'query': parsedQuery}).then(r => r);
    }

    this.client = new ApolloClient({
      networkInterface: localInterface,
      dataIdFromObject: r => r.id,
    });
  }
  render() {
    return (
      <ApolloProvider client={this.client}>
        <div>
          <PostList />
          <div style={{height:"700px"}}>
            <GraphiQL fetcher={this.graphQLFetcher} />
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
