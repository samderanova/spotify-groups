import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

import Home from './pages/Home/Home';

import logo from './logo.svg';
import './App.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function login(e) {
    fetch("http://localhost:5000/users/login")
      .then(res => res.json()
      .then(data => {
        console.log(data["url"]);
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
              method: "POST",
              body: JSON.stringify({
                "access_token" : data["access_token"],
              })
            }).then(res => {
              res.json().then(data => {
                console.log(data);
              })
            })
          }
        });
      });

      setIsLoggedIn(true);
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
                  <NavDropdown title={`Hello, user!`} id="basic-nav-dropdown">
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
