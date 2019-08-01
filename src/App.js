import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from "./components/Home";
import About from "./components/About";
import User from "./components/User";
import Contact from "./components/Contact";
import NavBar from "./components/navbar";
import Registration from "./User/Registration";
import Login from "./User/Login";
import Profile from "./User/Profile";


class App extends React.Component {

  render() {

    return (
      <>
        <NavBar />
        <hr />
        <Switch>
          <Route exact path='/' component={props => {
            return (
              <Home {...props} />)
          }} />
          <Route path='/about' component={props => {
            return (
              <About {...props} />)
          }} />
          <Route path='/contact' component={props => {
            return (

              <Contact {...props} />)
          }} />
          <Route path='/user' component={props => {
            return (
              <User {...props} />)
          }} />
          <Route path='/registration' component={props => {
            return (
              <Registration {...props} />)
          }} />
          <Route path='/login' component={props => {
            return (
              <Login {...props} />)
          }} />
          <Route path='/profile' component={props => {
            return (
              <Profile {...props} />)
          }} />
        </Switch>
      </>
    );
  }
}

export default App;