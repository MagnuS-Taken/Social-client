import React from "react";
import { RssFeed, Chat, People } from "@material-ui/icons";
import { Nav } from "react-bootstrap";

import "./sidebar.css";
import { Users } from "../../dummyData";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link eventKey="link-1" style={{ color: "black" }}>
          <RssFeed style={{ marginRight: "0.5vw" }} />
          Feed
        </Nav.Link>
        <Nav.Link eventKey="link-1" style={{ color: "black" }}>
          <Chat style={{ marginRight: "0.5vw" }} />
          Chat
        </Nav.Link>
        <Nav.Link eventKey="link-2" style={{ color: "black" }}>
          <People style={{ marginRight: "0.5vw" }} />
          Groups
        </Nav.Link>
        <hr />
      </Nav>

      <Nav
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        className="flex-column"
        style={{
          width: "100",
          padding: "0",
          margin: "0",
          listStyle: "none",
        }}
      >
        <h4>Online Friends</h4>
        {Users.map((u) => {
          return <Online key={u.id} user={u} />;
        })}
      </Nav>
    </div>
  );
}

function Online({ user }) {
  return (
    <div>
      <Nav.Link eventKey="link-1" className="d-flex">
        <img
          src={PF + user.profilePicture}
          alt=""
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFill: "cover",
            marginRight: "10px",
          }}
        />
        <span
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: "limegreen",
            position: "absolute",
            left: "65px",
            border: "2px solid white",
          }}
        ></span>
        <span
          style={{
            marginTop: "1vh",
          }}
        >
          {user.username}
        </span>
      </Nav.Link>
    </div>
  );
}
