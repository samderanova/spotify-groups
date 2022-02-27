import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

import Home from './pages/Home/Home';
import Room from './pages/Room/Room';
import UserContext from './components/UserContext';

import logo from './logo.svg';
import './App.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  function login() {
    fetch("http://localhost:5000/users/login")
      .then(res => res.json()
      .then(data => {
        window.location.href = data["url"]
      }));
  }

  function logout(e) {
    setIsLoggedIn(false);
    window.location.href = '/';
  }

  useEffect(() => {
    const paramString = window.location.href.split('?')[1];
    const urlParams = new URLSearchParams(paramString);
    const code = urlParams.get("code");
    const state = urlParams.get("state");

    if (code && state) {

      fetch('http://localhost:5000/users/get_token?' + paramString).then(res => {
        res.json().then(data => {
          
          console.log(data);

          if (data)
          {
            console.log(data["access_token"]);
            fetch('http://localhost:5000/user_data', {
              method: "GET",
              headers: {
                "Authorization" : "Bearer " + data["access_token"],
              }
            }).then(res => {
              res.json().then(data => {
                
                setUserData(data);
                setIsLoggedIn(true);
              })
            }).catch(err => {
              alert("Unfortunately, you must have Spotify Premium to use this app!");
            })
          }
        });
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
            <div></div>
          }
          {userData ?
            <Route path="/room" element={<Room userID={userData.id} />} />
          :
            <div></div>
          }

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
