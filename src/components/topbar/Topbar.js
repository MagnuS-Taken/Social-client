import React, { useState, useEffect } from "react";
import { Nav, Navbar, FormControl, Button, Form } from "react-bootstrap";
import { Search, Forum, ExitToApp } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../../context/AuthContext";

const iconStyle = { color: "white" };

export default function Topbar() {
  const history = useHistory();
  const [user, setUser] = useState({});

  const { logout, currentUser, sourcePath } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      history.push("/login");
    } catch {
      console.log("Failed to log out !!!");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const resp = await axios.get(`/user?username=${currentUser.displayName}`);
      setUser(resp["data"]);
    };

    fetchUser();
  }, [currentUser]);

  return (
    <React.Fragment>
      <Navbar
        bg="success"
        variant="dark"
        expand="lg"
        className="d-flex w-100"
        style={{
          position: "fixed",
          borderBottomLeftRadius: "7px",
          borderBottomRightRadius: "7px",
          zIndex: "2",
          backgroundColor: "ligthcoral",
        }}
      >
        <Navbar.Brand href="#" style={{ margin: "auto 1vw", ...iconStyle }}>
          <Forum />
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Social
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className=" m-2 w-100"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Form className="d-flex w-50" style={{ marginLeft: "15vw" }}>
              <FormControl
                type="search"
                placeholder="Search for friends or posts"
                aria-label="Search"
                style={{ borderRadius: "20px" }}
              />
              <Button
                variant="outline-light"
                style={{ border: "none", borderRadius: "100%" }}
              >
                <Search />
              </Button>
            </Form>
          </Nav>
        </Navbar.Collapse>

        <Button variant="success" onClick={handleLogout}>
          <ExitToApp style={{ fontSize: "4vh ", ...iconStyle }} />
        </Button>
        <Navbar.Brand href={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture !== ""
                ? user.profilePicture
                : sourcePath + "person/default.png"
            }
            className="d-inline-block align-top"
            style={{
              border: "2px solid white",
              marginLeft: "3vw",

              width: "40px",
              height: "40px",
              borderRadius: "20%",

              objectFit: "cover",
            }}
            alt="User logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          vaiant="primary"
          aria-controls="navbarScroll"
          className="m-1"
        />
      </Navbar>
    </React.Fragment>
  );
}
