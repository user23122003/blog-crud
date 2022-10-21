import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { auth, db } from "../firebase-app/firebaseconfig";
const AuthContexts = createContext();
function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState({});
  const value = { userInfo, setUserInfo };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = query(
          collection(db, "users"),
          where("email", "==", user.email)
        );
        onSnapshot(docRef, (snapshot) => {
          snapshot.forEach((doc) => {
            setUserInfo({
              ...user,
              ...doc.data(),
            });
          });
        });
      } else {
        setUserInfo(null);
      }
    });
  }, []);
  return (
    <AuthContexts.Provider value={value} {...props}></AuthContexts.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContexts);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within AuthProvider");
  return context;
}
export { AuthProvider, useAuth };
