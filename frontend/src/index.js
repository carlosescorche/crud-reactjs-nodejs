import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react'
import { BrowserRouter as Router } from 'react-router-dom'
import './sass/app.scss';

import Routes from './routes';

import Store from './store'

ReactDOM.render(
    <Router>
        <Provider store={new Store()}>
            <Routes />
        </Provider>
    </Router>, 
    document.getElementById('root')
);
