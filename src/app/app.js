import React from 'react';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import Auth from '../pages/auth/auth';
import Home from '../pages/home/home';
import Friends from '../pages/friends/friends';
import Messages from '../pages/messages/messages';
import Events from '../pages/events/events';
import Articles from '../pages/articles/articles';
import Weather from '../pages/weather/weather';
import connection from '../helpers/data/connection';
import Navbar from '../navbar/navbar';
import authRequests from '../helpers/data/authRequests';
import './app.scss';

const PublicRoute = ({ component: Component, authenticated, ...rest }) => {
  const routeChecker = props => (authenticated === false
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } } } />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  const routeChecker = props => (authenticated === true
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } } } />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authenticated: false,
    user: '',
    pendingUser: true,
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          pendingUser: false,
        });
      } else {
        this.setState({
          authenticated: false,
          pendingUser: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  isAuthenticated = (user) => {
    this.setState({ authenticated: true, user });
  }

  render() {
    const { authenticated, pendingUser } = this.state;
    const logoutClicked = () => {
      authRequests.logoutUser();
      this.setState({
        authenticated: false, user: '',
      });
    };

    if (pendingUser) {
      return null;
    }
    return (
      <div className="App">
      <BrowserRouter>
        <React.Fragment>
          <div className='container-fluid'>
            <Navbar isAuthenticated={this.state.authenticated} logoutClicked={logoutClicked}></Navbar>
            <div className='row'>
              <Switch>
                <PrivateRoute path='/' exact component={Home} authenticated={this.state.authenticated}/>
                <PrivateRoute path='/home' component={Home} authenticated={this.state.authenticated}/>
                <PrivateRoute path='/friends' component={Friends} authenticated={this.state.authenticated}/>
                <PrivateRoute path='/messages' component={Messages} authenticated={this.state.authenticated}/>
                <PrivateRoute path='/articles' component={Articles} authenticated={this.state.authenticated}/>
                <PrivateRoute path='/events' component={Events} authenticated={this.state.authenticated}/>
                <PrivateRoute path='/weather' component={Weather} authenticated={this.state.authenticated}/>
                <PublicRoute path='/auth' component={Auth} authenticated={this.state.authenticated}/>
              </Switch>
            </div>
          </div>
        </React.Fragment>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
