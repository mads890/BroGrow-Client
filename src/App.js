import './App.css';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import EmailConfirmation from './components/EmailConfirmation/EmailConfirmation';
import ProfilePage from './components/ProfilePage/ProfilePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import UpdateForm from './components/UpdateForm/UpdateForm';

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <nav className='nav'>
          <Navbar />
        </nav>
        <main>
          <Switch>
            <Route
              exact
              path={'/'}
              component={LandingPage}
            />
            <Route
              exact
              path={'/login'}
              component={LoginPage}
            />
            <Route
              exact
              path={'/register'}
              component={SignUpPage}
            />
            <Route
              exact
              path={'/user/confirm'}
              component={EmailConfirmation}
            />
            <Route
              exact
              path={'/user/:userId'}
              component={ProfilePage}
            />
            <Route
              exact
              path={'/user/:userId/form'}
              component={UpdateForm}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    );
  }
}