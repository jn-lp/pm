import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import Test from './Test';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Test} />
    </Router>
  );
}

export default App;
