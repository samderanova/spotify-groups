import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

import Home from './pages/Home/Home';
import Room from './pages/Room/Room';

import logo from './logo.svg';
import './App.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState('');

  function login() {
    fetch("http://localhost:5000/users/login")
      .then(res => res.json()
      .then(data => {
        window.location.href = data["url"]
      }));
  }

  function logout(e) {
    setIsLoggedIn(false);
    localStorage.setItem("loggedIn", false);
    window.location.href = '/';
  }


  async function loginOrRegisterUser(userData, tokens) {
    localStorage.setItem("string", userData["id"]);
    localStorage.setItem("loggedIn", true);

    fetch ('http://localhost:5000/login_user', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "user_id": userData["id"],
        "display_name": userData["display_name"],
        "access_token": tokens["access_token"],
        "refresh_token": tokens["refresh_token"],
      })
    });
  }

  async function getUserData(authToken) {
    const userData = await fetch('http://localhost:5000/user_data', {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + authToken
      }
    });
    return userData.json();
  }

  async function getUser(paramString) {
    const tokenResponse = await fetch('http://localhost:5000/users/get_token?' + paramString);
    const tokens = await tokenResponse.json();
    const userData = await getUserData(tokens["access_token"]);
    loginOrRegisterUser(userData, tokens);
    return userData;
  }

  async function getUserFromDB() {
    const userDataDB = await fetch('http://localhost:5000/get_user_from_db', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "user_id": localStorage.getItem("string")
      })
    });
    return userDataDB.json();
  }

  useEffect(() => {
    const paramString = window.location.href.split('?')[1];
    const urlParams = new URLSearchParams(paramString);
    const code = urlParams.get("code");
    const state = urlParams.get("state");

    if (code && state) {
      getUser(paramString).then(data => {
        window.location.href = '/';
      });
    }
    else {
      console.log(localStorage.getItem("loggedIn"));
      getUserFromDB().then(data => {
        console.log(data, localStorage.getItem("loggedIn"));
        if (data != 404 && localStorage.getItem("loggedIn") !== "false") {
          setUserData(data);
          setIsLoggedIn(true);
        }
      });
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar bg="dark" expand="lg" variant="dark">
          <Container>
            <Navbar.Brand href="/">
              <img src={logo} alt="SpotiGroup logo" width="100" />
              SpotiGroup
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                {isLoggedIn ?
                  <NavDropdown title={`Hello, ${userData.display_name}!`} id="basic-nav-dropdown">
                    <NavDropdown.Item>
                      <button type="button" className="btn btn-none w-100 text-start" onClick={logout}>Logout</button>
                    </NavDropdown.Item>
                  </NavDropdown>
                :
                  <button type="button" className="btn btn-none" onClick={login} style={{ color: "white" }}>Login</button>
                }
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          {userData ?
            <Route path="/room/:roomID" element={<Room userID={userData.id} />} />
          :
            <Route></Route>
          }
          {userData ?
            <Route path="/room" element={<Room userID={userData.id} />} />
          :
            <Route></Route>
          }

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
