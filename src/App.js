import logo from './logo.svg';
import './App.css';
import { UserProvider } from './UserContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './Header/Header';
import Home from './Home/Home';
import { useState } from 'react';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Destination from './Destination/Destination';
import Profile from './Profile/Profile';


function App() {
  const userInfo = {
    isLoggedIn: false,
    name: "Kaiyum Islam"
  }
  const [userLoggedIn, setUserLoggedIn] = useState(userInfo);
  return (
    <UserProvider value={[userLoggedIn, setUserLoggedIn]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <PrivateRoute path="/destination/:id">
            <Destination></Destination>
          </PrivateRoute>
          <Route path="/profile">
            <Profile></Profile>
          </Route>
        </Switch>
      </Router>
    </UserProvider>
  );
}
export default App;
