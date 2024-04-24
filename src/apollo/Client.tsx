import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://sinodinovka.eu-central-a.ibm.stepzen.net/api/entreconnect/__graphql',
  headers: {'Authorization':'apikey sinodinovka::local.net+1000::e39db5f4e0c48b845ff2c9d5a55d0daea973ac79b29e0b4ffa58fdefd0027dd0'},
  cache: new InMemoryCache(),
});

export default client;