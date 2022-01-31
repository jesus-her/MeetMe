import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Alert,
  Button,
  ToastAndroid,
  KeyboardAvoidingView,
} from "react-native";
import FormButton from "../components/shared/FormButton";
import FormInput from "../components/shared/FormInput";
import { COLORS, FONTS } from "../constants";
import { signUp } from "../utils/auth";
import { firestore } from "../../firebase";

const SignUpScreen = ({ navigation }) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

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

  //Conditions an error messages
  const isValidForm = () => {
    //Only if all of the fields have value
    if (
      displayName == "" &&
      email == "" &&
      password == "" &&
      confirmPassword == ""
    )
      return updateError("Required all fields!", setError);
    //If title have 3 or more characters
    if (!displayName.trim() || displayName.length < 3)
      return updateError("Invalid name", setError);
    //Validating email
    if (!isValidEmail(email))
      return updateError("Invalid email address", setError);
    //
    if (!password.trim() || password.length < 8)
      return updateError("Password must have at least 8 characters", setError);
    if (password !== confirmPassword)
      return updateError("Password does not match!", setError);
    return true;
  };

  const handleOnSubmit = () => {
    if (isValidForm()) {
      signUp(email, password, displayName);
    }
  };

  /*const handleOnSubmit = () => {
    if (isValidForm()) {
      signUp(email, password, displayName);
      /!*if (
        email != "" &&
        password != "" &&
        confirmPassword != "" &&
        displayName != ""
      ) {
        //   SignUp
        signUp(email, password, displayName);
      } else {
        Alert.alert("Error please try again");
      }*!/
    }
  };*/

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 20,
      }}
    >
      {/* Header */}
      <Text
        style={{
          fontSize: 24,
          color: COLORS.black,
          fontWeight: "bold",
          marginVertical: 32,
        }}
      >
        Sign Up
      </Text>

      {/* Username */}
      {error ? (
        <Text style={{ color: "red", ...FONTS.h4, textAlign: "center" }}>
          {error}
        </Text>
      ) : null}
      <FormInput
        labelText="Username"
        placeholderText="Username or Nickname"
        onChangeText={(value) => setDisplayName(value)}
        /*value={displayName}*/
      />
      {/*<Button title="save username" onPress={() => saveNewUser()} />*/}

      {/* Email */}
      <FormInput
        autoCapitalize="none"
        labelText="Email"
        placeholderText="Enter your email"
        onChangeText={(value) => setEmail(value)}
        value={email}
        keyboardType={"email-address"}
      />

      {/* Password */}
      <FormInput
        labelText="Password"
        placeholderText="Enter your password"
        onChangeText={(value) => setPassword(value)}
        value={password}
        secureTextEntry={true}
      />

      {/* Confirm Password */}
      <FormInput
        labelText="Confirm Password"
        placeholderText="Confirm your password"
        onChangeText={(value) => setConfirmPassword(value)}
        value={confirmPassword}
        secureTextEntry={true}
      />

      {/* Submit button */}
      <FormButton
        labelText="Sign up"
        handleOnPress={handleOnSubmit}
        style={{ width: "100%" }}
      />

      {/* Footer */}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
      >
        <Text>Already have an account?</Text>
        <Text
          style={{ marginLeft: 4, color: COLORS.primary }}
          onPress={() => navigation.navigate("SignInScreen")}
        >
          Sign in
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
