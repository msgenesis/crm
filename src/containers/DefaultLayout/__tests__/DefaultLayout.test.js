import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter, Route} from 'react-router-dom';
import DefaultLayout from '../DefaultLayout';
import Login from '../../../Pages/Login/Login';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Route path="/" name="login" component={Login} /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
