import { COLORS, FONTS, SIZES } from "../../constants";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import FormInput from "../shared/FormInput";
import FormButton from "../shared/FormButton";
import { auth } from "../../../firebase";
import * as firebase from "firebase";

const ModalEditEmail = ({ modalEmailVisible, setModalEmailVisible, title }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  //Reauthenticate
  reauthenticate = (currentPassword) => {
    var user = auth.currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };

  //Set a new password
  const handleOnChangeEmail = () => {
    if (newEmail === confirmEmail) {
      this.reauthenticate(currentPassword)
        .then(() => {
          var user = auth.currentUser;
          user
            .updateEmail(newEmail)
            .then(() => {
              ToastAndroid.show("New email address saved!", ToastAndroid.LONG);
              setCurrentPassword("");
              setNewEmail("");
              setConfirmEmail("");
              setModalEmailVisible(false);
            })
            .catch((error) => {
              Alert.alert(error.message);
            });
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    } else {
      Alert.alert("Email address did not match");
    }
  };

  return (
    <KeyboardAvoidingView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalEmailVisible}
        onRequestClose={() => {
          setModalEmailVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Ionicons
                name="close"
                size={35}
                onPress={() => {
                  setModalEmailVisible(!modalEmailVisible);
                }}
              />
              <Text style={{ ...FONTS.h2 }}>Edit {title}</Text>
              <Ionicons
                name="checkmark-circle"
                size={35}
                color={COLORS.secondary}
                onPress={handleOnChangeEmail}
              />
            </View>
            <View style={styles.textInputContainer}>
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.white,
                  elevation: 3,
                  borderRadius: SIZES.radius,
                  padding: SIZES.radius,
                }}
              >
                {/*Authentication Password */}
                <FormInput
                  autoCapitalize="none"
                  labelText="Current Password"
                  placeholderText="Enter your current password"
                  secureTextEntry={true}
                  value={currentPassword}
                  onChangeText={(value) => setCurrentPassword(value)}
                />
                {/*Enter a new (password, email, etc)*/}
                <FormInput
                  autoCapitalize="none"
                  labelText="New Email"
                  placeholderText="Enter your new email address"
                  secureTextEntry={false}
                  value={newEmail}
                  onChangeText={(value) => setNewEmail(value)}
                />
                {/* Confirm a new (password, email, etc)*/}
                <FormInput
                  autoCapitalize="none"
                  labelText="Confirm New Email"
                  placeholderText="Confirm your new email address"
                  onChangeText={(value) => setConfirmEmail(value)}
                  value={confirmEmail}
                  secureTextEntry={false}
                />

                {/*SET BUTTON*/}
                {/*<FormButton
                onPress={handleOnChangeEmail}
                labelText="Set New Email"
                style={{ width: "100%" }}
              />*/}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: COLORS.black + "70",
    height: SIZES.height,
    width: SIZES.width,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 0,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    elevation: 5,
    width: "95%",
  },
  modalHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  textInputContainer: {
    marginVertical: SIZES.padding,
    width: "100%",

    alignItems: "center",
    justifyContent: "center",
  },
});

export default ModalEditEmail;
