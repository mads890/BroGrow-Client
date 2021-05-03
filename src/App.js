import './App.css';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import PrivateNav from './components/PrivateNav/PrivateNav';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import EmailConfirmation from './components/EmailConfirmation/EmailConfirmation';
import ProfilePage from './components/ProfilePage/ProfilePage';
import PasswordReset from './components/PasswordReset/PasswordReset';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import UpdateForm from './components/UpdateForm/UpdateForm';
import UpdatePage from './components/UpdatePage/UpdatePage';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loggedIn: false,
        userId: null,
    }
  }

  onLogin = (id) => {
    this.setState({
      loggedIn: true,
      userId: id
    })
  }

  onLogout = () => {
    this.setState({
      loggedIn: false,
      userId: null
    })
  }

  render() {
    let navToUse = this.state.loggedIn ? <PrivateNav userId={this.state.userId} onLogout={this.onLogout} /> : <Navbar />

    return (
      <div className="App">
        <nav className='nav'>
          {navToUse}
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
              component={() => <LoginPage onLogin={this.onLogin} />}
            />
            <Route
              exact
              path={'/register'}
              component={() => <SignUpPage onLogin={this.onLogin} />}
            />
            <Route
              exact
              path={'/user/confirm'}
              component={EmailConfirmation}
            />
            <Route
              exact
              path={'/user/reset'}
              omponent={PasswordReset}
            />
            <Route
              exact
              path={'/user/:userId'}
              component={ProfilePage}
            />
            <Route
              exact
              path={'/user/:userId/intake'}
              component={UpdateForm}
            />
            <Route
              exact
              path={'/user/:userId/update/:section'}
              component={UpdatePage}
            />
            <Route
              exact
              path={'/reset'}
              component={PasswordReset}
            />
            <Route
              exact
              path={'/user/:userId/admindb'}
              component={AdminDashboard}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    );
  }
}