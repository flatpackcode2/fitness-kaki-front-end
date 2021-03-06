import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from "./components/Home";
import Upload from "./components/Upload";
import NutritionList from "./components/NutritionList";
import About from "./components/About";
import User from "./components/User";
import Contact from "./components/Contact";
import NavBar from "./components/navbar";
import Registration from "./User/Registration";
import Login from "./User/Login";
import Profile from "./User/Profile";
import EventFeed from "./pages/EventFeed";
import EventCreate from "./pages/EventCreate";
import axios from 'axios'
import './App.css';
import Loader from "./images/loader.gif";

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      loggedInStatus: 'loggedOut',
      users: [],
      current_user: {}
    }
  }

  componentDidMount = () => {
    let loginStatus = localStorage.getItem('loggedInStatus')
    if(loginStatus==null){
      loginStatus='loggedOut';
    }
    let userData = localStorage.getItem('userData')
    this.setState({
      loggedInStatus: loginStatus,
      current_user: JSON.parse(userData)
    })
  }

  updateDetails = () => {
    let userData = localStorage.getItem('userData')
    this.setState({
      current_user: JSON.parse(userData)
    })
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
        console.log(error)
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
    console.log(`loggedinStatus in LoginAccount: ${this.state.loggedInStatus}`);
    axios({
      method: 'POST',
      url: 'https://final-project-healthy.herokuapp.com/api/v1/sessions/login',
      data: {
        username: `${this.state.username}`,
        password: `${this.state.password}`
      }
    })
    .then(result => {
      let JWT = result.data.auth_token;
      localStorage.setItem('userToken', JWT)
      localStorage.setItem('userData', JSON.stringify(result.data.user))
      localStorage.setItem('loggedInStatus', 'loggedIn')
      this.setState({ loggedInStatus: 'loggedIn', current_user: result.data.user })
      this.props.history.push('/profile')
    }).catch(error => {
      console.log(error)
    }

    )
  }

  LogOutAccount = () => {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userData')
    localStorage.setItem('loggedInStatus', 'loggedOut')

    this.setState(
      { loggedInStatus: 'loggedOut' }
    )

    this.props.history.push('/')
  }

  //get a list of all users
  getUserDetails = () => {
    axios({
      method: 'GET',
      url: 'https://final-project-healthy.herokuapp.com/api/v1/users/',
    }).then(result => {
      let temp_data = result.data;
      this.setState({ users: temp_data })
    }).catch(error => {
      console.log(error)
    })
  }

  render() {

    return (
      <>
        <NavBar isLoggedIn={this.state.loggedInStatus} logout={this.LogOutAccount} />
        <Switch>
          <Route exact path='/' component={props => {
            return (
              <Home {...props} />)
          }} />
          <Route path='/upload' component={props => {
            return (
              <Upload {...props} />)
          }} />
          <Route path='/nutrition/:food' component={props => {
            return (
              <NutritionList {...props} />)
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
              <Profile {...props} updateDetails={this.updateDetails} current_user={this.state.current_user} />)
          }} />
          <Route exact path='/events' component={props => {
            return (
              <EventFeed {...props} current_user = {this.state.current_user} users={this.state.users} />)
          }} />
          <Route path='/events/create' component={props => {
            return (
              <EventCreate {...props} />)
          }} />
        </Switch>
      </>
    );
  }
}

export default App;