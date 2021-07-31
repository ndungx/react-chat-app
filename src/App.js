import React from 'react';
import './App.css';
import Login from './Components/Login';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import AuthProvider from './Context/AuthProvider';
import ChatRoom from './Components/ChatRoom';
import AppProvider from './Context/AppProvider';
import AddRoomModal from './Components/Modals/AddRoomModal';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Switch>
            <Route component={Login} path="/login" />
            <Route component={ChatRoom} path="/" />
          </Switch>
          <AddRoomModal />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
