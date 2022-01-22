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
import { Formik } from "formik";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnSubmit = () => {
    if (email != "" && password != "") {
      signIn(email, password);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Sign In</Text>
      {/* Email*/}
      <FormInput
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
