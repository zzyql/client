import { split } from 'apollo-link';
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink,createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloClient } from "apollo-client";

const httpLink = new HttpLink({
  uri: 'https://murmuring-fortress-24950.herokuapp.com/'
});
  
// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: 'wss://murmuring-fortress-24950.herokuapp.com/',
  options: {
    reconnect: true
  }
});
  
// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
  

const client=new ApolloClient({
    link,
    cache: new InMemoryCache()
  })

export default client