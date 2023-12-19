// App.js

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient'; // Import your Apollo Client instance
import './style.css';
import AnimationComponent from './compenets/AnimationComponent';
import VitalsDisplayComponent from './compenets/VitalsDisplayComponent';
import AutismKidStatusComponent from './compenets/AutismKidStatusComponent';
import DataFetchComponent from './compenets/DataFetchComponent';

const App = () => {
  return (
    <div className="app-container">
      <header>
        <h1>Monitoring App</h1>
      </header>

      <main>
        {/* Wrap components that use GraphQL with ApolloProvider */}
        <ApolloProvider client={client}>
          <section className="animation-section">
            <AnimationComponent />
          </section>

          <section className="data-fetch-section">
            <DataFetchComponent />
          </section>
        </ApolloProvider>

        {/* Components that do not use GraphQL */}
        <section className="vitals-section">
          <VitalsDisplayComponent />
        </section>

        <section className="status-section">
          <AutismKidStatusComponent />
        </section>
      </main>

      <footer>{/* Footer content goes here */}</footer>
    </div>
  );
};

export default App;
