import { COLORS, FONTS, SIZES } from "../../constants";
import {
  Alert,
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

const ModalEditPassword = ({ modalVisible, setModalVisible, title }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
  const handleOnChangePassword = () => {
    if (newPassword === confirmPassword) {
      this.reauthenticate(currentPassword)
        .then(() => {
          var user = auth.currentUser;
          user
            .updatePassword(newPassword)
            .then(() => {
              ToastAndroid.show("New password saved!", ToastAndroid.LONG);
              setCurrentPassword("");
              setNewPassword("");
              setConfirmPassword("");
              setModalVisible(false);
            })
            .catch((error) => {
              Alert.alert(error.message);
            });
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    } else {
      Alert.alert("Passwords did not match");
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
      style={{ backgroundColor: "red", height: SIZES.height / 2 }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Ionicons
              name="close"
              size={30}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
            <Text style={{ ...FONTS.h2 }}>Edit {title}</Text>
            <Ionicons
              name="checkmark-circle"
              size={35}
              color={COLORS.secondary}
              onPress={handleOnChangePassword}
            />
          </View>
          <View style={styles.textInputContainer}>
            <View
              style={{
                width: "100%",
                alignItems: "center",
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
                labelText="New Password"
                placeholderText="Enter your new password"
                secureTextEntry={true}
                value={newPassword}
                onChangeText={(value) => setNewPassword(value)}
              />
              {/* Confirm a new (password, email, etc)*/}
              <FormInput
                labelText="Confirm New Password"
                placeholderText="Confirm your new password"
                onChangeText={(value) => setConfirmPassword(value)}
                value={confirmPassword}
                secureTextEntry={true}
              />

              {/*SET BUTTON*/}
              {/*<FormButton
                onPress={handleOnChangePassword}
                labelText="Set New Password"
                style={{ width: "100%" }}
              />*/}
            </View>
          </View>
        </View>
      </View>
    </Modal>
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

export default ModalEditPassword;
