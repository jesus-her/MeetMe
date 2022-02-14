import React, { useEffect, useState } from "react";
import {
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
  SafeAreaView,
  TouchableHighlight,
  PermissionsAndroid,
} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import FormButton from "../components/shared/FormButton";
import HeaderSection from "../components/shared/HeaderSection";
import images from "../constants/images";
import { Audio } from "expo-av";
import { storage } from "../../firebase";
import * as FileSystem from "expo-file-system";
import IconLabel from "../components/IconLabel";
import * as Icons from "../components/MoreIcons/Icons";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const AudioRecorder = ({
  recording,
  setRecording,
  currentAudioId,
  stopRecording,
  sound,
  setSound,
  isRecording,
  setIsRecording,
  isPlaying,
  setIsPlaying,
  keyTimer,
  setKeyTimer,
  audioUpload,
  setAudioUpload,
  setError,
  updateError,
}) => {
  // const [isRecording, setIsRecording] = useState(false);
  /*const [recording, setRecording] = useState(null);*/
  /*const [sound, setSound] = useState(null);*/
  /* const [isPlaying, setIsPlaying] = useState(false);*/

  /*  const generateOTP = async () => {
      setCounter(25);
      useEffect(() => {
        generateOTP();
      });
    };*/

  const recordingSettings = {
    android: {
      extension: ".m4a",
      outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
      audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
    ios: {
      extension: ".m4a",
      outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
      audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MIN,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
  };

  //Start recording

  const startRecording = async () => {
    console.log("Requesting permissions..");
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
    if (sound !== null) {
      // stop playback
      await sound.unloadAsync();
      sound.setOnPlaybackStatusUpdate(null);
      setSound(null);
    }

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });

    const _recording = new Audio.Recording();

    try {
      await _recording.prepareToRecordAsync(recordingSettings);
      setRecording(_recording);
      await _recording.startAsync();
      console.log("recording");
      setIsRecording(true);
    } catch (error) {
      console.log("error while recording:", error);
    }
  };

  /*//Stop recording
    const stopRecording = async () => {
      try {
        await recording.stopAndUnloadAsync();
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
      /!*console.log(_sound);*!/
      setIsRecording(false);
    };*/

  //Upload audio
  const uploadAudio = async () => {
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
            ToastAndroid.show("Audio saved!", ToastAndroid.SHORT);
            setAudioUpload(true);
            setSound(null);
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
    /*console.log(sound);*/

    // The rest of this plays the audio
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync({ uri });
      /* await soundObject.playAsync();*/
    } catch (error) {
      console.log("error:", error);
    }
  };
  /* //Download audio
    const downloadAudio = async () => {
      const uri = await storage
        .ref(`/audio/quizzes/${currentAudioId}.m4a`)
        .getDownloadURL();

      console.log("uril:", uri);

      // The rest of this plays the audio
      const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync({ uri });
        await soundObject.playAsync();
      } catch (error) {
        console.log("error:", error);
      }
    };*/

  const onStopPressed = () => {
    if (sound != null) {
      sound.stopAsync();
      setIsPlaying(false);
    }
  };

  /*  const onPlayPausePressed = () => {
      if (sound != null) {
        if (isPlaying) {
          sound.pauseAsync();
        } else {
          sound.playAsync();
        }
      }
    };*/

  const onPlayPausePressed = async () => {
    /*setSound(sound);*/
    setIsPlaying(true);
    console.log("Playing Sound");
    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
    }
  };
  /*  async function startRecording() {
      try {
        console.log("Requesting submission...");
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        console.log("Start recording...");
        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        await recording.startAsync();
        setRecording(recording);
        console.log("Recording started");
      } catch (err) {
        console.error("Failed to start recording", err);
      }
    }

    //Stop recording
    async function stopRecording() {
      console.log("Stopping recording...");
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      console.log("Recording stopped and stored at:", uri);
      this.uploadAudio(uri);
    }

    //Upload Audio to Firebase
    uploadAudio = async (uri) => {
      const currentQuizId = Math.floor(100000 + Math.random() * 9000).toString();
      const response = await fetch(uri);
      const blob = await response.blob();

      try {
        var ref = storage.ref(`/audio/quizzes/${currentQuizId}`);
        await ref
          .put(blob)
          .then((snapshot) => {
            return snapshot.ref.getDownloadURL();
          })
          .then((downloadURL) => {
            console.log("your audio:" + downloadURL);
            setRecording(downloadURL);
            /!*setImageUrl(downloadURL);*!/
            return downloadURL;
          });

        return null;
      } catch (error) {
        return null;
      }
    };*/

  return (
    <>
      {audioUpload != false ? (
        <IconLabel
          icon={icons.checked}
          label={"Audio Saved!"}
          containerStyle={{
            marginVertical: SIZES.radius,
          }}
          iconStyle={{
            width: 20,
            height: 20,
            tintColor: COLORS.secondary,
          }}
          labelStyle={{
            marginLeft: 5,
            color: COLORS.secondary,
            ...FONTS.h4,
          }}
        />
      ) : (
        <View
          style={{
            width: "100%",
            position: "relative",
            backgroundColor: COLORS.white,
            alignItems: "flex-start",
            marginVertical: SIZES.radius,
            padding: 2,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              marginBottom: SIZES.base,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.wrapper}
              onPress={recording ? stopRecording : startRecording}

              /* disabled={!isPlaybackAllowed || isLoading}*/
            >
              <IconLabel
                icon={icons.microphone}
                label={recording ? "Stop Recording" : "Start Recording"}
                containerStyle={{
                  marginLeft: 0,
                }}
                iconStyle={{
                  width: 25,
                  height: 25,
                  tintColor: COLORS.primary2,
                }}
                labelStyle={{
                  marginLeft: 5,
                  color: COLORS.primary2,
                  ...FONTS.h4,
                }}
              />
            </TouchableOpacity>

            {/*Indicator time recording...*/}
            <View style={styles.recordingDataContainer}>
              <IconLabel
                icon={isRecording ? icons.rec : null}
                containerStyle={{
                  marginLeft: 0,
                  opacity: isRecording ? 1.0 : 0.0,
                }}
                iconStyle={{
                  width: 15,
                  height: 15,
                  tintColor: "#FF0000",
                }}
                labelStyle={{
                  marginLeft: 5,
                  color: COLORS.primary2,
                  ...FONTS.h4,
                }}
              />
              <Text style={{ color: "red", ...FONTS.h3 }}>
                {isRecording ? "REC..." : null}
              </Text>
              <View style={styles.recordingDataRowContainer}></View>
              <View />
            </View>
            {/*<CountDown
            running={isRecording ? true : false}
            timeToShow={["S"]}
            until={counter}
            onFinish={() => {
              setCounter(26);
            }}
            onPress={() => alert("hello")}
            size={10}
          />*/}
            <CountdownCircleTimer
              key={keyTimer}
              isPlaying={isRecording ? true : false}
              duration={15}
              colors={[COLORS.primary, "#fedb41", "#FF0000", COLORS.secondary]}
              colorsTime={[7, 5, 2, 0]}
              size={35}
              strokeWidth={3}
              strokeLinecap="round"
              onComplete={stopRecording}
            >
              {({ remainingTime }) => (
                <Text style={{ ...FONTS.h5 }}>{remainingTime}</Text>
              )}
            </CountdownCircleTimer>
            {/*end*/}
          </View>

          {sound != null ? (
            <View style={styles.playStopContainer}>
              {/*  Container play/pause and back to begin*/}
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                {/*Back*/}
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={onStopPressed}
                  /*disabled={!this.state.isPlaybackAllowed || this.state.isLoading}*/
                >
                  {/*<Image style={{ width: 25, height: 25 }} source={icons.play} />*/}
                  <IconLabel
                    icon={icons.stop_audio}
                    /*label={"Play"}*/
                    containerStyle={{
                      marginRight: SIZES.base,
                    }}
                    iconStyle={{
                      width: 30,
                      height: 25,
                      tintColor: COLORS.primary,
                    }}
                    labelStyle={{
                      marginLeft: 5,
                      color: COLORS.primary2,
                      ...FONTS.h4,
                    }}
                  />
                </TouchableOpacity>

                {!isPlaying ? (
                  /*Play*/
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={onPlayPausePressed}
                    /*disabled={!this.state.isPlaybackAllowed || this.state.isLoading}*/
                  >
                    {/*<Image style={{ width: 25, height: 25 }} source={icons.play} />*/}
                    <IconLabel
                      icon={icons.play_audio}
                      /*label={"Play"}*/
                      containerStyle={{
                        marginLeft: 0,
                      }}
                      iconStyle={{
                        width: 25,
                        height: 25,
                        tintColor: COLORS.primary,
                      }}
                      labelStyle={{
                        marginLeft: 5,
                        color: COLORS.primary2,
                        ...FONTS.h4,
                      }}
                    />
                  </TouchableOpacity>
                ) : (
                  /*Pause*/
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={onPlayPausePressed}
                    /*disabled={!this.state.isPlaybackAllowed || this.state.isLoading}*/
                  >
                    <IconLabel
                      icon={icons.pause_audio}
                      /*label={"Stop"}*/
                      containerStyle={{
                        marginLeft: 0,
                      }}
                      iconStyle={{
                        width: 25,
                        height: 25,
                        tintColor: COLORS.primary,
                      }}
                      labelStyle={{
                        marginLeft: 5,
                        color: COLORS.primary2,
                        ...FONTS.h4,
                      }}
                    />
                  </TouchableOpacity>
                )}
              </View>

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    if (recording != null) {
                      uploadAudio();
                      onStopPressed();
                    } else {
                      () => {};
                    }
                  }}
                  /* disabled={!isPlaybackAllowed || isLoading}*/
                >
                  <IconLabel
                    icon={icons.checked}
                    label={"Save audio"}
                    containerStyle={{
                      marginRight: SIZES.radius,
                    }}
                    iconStyle={{
                      width: 25,
                      height: 25,
                      tintColor: COLORS.secondary,
                    }}
                    labelStyle={{
                      marginLeft: 5,
                      color: COLORS.secondary,
                      ...FONTS.h4,
                    }}
                  />
                </TouchableOpacity>

                {/*Reset*/}
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    setRecording(null);
                    setSound(null);
                    onStopPressed();
                    setKeyTimer((prevKey) => prevKey + 1);
                  }}
                  /* disabled={!isPlaybackAllowed || isLoading}*/
                >
                  <IconLabel
                    icon={icons.refresh}
                    label={""}
                    containerStyle={{
                      marginLeft: 0,
                    }}
                    iconStyle={{
                      width: 25,
                      height: 25,
                      tintColor: COLORS.primary2,
                    }}
                    labelStyle={{
                      marginLeft: 5,
                      color: COLORS.primary2,
                      ...FONTS.h4,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
      )}

      {/*Save Quiz*/}
      {/* <View style={{ margin: SIZES.padding, backgroundColor: "red" }}>
        <FormButton
          labelText={recording ? "Stop Recording" : "Start Recording"}
          handleOnPress={recording ? stopRecording : startRecording}
          style={{ marginTop: SIZES.padding }}
        />
        <FormButton
          labelText="upload"
          handleOnPress={uploadAudio}
          style={{ marginTop: SIZES.padding }}
        />
        <FormButton
          labelText="download"
          handleOnPress={downloadAudio}
          style={{ marginTop: SIZES.padding }}
        />
        {sound != null ? (
          <FormButton
            labelText="reset"
            handleOnPress={() => {
              setRecording(null);
              setSound(null);
              onStopPressed();
            }}
            style={{ marginTop: SIZES.padding }}
          />
        ) : null}
      </View>*/}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    height: SIZES.height,
  },
  wrapper: { marginBottom: SIZES.base },
  playStopContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  recordingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    height: "100%",
  },
  recordingDataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    /*minHeight: Icons.RECORD_BUTTON.height,
        maxHeight: Icons.RECORD_BUTTON.height,
        minWidth: Icons.RECORD_BUTTON.width * 3.0,
        maxWidth: Icons.RECORD_BUTTON.width * 3.0,*/
    width: SIZES.width / 4,
  },
  recordingDataRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: Icons.RECORDING.height,
    maxHeight: Icons.RECORDING.height,
  },
});

export default AudioRecorder;
