import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import React from 'react';

import Home from './pages/Home';
import Painel from './pages/Painel';

import { AuthProvider } from './context/AuthContext';
import useAuth from './hooks/useAuth';

function RotasProtegidas(props) {
  const { id, secret } = useAuth();
  return (
    <Route render={() => ((id && secret) ? props.children : <Redirect to="/" />)} />
  );
}

function Routes() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" exact component={Home} />
          <RotasProtegidas>
            <Route path="/" exact component={Painel} />
          </RotasProtegidas>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default Routes;
