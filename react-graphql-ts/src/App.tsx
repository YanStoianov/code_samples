import React from 'react';
import HomePage from "./pages/HomePage";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://beta.pokeapi.co/graphql/v1beta',
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <HomePage/>
            </div>
        </ApolloProvider>
    );
}

export default App;
