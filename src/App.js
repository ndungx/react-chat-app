import React from 'react';
import './App.css';
import Login from './Components/Login';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import AuthProvider from './Context/AuthProvider';
import ChatRoom from './Components/ChatRoom';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route component={Login} path="/login" />
          <Route component={ChatRoom} path="/" />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
