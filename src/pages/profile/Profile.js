import React, { useState, useEffect } from "react";
import { Card, ButtonGroup, Button, Modal } from "react-bootstrap";
import { useParams } from "react-router";
import axios from "axios";

import Topbar from "../../components/topbar/Topbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import Pop from "./Pop";
import Edit from "./Edit";

import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const [user, setUser] = useState({});
  const [self, setSelf] = useState({});
  const [showPop, setShowPop] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const closeEdit = () => setShowEdit(false);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const username = useParams().username;

  const { currentUser, sourcePath } = useAuth();

  const clickHandler = async (nature) => {
    if (nature === "follow") {
      try {
        const resp = await axios.put(`/user/${self._id}/follow`, {
          userId: user._id,
        });
        setMessage(resp["data"]);
      } catch (e) {
        setMessage("Already following !!");
      }
      setTitle("Follow");
      setShowPop(true);
    } else if (nature === "unfollow") {
      try {
        const resp = await axios.put(`/user/${self._id}/unfollow`, {
          userId: user._id,
        });
        setMessage(resp["data"]);
      } catch (e) {
        setMessage("Already not followed !!");
      }
      setTitle("Unfollow");
      setShowPop(true);
    } else {
      setMessage("scratch");
      setTitle("Edit");
      setShowEdit(true);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const resp = await axios.get(`/user?username=${username}`);
      setUser(resp["data"]);
    };
    fetchUser();

    const fetchSelf = async () => {
      const resp = await axios.get(`/user?username=${currentUser.displayName}`);
      setSelf(resp["data"]);
    };

    fetchSelf();
  }, [username, currentUser]);

  return (
    <React.Fragment>
      <Topbar />
      <div className="d-flex" style={{ paddingTop: "68px" }}>
        <div style={{ flex: "7" }}>
          <Card
            className="d-flex flex-column"
            style={{
              width: "100",
              margin: "2vh 1.5vw",
              position: "sticky",
              border: "2px solid red",
            }}
          >
            <Card.Img
              variant="top"
              src={
                user.coverPicture !== ""
                  ? user.coverPicture
                  : sourcePath + "default_bg.jpeg"
              }
              style={{ height: "50vh", width: "100%" }}
            />
            <img
              src={
                user.profilePicture !== ""
                  ? user.profilePicture
                  : sourcePath + "person/default.png"
              }
              className="d-inline-block align-top"
              style={{
                border: "3px solid white",
                width: "130px",
                height: "130px",
                borderRadius: "50%",
                objectFit: "cover",
                position: "relative",
                top: "-9vh",
                left: "2vw",
              }}
              alt="User logo"
            />
            <div className="d-flex">
              <div
                style={{
                  flex: "2",
                  margin: "0 1.5vw",
                  position: "relative",
                  top: "-7vh",
                  color: "black",
                }}
              >
                <Card.Title>{user.username}</Card.Title>
                <Card.Text>{user.desc}</Card.Text>
                <Card.Text style={{ color: "lightgrey" }}>
                  {user.city
                    ? `${user.city}, ${user.from}`
                    : "Location not provided"}
                </Card.Text>
              </div>

              {currentUser.displayName !== username ? (
                <div
                  style={{
                    flex: "2",
                    margin: "0 1.5vw",
                    position: "relative",
                    top: "-15vh",
                    color: "black",
                  }}
                >
                  <ButtonGroup
                    aria-label="Basic example"
                    style={{
                      marginLeft: "35vw",
                    }}
                  >
                    <Button
                      variant="success"
                      onClick={() => clickHandler("follow")}
                    >
                      Follow
                    </Button>
                    <Modal
                      show={showPop}
                      onHide={() => setShowPop(false)}
                      centered
                    >
                      <Pop title={title} message={message} />
                    </Modal>

                    <Button
                      variant="danger"
                      onClick={() => clickHandler("unfollow")}
                    >
                      Unfollow
                    </Button>
                    <Modal
                      show={showPop}
                      onHide={() => setShowPop(false)}
                      centered
                    >
                      <Pop title={title} message={message} />
                    </Modal>
                  </ButtonGroup>
                </div>
              ) : (
                <div
                  style={{
                    flex: "2",
                    margin: "0 1.5vw",
                    position: "relative",
                    top: "-15vh",
                    color: "black",
                  }}
                >
                  <ButtonGroup
                    aria-label="Basic example"
                    style={{
                      marginLeft: "38vw",
                    }}
                  >
                    <Button
                      variant="success"
                      onClick={() => clickHandler("edit")}
                    >
                      Edit Profile
                    </Button>
                    <Modal
                      size="lg"
                      show={showEdit}
                      onHide={() => setShowEdit(false)}
                    >
                      <Edit title={title} closeEdit={closeEdit} user={user} />
                    </Modal>
                  </ButtonGroup>
                </div>
              )}
            </div>
          </Card>

          <div style={{ display: "flex" }}>
            <Feed
              flag={1}
              user={user}
              showShare={currentUser.displayName === username ? 1 : 0}
            />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
