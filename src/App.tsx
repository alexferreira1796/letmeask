import React from 'react';
import './styles/global.scss';

import AuthContextProvider from './contexts/auth';

import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import NewRoom from './pages/NewRoom';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" exact component={NewRoom} />
      </AuthContextProvider>
    </BrowserRouter>
    
  );
}

export default App;
