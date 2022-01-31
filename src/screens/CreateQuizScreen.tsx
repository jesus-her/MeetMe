import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  Image,
  Alert,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  StatusBar,
  Button,
} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import FormButton from "../components/shared/FormButton";
import FormInput from "../components/shared/FormInput";
import { createQuestion, createQuiz } from "../utils/database";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebase";
import { firestore } from "../../firebase";
import { LinearGradient } from "expo-linear-gradient";
import HeaderSection from "../components/shared/HeaderSection";
import { err } from "react-native-svg/lib/typescript/xml";
import { auth } from "../../firebase";
import images from "../constants/images";

const CreateQuizScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [post, setPost] = useState(null);
  const [transferred, setTransferred] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [quizImg, setQuizImg] = useState("");
  const [error, setError] = useState("");
  const owner = auth.currentUser.displayName;

  //Validate Create QUIZ
  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(() => {
      stateUpdater("");
    }, 4500);
  };
  //Conditions an error messages
  const isValidQuiz = () => {
    //Only if all of the fields have value
    if (title == "") return updateError("Required a title field!", setError);
    //If title have 3 or more characters
    if (!title.trim() || title.length < 3)
      return updateError("Title must have at least 3 characters", setError);
    return true;
  };

  const handleQuizSave = async () => {
    if (isValidQuiz()) {
      const currentQuizId = Math.floor(
        100000 + Math.random() * 9000
      ).toString();
      await createQuiz(currentQuizId, title, quizImg, owner);

      // Navigate to Add Question string
      navigation.navigate("MyQuizScreen", {
        currentQuizId: currentQuizId,
        currentQuizTitle: title,
        currentQuizImage: quizImg,
        quizOwner: owner,
        currentImageUri: imageUri,
        setCurrentQuizImage: setQuizImg,
      });

      ToastAndroid.show("Quiz Saved", ToastAndroid.SHORT);
      // Reset
      setTitle("");
      setImageUri("");
    }
  };
  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });
    console.log(result);
    if (!result.cancelled) {
      this.uploadImage(result.uri)
        .then(() => {
          console.log("Image Uploaded");
        })
        .catch((error) => {
          Alert.alert(error);
        });
      setImageUri(result.uri);
    }
  };

  //Upload Image to Firebase
  uploadImage = async (uri) => {
    const currentQuizId = Math.floor(100000 + Math.random() * 9000).toString();
    const response = await fetch(uri);
    const blob = await response.blob();

    try {
      var ref = storage.ref(`/images/quizzes/${currentQuizId}`);
      await ref
        .put(blob)
        .then((snapshot) => {
          return snapshot.ref.getDownloadURL();
        })
        .then((downloadURL) => {
          console.log("you image:" + downloadURL);
          setQuizImg(downloadURL);
          setImageUrl(downloadURL);
          return downloadURL;
        });

      return null;
    } catch (error) {
      return null;
    }
  };

  function renderQuizCardPreview() {
    return (
      <>
        <LinearGradient
          colors={[COLORS.primary, COLORS.primary2]}
          start={{ x: 0.1, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={{
            flexDirection: "row",
            paddingVertical: 20,
            paddingTop: 30,
            borderRadius: SIZES.radius,
            paddingHorizontal: SIZES.radius,
            margin: SIZES.padding,
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.white,
              textAlign: "center",
              position: "absolute",
              top: 5,
              left: 0,
              right: 0,
              alignSelf: "center",
            }}
          >
            *Quiz Card Preview
          </Text>
          {/*Profile Image*/}
          <View
            style={{
              width: 90,
              height: 90,
            }}
          >
            <Image
              source={require("../../assets/icons/laughing.png")}
              resizeMode="cover"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 45,
                borderWidth: 2,
                borderColor: COLORS.black,
                tintColor: COLORS.white,
                alignSelf: "center",
              }}
            />
          </View>
          {/* Details */}
          <View
            style={{
              flex: 1,
              marginLeft: SIZES.radius,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.primary,
                textAlign: "left",
                backgroundColor: COLORS.white,
                borderRadius: SIZES.radius,
                paddingHorizontal: SIZES.base,
              }}
            >
              "Your title" Quiz
            </Text>
            <View
              style={{
                width: "100%",
                height: 6,
                backgroundColor: COLORS.primary,
                marginTop: SIZES.padding / 2,
              }}
            />
            <View
              style={{
                width: "80%",
                height: 5,
                backgroundColor: COLORS.primary,
                marginTop: SIZES.base,
              }}
            />
          </View>
        </LinearGradient>
      </>
    );
  }

  return (
    <>
      <HeaderSection
        title="Create your Quiz"
        onPress={() => navigation.openDrawer()}
        icon={images.drawer}
      />

      <ScrollView
        style={{
          backgroundColor: COLORS.white,
          height: SIZES.heightPlayScreen,
        }}
      >
        {/*Render Header*/}
        {/*{renderHeader()}*/}

        {/*Render Quiz Card Preview*/}
        {renderQuizCardPreview()}
        <View
          style={{
            width: SIZES.width - SIZES.padding * 2,
            backgroundColor: COLORS.white,
            elevation: 5,
            borderRadius: SIZES.radius,
            padding: SIZES.radius,
            alignSelf: "center",
          }}
        >
          {error ? (
            <Text style={{ color: "red", ...FONTS.h4, textAlign: "center" }}>
              {error}
            </Text>
          ) : null}
          <FormInput
            labelText="Title"
            placeholderText="Enter Quiz Title"
            onChangeText={(val) => setTitle(val)}
            value={title}
          />
          {/* Image upload */}
          <Text style={{ ...FONTS.h3, color: COLORS.primary }}>
            Image (Optional)
          </Text>

          {imageUri == "" ? (
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 28,
                backgroundColor: COLORS.primary + "20",
                width: 150,
                height: 150,
                alignSelf: "center",
                borderRadius: 100,
                marginVertical: SIZES.padding,
              }}
              onPress={selectImage}
            >
              <Text style={{ opacity: 0.5, color: COLORS.primary }}>
                + add image
              </Text>
            </TouchableOpacity>
          ) : (
            <Image
              source={{
                uri: imageUri,
              }}
              resizeMode={"cover"}
              style={{
                width: 150,
                height: 150,
                alignSelf: "center",
                borderRadius: 100,
                marginVertical: SIZES.padding,
              }}
            />
          )}
        </View>
        {/*Save Quiz*/}
        <View style={{ margin: SIZES.padding }}>
          <FormButton
            labelText="Save Quiz"
            handleOnPress={handleQuizSave}
            style={{ marginTop: SIZES.padding }}
          />
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    height: SIZES.height,
  },
});

export default CreateQuizScreen;
