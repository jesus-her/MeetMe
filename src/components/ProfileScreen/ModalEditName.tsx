import { COLORS, FONTS, SIZES } from "../../constants";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import FormInput from "../shared/FormInput";
import FormButton from "../shared/FormButton";
import { auth } from "../../../firebase";
import * as firebase from "firebase";

const ModalEditName = ({ modalNameVisible, setModalNameVisible, title }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newName, setNewName] = useState("");
  //Reauthenticate
  /* reauthenticate = (currentPassword) => {
    var user = auth.currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };*/

  //Set a new password
  const handleOnChangeName = () => {
    var user = auth.currentUser;
    user
      .updateProfile({ displayName: newName })
      .then(() => {
        ToastAndroid.show("New name saved!", ToastAndroid.LONG);
        setNewName("");
        setModalNameVisible(false);
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
    /*  this.reauthenticate(currentPassword).then(() => {
      var user = auth.currentUser;
      user
        .updateProfile({ displayName: newName })
        .then(() => {
          ToastAndroid.show("New name saved!", ToastAndroid.LONG);
          setCurrentPassword("");
          setNewName("");
          setModalNameVisible(false);
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    });*/
  };
  const user = auth.currentUser;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalNameVisible}
      onRequestClose={() => {
        setModalNameVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Ionicons
              name="close"
              size={35}
              onPress={() => {
                setModalNameVisible(!modalNameVisible);
              }}
            />
            <Text style={{ ...FONTS.h2 }}>Edit {title}</Text>
            <Ionicons
              name="checkmark-circle"
              size={35}
              color={COLORS.secondary}
              onPress={handleOnChangeName}
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
              {/* <FormInput
                autoCapitalize="none"
                labelText="Current Password"
                placeholderText="Enter your current password"
                secureTextEntry={true}
                value={currentPassword}
                onChangeText={(value) => setCurrentPassword(value)}
              />*/}
              {/*Enter a new (password, email, etc)*/}
              <FormInput
                labelText="Name"
                placeholderText={user.displayName}
                secureTextEntry={false}
                value={newName}
                onChangeText={(value) => setNewName(value)}
              />

              {/*SET BUTTON*/}
              {/*<FormButton
                onPress={handleOnChangeName}
                labelText="Set New Name"
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

export default ModalEditName;
