import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import FormInput from "../components/shared/FormInput";
import FormButton from "../components/shared/FormButton";
import { signIn } from "../utils/auth";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      signIn(email, password, updateError, error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
        secureTextEntry={true}
      />
      {/* Submit button*/}
      <FormButton
        labelText="Submit"
        handleOnPress={handleOnSubmit}
        style={{ width: "100%" }}
      />
      {/* Footer*/}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
      >
        <Text>Don't have an account?</Text>
        <TouchableOpacity>
          <Text
            style={{ marginLeft: 4, color: COLORS.primary, fontWeight: "900" }}
            onPress={() => navigation.navigate("SignUpScreen")}
          >
            Create account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
