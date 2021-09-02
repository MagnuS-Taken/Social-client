import React, { useRef, useState } from "react";
import { Button, Card, ListGroup, Nav } from "react-bootstrap";
import { AddLocation, Label, Photo } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import randomBytes from "randombytes";

import { storage } from "../../firebase";
import { useAuth } from "../../context/AuthContext";

export default function Share({ user }) {
  const [image, setImage] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const desc = useRef();

  const { sourcePath } = useAuth();

  const handleUpload = async () => {
    try {
      const storageRef = storage.ref();
      // Create the file metadata
      const metadata = {
        contentType: "image/" + image.name.split(".")[1],
      };

      const fileRef = storageRef.child(
        `posts/` + randomBytes(8).toString("hex")
      );
      const uploadTaskSnapshot = await fileRef.put(image, metadata);

      return await uploadTaskSnapshot.ref.getDownloadURL();
    } catch (e) {
      console.log("ERR ===", e);
      alert("Image uploading failed!");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowLoading(true);
    if (desc.current.value === "") {
      setShowLoading(false);
      return;
    }

    let url;
    if (image !== null) {
      url = await handleUpload();
    }

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      img: url,
    };

    try {
      await axios.post("/post", newPost);
      setShowLoading(false);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
    desc.current.value = "";
    setImage(null);
  };

  return (
    <React.Fragment>
      <Card
        style={{
          width: "100",
          margin: "1.5vh 1.5vw",
          position: "sticky",
          border: "2px solid lightblue",
        }}
      >
        <ListGroup variant="flush">
          <ListGroup.Item>
            <img
              src={
                user.profilePicture !== ""
                  ? user.profilePicture
                  : sourcePath + "person/default.png"
              }
              className="d-inline-block align-top"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "20%",
                marginRight: "1vw",
                objectFit: "cover",
              }}
              alt="User logo"
            />
            <input
              type="text"
              ref={desc}
              placeholder={"What's in your mind " + user.username + "?"}
              style={{
                border: "none",
                width: "80%",
                height: "100%",
                outline: "none",
                lineHeight: "300%",
              }}
            />
          </ListGroup.Item>

          <ListGroup.Item
            className="d-flex justify-content-between"
            style={{ fontSize: "15px", fontWeight: "500" }}
          >
            <label
              htmlFor="file"
              style={{ color: "tomato", cursor: "pointer", marginTop: "1vh" }}
            >
              <Photo />
              <span>Photo/Video</span>
              <input
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                style={{ display: "none" }}
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>

            <Nav.Link
              href="/"
              eventKey="link-1"
              style={{
                color: "blue",
              }}
            >
              <Label />
              <span>Feed</span>
            </Nav.Link>
            <Nav.Link
              href="/"
              eventKey="link-1"
              style={{
                color: "red",
              }}
            >
              <AddLocation />
              <span>Location</span>
            </Nav.Link>
            <Button
              variant="success"
              style={{
                border: "none",
              }}
              onClick={submitHandler}
            >
              {showLoading ? (
                <CircularProgress color="secondary" size="15px" />
              ) : (
                "Share"
              )}
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </React.Fragment>
  );
}
