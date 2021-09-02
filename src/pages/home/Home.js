import React, { useState, useEffect } from "react";
import axios from "axios";

import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const { currentUser } = useAuth();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const resp = await axios.get(`/user?username=${currentUser.displayName}`);
      setUser(resp["data"]);
    };

    fetchUser();
  }, [currentUser]);

  return (
    <React.Fragment>
      <Topbar />
      <div className="d-flex" style={{ paddingTop: "68px" }}>
        <Feed flag={0} user={user} showShare={1} />
        <Rightbar user={user} />
      </div>
    </React.Fragment>
  );
}
