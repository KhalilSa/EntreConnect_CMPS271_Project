import { ApolloClient, InMemoryCache, TypePolicies } from '@apollo/client';

const typePolicies : TypePolicies = {
    Query: {
        fields: {
            postPaginatedList: {
                keyArgs: false,
                merge(existing = [], incoming) {
                    return [...existing, ...incoming];
                }
            }
        }
    }
}

const client = new ApolloClient({
  uri: 'https://sinodinovka.eu-central-a.ibm.stepzen.net/api/entreconnect/__graphql',
  headers: {'Authorization':'apikey sinodinovka::local.net+1000::e39db5f4e0c48b845ff2c9d5a55d0daea973ac79b29e0b4ffa58fdefd0027dd0'},
  cache: new InMemoryCache(typePolicies),
});

export default client;