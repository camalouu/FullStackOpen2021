import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloClient, ApolloProvider, InMemoryCache, split, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const authLink = setContext((_, { headers }) => {
    const token = window.localStorage.getItem('user')
    return {
        headers: {
            ...headers,
            Authorization: token ? `bearer ${token}` : null
        }
    }
})

const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/graphql',
    options: {
        reconnect: true
    }
});

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    authLink.concat(httpLink),
);


const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)