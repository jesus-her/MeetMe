import { COLORS, FONTS, SIZES } from "../../constants";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import FormInput from "../shared/FormInput";
import FormButton from "../shared/FormButton";
import { auth, firestore } from "../../../firebase";
import * as firebase from "firebase";
import { Clipboard } from "react-native";

const ModalFavoritesOptions = ({
  modalOptionsOpen,
  setModalOptionsOpen,
  currentQuizId,
  isRemoveFavoriteLoading,
  setIsRemoveFavoriteLoading,
}) => {
  const user = auth.currentUser;

  const removeFavoriteQuiz = () =>
    Alert.alert(
      "Remove favorite Quiz",
      "Are you sure to remove Quiz from your favorites?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            setModalOptionsOpen(false);
            setIsRemoveFavoriteLoading(true);
            firestore
              .collection("Quizzes")
              .doc(currentQuizId)
              .update({ isFavorite: false })
              .then(() => {
                setIsRemoveFavoriteLoading(false);
                ToastAndroid.show(
                  "Remove from your favorites!",
                  ToastAndroid.SHORT
                );
              })
              .catch((e) => {
                console.log("error", e);
                setIsRemoveFavoriteLoading(false);
              });
          },
        },
      ]
    );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalOptionsOpen}
      onRequestClose={() => {
        setModalOptionsOpen(false);
      }}
    >
      <View
        onStartShouldSetResponder={() => {
          setModalOptionsOpen(!modalOptionsOpen);
        }}
        /*onPress={() => {
                  setModalOptionsOpen(!modalOptionsOpen);
                }}*/
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Ionicons
              name="close"
              size={24}
              style={{ position: "absolute", right: 0 }}
              onPress={() => {
                setModalOptionsOpen(!modalOptionsOpen);
              }}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TouchableOpacity
              onPress={removeFavoriteQuiz}
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                alignSelf: "flex-start",
                width: "100%",
              }}
            >
              <MaterialCommunityIcons
                name="heart-remove"
                color={COLORS.black}
                size={30}
              />
              <Text
                style={{
                  ...FONTS.h3,
                  marginLeft: SIZES.padding,
                }}
              >
                Remove favorite Quiz
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(currentQuizId);
                ToastAndroid.show("Copied to clipboard!", ToastAndroid.SHORT);
                setModalOptionsOpen(false);
              }}
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                alignSelf: "flex-start",
                width: "100%",
              }}
            >
              <Ionicons name="copy" color={COLORS.black} size={24} />
              <Text
                style={{
                  ...FONTS.h3,
                  marginLeft: SIZES.padding,
                }}
              >
                Copy Quiz ID
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log("press")}
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                alignSelf: "flex-start",
              }}
            >
              <MaterialCommunityIcons
                name="share"
                color={COLORS.black}
                size={30}
              />
              <Text
                style={{
                  ...FONTS.h3,
                  marginLeft: SIZES.padding,
                }}
              >
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: "rgba(0,0,0,0.25)",
    height: SIZES.height,
    width: SIZES.width,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    margin: 0,
    backgroundColor: COLORS.white,
    borderTopRightRadius: SIZES.radius,
    borderTopLeftRadius: SIZES.radius,
    padding: SIZES.padding,
    elevation: 5,
    width: "100%",
    height: "30%",
  },
  modalHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  textInputContainer: {
    marginVertical: SIZES.padding,
    width: "100%",
    height: "100%",

    justifyContent: "space-around",
  },
});

export default ModalFavoritesOptions;
