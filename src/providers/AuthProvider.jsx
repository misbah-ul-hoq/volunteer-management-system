import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase.config";
import api from "../axios/fetch";
const googleProvider = new GoogleAuthProvider();
export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userMongo, setUserMongo] = useState(null);

  const signUpWithEmailAndPassword = (email, passworrd) => {
    return createUserWithEmailAndPassword(auth, email, passworrd);
  };

  useEffect(() => {
    api.get(`/user?email=${user?.email}`).then((res) => {
      setUserMongo(res.data);
      setLoading(false);
    });
  }, [user?.email]);

  const logInWithEmailAndPassword = (email, passworrd) => {
    return signInWithEmailAndPassword(auth, email, passworrd);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  const updateUserProfile = (userInfo) => {
    return updateProfile(user, userInfo);
  };

  useEffect(() => {
    const unsubsribe = () => {
      onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });
    };
    return () => unsubsribe();
  }, []);

  const authInfo = {
    user,
    userMongo,
    setUser,
    loading,
    setLoading,
    signUpWithEmailAndPassword,
    logInWithEmailAndPassword,
    signInWithGoogle,
    signOutUser,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
