import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/Provider';

function App() {
  return (
    <main>
      <Provider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/meals" component={ Recipes } />
          </Switch>
        </BrowserRouter>
      </Provider>
    </main>
  );
}

export default App;
