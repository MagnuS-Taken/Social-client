import React, { useRef, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { CircularProgress } from "@material-ui/core";

import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState();
  const [showLoading, setShowLoading] = useState(false);

  const history = useHistory();

  const { login } = useAuth();

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

    setError("");
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Invalid e-mail or Password");
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
            <h2 className="text-center mb-4">Sign In</h2>
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
              <Form.Group id="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  minLength="6"
                  ref={passwordRef}
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
                  "Sign In"
                )}
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password ?</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Dont't have an account ? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </Container>
  );
}
