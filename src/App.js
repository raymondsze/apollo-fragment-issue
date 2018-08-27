import React, { Component } from 'react';
import { ApolloProvider, Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';

import apolloClient from './apolloClient';
import logo from './logo.svg';
import './App.css';

const testingFragment = gql`
  fragment T1 on Testing {
    id
    value
    nested {
      id
    }
  }
`;

const testingFragment2 = gql`
  fragment T2 on Testing {
    id
    value
    nested {
      id
      value
    }
  }
`;

const testingQuery = gql`
  query {
    testing @client {
      id
      value
    }
  }
`;

const testing2Query = gql`
  query {
    testing @client {
      id
      ...T1
      ...T2
    }
    testing2 @client {
      id
      value
    }
  }
`;


const testing2QueryNoFragment = gql`
  query {
    testing @client {
      id
      nested {
        id
        value
      }
    }
    testing2 @client {
      id
      value
    }
  }
`;

const testingMutation = gql`
  mutation {
    updateTesting @client
  }
`;

const firstQuery = gql`${testing2Query}`
class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <div style={{ margin: 16 }}>
          <Query query={gql`${testing2Query} ${testingFragment} ${testingFragment2}`}>
            {({ data }) => (
              <div>
                <div>WithFragment</div>
                <pre>{JSON.stringify(data)}</pre>
                <Mutation mutation={testingMutation}>
                  {(mutate) => (
                    <div>      
                      <pre>{JSON.stringify(filter(testingFragment2, data.testing))}</pre>
                      <button onClick={() => mutate()}>Mutate</button>
                    </div>
                  )}
                </Mutation>
              </div>
            )}
          </Query>
          <Query query={testing2QueryNoFragment}>
            {({ data }) => (
              <div>
                <div>WithoutFragment</div>
                <pre>{JSON.stringify(data)}</pre>
                <Mutation mutation={testingMutation}>
                  {(mutate) => (
                    <div>      
                      <pre>{JSON.stringify(filter(testingFragment2, data.testing))}</pre>
                      <button onClick={() => mutate()}>Mutate</button>
                    </div>
                  )}
                </Mutation>
              </div>
            )}
          </Query>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
