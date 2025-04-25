import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import CryptoTable from './components/CryptoTable';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Crypto Tracker</h1>
        <CryptoTable />
      </div>
    </Provider>
  );
}

export default App;