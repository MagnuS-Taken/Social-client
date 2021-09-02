import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";

export default function ForgotPassword() {
  const emailRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);
    try {
      setMessage("");
      // await resetPassword(emailRef.current.value);
      setMessage("Check inbox for further instructions");
    } catch {
      setError(
        "Sorry, we were unable to find an email address that matched your search."
      );
    }
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
            <h2 className="text-center mb-4">Password Reset</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
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
              <Button
                variant="success"
                disabled={loading}
                className="w-100 "
                type="submit"
              >
                Click to reset password
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Link to="/login">Login</Link>
        </div>
      </div>
    </Container>
  );
}
