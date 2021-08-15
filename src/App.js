import React from "react";
import {Link , Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Home from './Home.js'
import Formpizza from './Formpizza.js'

import './App.css'

const App = () => {
  const histo = useHistory();

  return (
    <div className='App'>

      <h1>Lambda Eats</h1>

      <nav  className='App-header'>
        <Link to="/" className = 'App-link' >Home</Link>
        <Link to="/pizza" className = 'App-link' >Pizza</Link>
        <button  type="button" onClick={() => histo.goBack()}>Go Back!</button>

        <Route exact path="/pizza" component={Formpizza}/>
        <Route exact path="/" component={Home}/>
      </nav>

    </div>
  );
};
export default App;
