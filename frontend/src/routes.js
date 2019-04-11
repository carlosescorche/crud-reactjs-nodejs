import React from 'react';
import {Route,Switch} from 'react-router-dom'
import List from './pages/list'
import Add from './pages/add'
import Edit from './pages/edit'

export default () => (
    <Switch>
      <Route exact path="/" component={List}/>
      <Route exact path="/add" component={Add} />
      <Route exact path="/edit/:id" component={Edit} />
      <Route render={() => (<h1>404</h1>)} />
    </Switch>
)

