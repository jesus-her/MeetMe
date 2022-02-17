import { PermissionsAndroid, ToastAndroid } from "react-native";
import { auth, updateProfile } from "../../firebase";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export const signIn = (email, password, setError, setIsLoading, error) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      setIsLoading(false);
      /* ToastAndroid.show("Logged in", ToastAndroid.SHORT);*/
      /*setIsLoading(false);*/
      const user = userCredentials.user;
      console.log(user.email);
      console.log(user.displayName);
    })
    .catch(
      function (err) {
        // console.log(test.message);
        setError("The password is invalid");
        setIsLoading(false);
        /*error = err.Error;*/
        /*console.log(err.Error);*/
        // console.log("hola", err[0]);
        /* alert(err);*/
        /*  console.log(err);*/
      }.bind(this)
    );
};

export const signUp = (
  email,
  password,
  displayName,
  setIsLoading,
  setError
) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      setIsLoading(false);
      /* ToastAndroid.show("Signed up", ToastAndroid.SHORT);*/
      auth.currentUser.updateProfile({ displayName: displayName }).then(() => {
        console.log("name:" + displayName);
        console.log(user);
      });
      const user = userCredentials.user;
      console.log("user email:" + user.email);
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
      setError("The email address is already in use by another account.");
    });
};
export const passwordReset = (email, setIsEmailLoading, setError) => {
  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      /*ToastAndroid.show(
        "Please check your email and reset your password!",
        ToastAndroid.LONG
      );*/
      setIsEmailLoading(false);
    })
    .catch((error) => {
      /*var errorCode = error.code;
        var errorMessage = error.message;*/
      console.log(error.message);
      setIsEmailLoading(false);
      setError("There is no user register with this email");
      // ..
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
