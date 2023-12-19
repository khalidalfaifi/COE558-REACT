import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient'; // Ensure this path is correct
import './style.css'; // Ensure this file exists
import AnimationComponent from './components/AnimationComponent'; // Correct the path if necessary
import VitalsDisplayComponent from './components/VitalsDisplayComponent'; // Correct the path if necessary
import AutismKidStatusComponent from './components/AutismKidStatusComponent'; // Correct the path if necessary
import DataFetchComponent from './components/DataFetchComponent'; // Correct the path if necessary

const App = () => {
  return (
    <div className="app-container">
      <header>
        <h1>Monitoring App</h1>
      </header>

      <main>
        <ApolloProvider client={client}>
          <section className="animation-section">
            <AnimationComponent />
          </section>

          <section className="data-fetch-section">
            <DataFetchComponent />
          </section>
        </ApolloProvider>

        <section className="vitals-section">
          <VitalsDisplayComponent />
        </section>

        <section className="status-section">
          <AutismKidStatusComponent />
        </section>
      </main>

      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
};

export default App;
