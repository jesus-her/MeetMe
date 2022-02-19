import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import FormInput from "../components/shared/FormInput";
import FormButton from "../components/shared/FormButton";
/*import { signIn } from "../utils/auth";*/
import AppLoader from "../components/AppLoader";
import { auth, authPure } from "../../firebase";
import IconLabel from "../components/IconLabel";
import * as Facebook from "expo-facebook";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [icon, setIcon] = useState("eye");
  const [hidePassword, setHidePassword] = useState(true);

  //Facebook Auth ID: 805370967103344
  //Clave secreta: 0a8562f89afb05c917778a2ad963ff94

  //Validate Create QUIZ
  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(() => {
      stateUpdater("");
    }, 4500);
  };

  //Validating email
  const isValidEmail = (value) => {
    const regx = /^([A-Za-z0-9_\-\.])+\@([[A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return regx.test(value);
  };

  //Conditions for Sign In
  const isValidForm = () => {
    //Only if all of the fields have value
    if (email == "" && password == "")
      return updateError("Required all fields!", setError);
    //Validating email
    if (!isValidEmail(email))
      return updateError("Invalid email address", setError);
    //
    if (password == "")
      return updateError("Required a password field!", setError);

    return true;
  };

  const handleOnSubmit = () => {
    if (isValidForm()) {
      setIsLoading(true);
      /*signIn(email, password, setError, error, setIsLoading);*/
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
            setError(
              "The password is invalid or there is no user register with this email"
            );
            setIsLoading(false);
            /*error = err.Error;*/
            /*console.log(err.Error);*/
            // console.log("hola", err[0]);
            /* alert(err);*/
            console.log(err);
          }.bind(this)
        );
    }
  };
  const _changeIcon = () => {
    icon !== "eye-off"
      ? (setIcon("eye-off"), setHidePassword(false))
      : (setIcon("eye"), setHidePassword(true));
  };

  const loginWithFacebook = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "805370967103344",
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile"],
        });
      if (type === "success") {
        const credential = authPure.FacebookAuthProvider.credential(token);

        auth.signInWithCredential(credential);

        // Get the user's name using Facebook's Graph API
        /* const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        console.log(await response.json());*/
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }

    /*try {
                await Facebook.initializeAsync({
                    appId: '<APP_ID>',
                });
                const {type, token, expirationDate, permissions, declinedPermissions} =
                    await Facebook.logInWithReadPermissionsAsync({
                        permissions: ['public_profile'],
                    });
                if (type == 'success') {

                    const credential = authPure.FacebookAuthProvider.credential(token)

                    auth.signInWithCredential(credential).catch((error) => {
                        console.log(error)
                    })
                }
            }*/
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={COLORS.primary}
          barStyle={"light-content"}
        />
        <Text style={styles.header}>Sign In</Text>
        {error ? (
          <Text style={{ color: "red", ...FONTS.h4, textAlign: "center" }}>
            {error}
          </Text>
        ) : null}
        {/* Email*/}
        <FormInput
          autoCapitalize="none"
          labelText="Email"
          placeholderText="Enter your email"
          onChangeText={(value) => setEmail(value)}
          value={email}
          keyboardType={"email-address"}
        />
        {/* Password*/}

        <FormInput
          labelText="Password"
          placeholderText="Enter your password"
          onChangeText={(value) => setPassword(value)}
          value={password}
          secureTextEntry={hidePassword}
          icon={icon}
          _changeIcon={_changeIcon}
        />

        {/*Forgot password*/}
        <TouchableOpacity
          style={{ width: "100%", marginBottom: SIZES.padding }}
        >
          <Text
            style={{
              marginLeft: 4,
              color: COLORS.primary,
              fontWeight: "bold",
              alignSelf: "flex-end",
            }}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            Forgot password?
          </Text>
        </TouchableOpacity>

        {/* Submit button*/}
        <FormButton
          labelText="Submit"
          handleOnPress={handleOnSubmit}
          style={{ width: "100%" }}
        />
        {/* Footer*/}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ ...FONTS.h4, fontWeight: "900" }}>
            Don't have an account?
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                marginLeft: 4,
                color: COLORS.primary,
                ...FONTS.h4,
              }}
              onPress={() => navigation.navigate("SignUpScreen")}
            >
              Create account
            </Text>
          </TouchableOpacity>
        </View>
        {/*Facebook Sign In*/}
        {/* <TouchableOpacity
          style={{ position: "absolute", bottom: SIZES.padding }}
          onPress={loginWithFacebook}
        >
          <Text
            style={{
              marginLeft: 4,
              color: COLORS.primary2,
              fontWeight: "900",
            }}
          >
            Or sign in with Facebook
          </Text>
          <FontAwesome5
            name="facebook"
            color={COLORS.primary2}
            size={35}
            style={{
              alignSelf: "center",
            }}
          />
        </TouchableOpacity>*/}
        {isLoading ? <AppLoader /> : null}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: SIZES.padding,
  },
  header: {
    ...FONTS.h1,
    marginVertical: 20,
  },
});

export default SignInScreen;
