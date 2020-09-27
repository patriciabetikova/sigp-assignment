import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import HomePage from 'pages/HomePage'
import DetailPage from 'pages/DetailPage'
import FavoritesPage from 'pages/FavoritesPage'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/detail/:id" component={DetailPage} />
      <Route path="/favorites" component={FavoritesPage} />
    </Switch>
  </Router>
)

export default App
