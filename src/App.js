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
import EventFeed from './pages/EventFeed'
import EventCreate from './pages/EventCreate'
import axios from 'axios'


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      firstname: '',
      lastname: '',
    }
  }

  LiftMeUp = (message) => {
    this.setState({
      username: message.username,
      email: message.email,
      password: message.password,
      firstname: message.firstname,
      lastname: message.lastname
    },
      () => this.SigningUp()
    )
  }

  SigningUp = () => {
    axios({
      method: 'POST',
      url: 'https://final-project-healthy.herokuapp.com/api/v1/users/',
      data: {
        username: `${this.state.username}`,
        email: `${this.state.email}`,
        password: `${this.state.password}`,
        first_name: `${this.state.firstname}`,
        last_name: `${this.state.lastname}`
      }
    }).then(result => {
      this.props.history.push('/profile')
    })
      .catch(error => {
        console.log(`Sign-up failed: ${error}`)
        console.log(error.response.data.message)
      })
  }
  LogMeUp = (message) => {
    this.setState({
      username: message.username,
      password: message.password
    },
      () => this.LoginAccount()
    )
  }

  LoginAccount = () => {
    axios({
      method: 'POST',
      url: 'https://final-project-healthy.herokuapp.com/api/v1/sessions/login',
      data: {
        username: `${this.state.username}`,
        password: `${this.state.password}`
      }
    }).then(result => {
      let JWT = result.data.auth_token;

      localStorage.setItem('userToken', JWT)

      this.props.history.push('/profile')
    })
  }

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
              <Registration {...props} LiftMeUp={this.LiftMeUp} />)
          }} />
          <Route path='/login' component={props => {
            return (
              <Login {...props} LogMeUp={this.LogMeUp} />)
          }} />
          <Route path='/profile' component={props => {
            return (
              <Profile {...props} />)
          }} />
          <Route path="/events/create" component={EventCreate} />
          <Route path="/events/" component={EventFeed} />
        </Switch>
      </>
    );
  }
}

export default App;