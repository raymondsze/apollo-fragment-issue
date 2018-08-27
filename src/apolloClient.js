import ApolloClient from 'apollo-boost';

export default new ApolloClient({
  // uri: '/graphql',
  clientState: {
    defaults: {
      testing: {
        id: 'testing',
        value: 10,
        nested: {
          id: 'nested',
          value : 30,
          __typename: 'Nested',
        },
        __typename: 'Testing',
      },
      testing2: {
        id: 'testing2',
        value: 20,
        __typename: 'Testing2',
      }
    },
    resolvers: {
      Mutation: {
        updateTesting: (_: any, args: any, { cache, ...c }: any) => {
          // const id = `Testing:testing`;
          // cache.writeData({ id, data: { value: 40 } });
          return null;
        },
      },
    },
    typeDefs: `
      type Nested {
        id: ID!
        value: Float
      }
      type Testing {
        id: ID!
        value: Float
        nested: Nested
      }
      type Query {
        testing: Testing
      }
      type Mutation {
        updateTesting: String
      }
    `,
  },
});
