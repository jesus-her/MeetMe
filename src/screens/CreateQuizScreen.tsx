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
  ImageBackground,
} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import FormButton from "../components/shared/FormButton";
import FormInput from "../components/shared/FormInput";
import { createQuiz } from "../utils/database";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebase";

import { LinearGradient } from "expo-linear-gradient";
import HeaderSection from "../components/shared/HeaderSection";

import { auth } from "../../firebase";
import images from "../constants/images";
import AudioRecorder from "./AudioRecorder";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import AppLoader from "../components/AppLoader";
import QuizLoader from "../components/QuizLoader";
import IconLabel from "../components/IconLabel";
const CreateQuizScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [post, setPost] = useState(null);
  const [transferred, setTransferred] = useState(0);
  /*const [uploading, setUploading] = useState(false);*/
  const [isFavorite, setIsFavorite] = useState(false);
  const [quizImg, setQuizImg] = useState("");
  const [error, setError] = useState("");
  const [attemptCounter, setAttemptCounter] = useState(0);
  /*const currentAudioId = Math.floor(100000 + Math.random() * 9000).toString();*/
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [keyTimer, setKeyTimer] = useState(0);
  const [audioUpload, setAudioUpload] = useState(false);
  const owner = auth.currentUser.displayName;
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [currentAudioId, setCurrentAudioId] = useState("");
  const [ownerPhotoURL, setOwnerPhotoURL] = useState(auth.currentUser.photoURL);
  const userId = auth.currentUser.uid;
  const user = auth.currentUser;

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
    //If title have 3 or more characters
    if (!title.trim() || title.length > 21)
      return updateError("Title is too long!", setError);
    if (sound != null && audioUpload == false) {
      return updateError("Save your current audio recorder first!", setError);
    }
    return true;
  };

  const handleQuizSave = async () => {
    if (isValidQuiz()) {
      setIsLoading(true);
      /*setOwnerPhotoURL(user.photoURL);*/

      const currentQuizId = Math.floor(
        100000 + Math.random() * 9000
      ).toString();
      /* if (recording != null) {
        await uploadAudio();
      } else {
        () => {};
      }*/

      await createQuiz(
        currentQuizId,
        title,
        quizImg,
        owner,
        userId,
        attemptCounter,
        isFavorite,
        sound,
        currentAudioId,
        ownerPhotoURL
      );

      // Navigate to Add Question string
      navigation.navigate("MyQuizScreen", {
        currentQuizId: currentQuizId,
        currentQuizTitle: title,
        currentQuizImage: quizImg,
        quizOwner: owner,
        currentImageUri: imageUri,
        setCurrentQuizImage: setQuizImg,
        sound: sound,
        currentAudioId: currentAudioId,
      });

      ToastAndroid.show("Quiz Saved", ToastAndroid.SHORT);
      // Reset
      setTitle("");
      setImageUri("");
      setSound(null);
      setRecording(null);
      setKeyTimer((prevKey) => prevKey + 1);
      setAudioUpload(false);
      setCurrentAudioId("");
      setIsLoading(false);
      /*setIsRecording(false);*/
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
      setIsImageLoading(true);
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
          setIsImageLoading(false);
          return downloadURL;
        });

      return null;
    } catch (error) {
      return null;
    }
  };

  /*//Stop recording
  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      setIsRecording(false);
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }
    const info = await FileSystem.getInfoAsync(recording.getURI());
    console.log(`FILE INFO: ${JSON.stringify(info)}`);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,

      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    const { sound: _sound, status } = await recording.createNewLoadedSoundAsync(
      {
        isLooping: true,
        isMuted: false,
        volume: 1.0,
        rate: 1.0,
        shouldCorrectPitch: true,
      }
    );
    setSound(_sound);
    setCurrentAudioId(Math.floor(100000 + Math.random() * 9000).toString());
    /!*console.log(_sound);*!/
    setIsRecording(false);
  };*/

  //Upload audio
  /*const uploadAudio = async () => {
    const uri = recording.getURI();
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          try {
            resolve(xhr.response);
          } catch (error) {
            console.log("error:", error);
          }
        };
        xhr.onerror = (e) => {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
      if (blob != null) {
        const uriParts = uri.split(".");
        const fileType = uriParts[uriParts.length - 1];
        storage
          .ref()
          .child(`/audio/quizzes/${currentAudioId}.${fileType}`)
          .put(blob, {
            contentType: `audio/${fileType}`,
          })
          .then(() => {
            console.log("Sent!");
            this.downloadAudio(uri);
            /!*ToastAndroid.show("Audio saved!", ToastAndroid.SHORT);*!/
          })
          .catch((e) => console.log("error:", e));
      } else {
        console.log("erroor with blob");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  downloadAudio = async () => {
    const uri = await storage
      .ref(`/audio/quizzes/${currentAudioId}.m4a`)
      .getDownloadURL();

    console.log("uril:", uri);

    setSound(uri);
    /!*console.log(sound);*!/

    // The rest of this plays the audio
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync({ uri });
      /!* await soundObject.playAsync();*!/
    } catch (error) {
      console.log("error:", error);
    }
  };*/

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
          {/*Record An Audio*/}
          {/*   <Text style={{ ...FONTS.h3, color: COLORS.primary }}>
            Audio (Optional)
          </Text>*/}
          {/* <AudioRecorder
            currentAudioId={currentAudioId}
            recording={recording}
            setRecording={setRecording}
            sound={sound}
            setSound={setSound}
            stopRecording={stopRecording}
            isRecording={isRecording}
            setIsRecording={setIsRecording}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            keyTimer={keyTimer}
            setKeyTimer={setKeyTimer}
            audioUpload={audioUpload}
            setAudioUpload={setAudioUpload}
            setError={setError}
            updateError={updateError}
          />*/}

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
              <Text
                style={{ opacity: 0.5, color: COLORS.primary, ...FONTS.h3 }}
              >
                + add image
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                width: "100%",
              }}
            >
              <ImageBackground
                source={{
                  uri: imageUri,
                }}
                resizeMode={"cover"}
                imageStyle={{ borderRadius: 100 }}
                style={{
                  width: 150,
                  height: 150,
                  alignSelf: "center",
                  borderRadius: 100,
                  marginVertical: SIZES.padding,
                  position: "relative",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setImageUri("");
                  }}
                  style={{ position: "absolute", top: -5, right: -5 }}
                >
                  <IconLabel
                    icon={icons.remove}
                    iconStyle={{
                      width: 35,
                      height: 35,
                      tintColor: COLORS.secondary,
                    }}
                    labelStyle={{
                      marginLeft: 5,
                      color: COLORS.secondary,
                      ...FONTS.h4,
                    }}
                  />
                </TouchableOpacity>
              </ImageBackground>
            </View>
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
      {isImageLoading ? <QuizLoader /> : null}
      {isLoading ? <AppLoader /> : null}
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
