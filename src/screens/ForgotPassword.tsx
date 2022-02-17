import React, { useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import FormInput from "../components/shared/FormInput";
import FormButton from "../components/shared/FormButton";
import { passwordReset, signIn } from "../utils/auth";
import { IconButton } from "../components/ProfileScreen";
import AppLoader from "../components/AppLoader";
import EmailSent from "../components/EmailSent";
import { auth } from "../../firebase";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [error, setError] = useState("");
  const [isEmailLoading, setIsEmailLoading] = useState(false);

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
    if (email == "" && confirmEmail == "")
      return updateError("Required all fields!", setError);
    //Validating email
    if (!isValidEmail(email))
      return updateError("Invalid email address", setError);
    //Match emails
    if (email !== confirmEmail)
      return updateError("Emails does not match!", setError);
    return true;
  };

  /*handlePasswordReset = async (value, actions) => {
        const { email } = values

        try {
            await this.props.firebase.passwordReset(email)
            console.log('Password reset email sent successfully')
            this.props.navigation.navigate('Login')
        } catch (error) {
            actions.setFieldError('general', error.message)
        }
    }*/

  const handlePasswordReset = () => {
    if (isValidForm()) {
      setIsEmailLoading(true);
      /*passwordReset(email, setIsEmailLoading, setError);*/
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          ToastAndroid.show(
            "Please check your email and reset your password!",
            ToastAndroid.LONG
          );
          setIsEmailLoading(false);
          navigation.goBack();
        })
        .catch((error) => {
          /*var errorCode = error.code;
              var errorMessage = error.message;*/
          console.log(error.message);
          setIsEmailLoading(false);
          setError("There is no user register with this email");
          // ..
        });
      /*navigation.navigate("SignInScreen");*/
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          {/*Header*/}
          {/* <IconButton
            icon={icons.back}
            iconStyle={{
              tintColor: COLORS.black,
            }}
            containerStyle={{ alignSelf: "flex-start" }}
            onPress={() => navigation.goBack()}
          />*/}

          <Text style={styles.header}>Forgot Password?</Text>
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
          {/*Confirm email*/}
          <FormInput
            autoCapitalize="none"
            labelText="Confirm Email"
            placeholderText="Confirm your email address"
            onChangeText={(value) => setConfirmEmail(value)}
            value={confirmEmail}
            keyboardType={"email-address"}
          />

          {/* Submit button*/}
          <FormButton
            labelText="Send Email"
            handleOnPress={handlePasswordReset}
            style={{ width: "100%" }}
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
      {isEmailLoading ? <EmailSent /> : null}
    </>
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

export default ForgotPassword;
