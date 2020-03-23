import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import './App.css';


const client = new ApolloClient({
  uri: 'https://pi-project-097921097e.herokuapp.com/pi-project/dev/',
});

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">

    </div>
    </ApolloProvider>
  );
}

export default App;
