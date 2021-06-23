import React from 'react';
import './styles/global.scss';

import AuthContextProvider from './contexts/auth';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import NewRoom from './pages/NewRoom';
import Room from './pages/Room';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" exact component={NewRoom} />
          <Route path="/rooms/:id" exact component={Room} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
    
  );
}

export default App;
