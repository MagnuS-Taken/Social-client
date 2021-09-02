import React, { useState, useRef } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import randomBytes from "randombytes";

import { storage } from "../../firebase";

export default function Edit({ title, closeEdit, user }) {
  const [showLoading, setShowLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [cover, setCover] = useState(null);
  const desc = useRef();
  const city = useRef();
  const from = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowLoading(true);
    let pURL, cURL;
    if (profile !== null) {
      pURL = await handleUpload(profile, "profile");
    }

    if (cover !== null) {
      cURL = await handleUpload(cover, "cover");
    }

    await axios.put("/user/" + user._id, {
      userId: user._id,
      desc: desc.current.value,
      city: city.current.value,
      from: from.current.value,
      profilePicture: pURL,
      coverPicture: cURL,
    });
    setShowLoading(false);
    closeEdit();
    window.location.reload();
  };

  const handleUpload = async (image, type) => {
    try {
      const storageRef = storage.ref();
      // Create the file metadata
      const metadata = {
        contentType: "image/" + image.name.split(".")[1],
      };

      const fileRef = storageRef.child(
        `${type}/` + randomBytes(8).toString("hex")
      );
      const uploadTaskSnapshot = await fileRef.put(image, metadata);

      return await uploadTaskSnapshot.ref.getDownloadURL();
    } catch (e) {
      console.log("ERR ===", e);
      alert("Image uploading failed!");
    }
  };

  return (
    <React.Fragment>
      <Modal.Header
        closeButton
        style={{ backgroundColor: "lightblue", color: "black" }}
      >
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Username
            </Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly defaultValue={user.username} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              About you
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="About you" ref={desc} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Row>
              <Col>
                <Form.Control placeholder="City" ref={city} />
              </Col>
              <Col>
                <Form.Control placeholder="Country" ref={from} />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Profile Picture
            </Form.Label>
            <Col sm="10">
              <input
                type="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setProfile(e.target.files[0])}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Cover Picture
            </Form.Label>
            <Col sm="10">
              <input
                type="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setCover(e.target.files[0])}
              />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={submitHandler}>
          {showLoading ? (
            <CircularProgress color="secondary" size="15px" />
          ) : (
            "Save changes"
          )}
        </Button>
      </Modal.Footer>
    </React.Fragment>
  );
}
