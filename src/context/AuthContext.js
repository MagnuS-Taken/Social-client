import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import axios from "axios";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const sourcePath = process.env.REACT_APP_PUBLIC_FOLDER;

  const dataFromDB = async (user, email) => {
    const resp = await axios.get("/user?email=" + email);
    const data = resp["data"];
    // console.log(data);

    auth.currentUser
      .updateProfile({
        displayName: data.username,
      })
      .then(() => {})
      .catch((e) => {});
  };

  const updateUserData = (user) => {
    dataFromDB(user, user.email);
  };

  const signup = async (email, password, username) => {
    try {
      await axios.post("/auth/register", {
        username: username,
        email: email,
      });
    } catch (e) {
      return new Error("DB ERROR");
    }
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = async (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const updateEmail = (newEmail) => {
    return auth.currentUser.updateEmail(newEmail);
  };

  const updatePassword = (newPassword) => {
    return auth.currentUser.updatePassword(newPassword);
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        updateUserData(user);
        setCurrentUser(user);
      }
      setLoading(false);
    });

    return unsub;
  }, []);

  const ret = {
    currentUser,
    sourcePath,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={ret}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
