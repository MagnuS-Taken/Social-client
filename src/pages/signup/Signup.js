import React, { useRef, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { CircularProgress } from "@material-ui/core";

import { useAuth } from "../../context/AuthContext";

export default function Signup() {
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState();
  const [showLoading, setShowLoading] = useState(false);

  const history = useHistory();

  const { signup } = useAuth();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoading(true);

    if (
      emailRef.current.value.length === 0 ||
      passwordRef.current.value.length === 0
    ) {
      return setError(`Fields cannot be empty`);
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    setError("");
    setLoading(true);
    try {
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        usernameRef.current.value
      );
      history.push("/");
    } catch (e) {
      setError(e.message);
    }
    setShowLoading(false);
    setLoading(false);
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
      }}
    >
      <div className="w-100" style={{ maxWidth: "50vw" }}>
        <h3 style={{ fontSize: "50px", fontWeight: "800", color: "green" }}>
          SOCIAL
        </h3>
        <span style={{ fontSize: "24px" }}>
          Connect with friends and the world around.
        </span>
      </div>

      <div className="w-100" style={{ maxWidth: "50vw" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  ref={emailRef}
                  required
                />
              </Form.Group>
              <Form.Group id="username" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Create your username"
                  ref={usernameRef}
                  required
                />
              </Form.Group>
              <Form.Group id="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  ref={passwordRef}
                  required
                />
              </Form.Group>
              <Form.Group id="password-confirm" className="mb-3">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm your password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>
              <Button
                disabled={loading}
                variant="success"
                className="w-100 "
                type="submit"
              >
                {showLoading ? (
                  <CircularProgress color="secondary" size="15px" />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account ? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </Container>
  );
}
