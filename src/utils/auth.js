import { ToastAndroid } from "react-native";
import { auth, updateProfile } from "../../firebase";
import { useEffect, useState } from "react";

export const signIn = (email, password, setError, error) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      ToastAndroid.show("Logged in", ToastAndroid.SHORT);
      const user = userCredentials.user;
      console.log(user.email);
      console.log(user.displayName);
    })
    .catch((err) => {
      // console.log(test.message);
      setError("The password is invalid");
      /*error = err.Error;*/
      /*console.log(err.Error);*/
      // console.log("hola", err[0]);
      /* alert(err);*/
      console.log(err);
    });
};

export const signUp = (email, password, displayName) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      ToastAndroid.show("Signed up", ToastAndroid.SHORT);
      auth.currentUser.updateProfile({ displayName: displayName }).then(() => {
        console.log("name:" + displayName);
        console.log(user);
      });
      const user = userCredentials.user;
      console.log("user email:" + user.email);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updatePhoto = (photoURL) => {
  auth.currentUser
    .updateProfile({ photoURL: photoURL })
    .then(() => {
      ToastAndroid.show("Photo updated!", ToastAndroid.SHORT);
      console.log("new profile photo:" + photoURL);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const signOut = () => {
  auth.signOut().then(() => {
    ToastAndroid.show("Signed Out", ToastAndroid.SHORT);
  });
};

/*//Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);
  return currentUser;
}*/
/*export const savePhoto = (photoURL) => {
  auth.currentUser
    .updateProfile({ photoURL: photoURL })
    .then(() => {
      ToastAndroid.show("Photo updated!", ToastAndroid.SHORT);
      console.log("new profile photo:" + photoURL);
    })
    .catch((err) => {
      console.log(err);
    });
};*/
