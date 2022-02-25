import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
  StyleSheet,
  Alert,
} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constants";
import data from "./data";
import { Ionicons } from "@expo/vector-icons";
import LiquidProgressFill from "../LiquidProgressFill";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import LineDivider from "../LineDivider";
import { Line } from "react-native-svg";
import FormButton from "../shared/FormButton";
import { RectButton } from "react-native-gesture-handler";
import { firestore, auth } from "../../../firebase";

const Quiz = ({
  allQuestions,
  shuffle,
  attempts,
  quizId,
  quizImg,
  quizOwner,
  quizTitle,
}) => {
  /*const allQuestions = data;*/
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const hasUnsavedChanges = Boolean(score == 0);
  const uid = auth.currentUser.uid;
  const attemptedBy = auth.currentUser.displayName;
  const attemptedByPhotoURL = auth.currentUser.photoURL;
  const navigation = useNavigation();
  const currentLeaderboardId = Math.floor(
    100000 + Math.random() * 9000
  ).toString();
  const leaderboard = () => {
    firestore
      .collection("Quizzes")
      .doc(quizId)
      .collection("LeaderBoard")
      .doc(currentLeaderboardId)
      .set({
        score,
        uid,
        attemptedBy,
        attemptedByPhotoURL,
        allQuestions: allQuestions.length,
      });
  };

  const validateAnswer = (selectedOption) => {
    let correct_option = allQuestions[currentQuestionIndex]["correct_answer"];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);
    if (selectedOption == correct_option) {
      // Set Score
      setScore(score + 1);
    }
    // Show Next Button
    setShowNextButton(true);
  };
  const handleNext = () => {
    if (currentQuestionIndex == allQuestions.length - 1) {
      // Last Question
      // Show Score Modal
      setShowScoreModal(true);
      //print leaderboard in database
      leaderboard();
      //Add +1 to counter attempt
      attempts(quizId);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  const restartQuiz = () => {
    shuffle();
    setShowScoreModal(false);

    setCurrentQuestionIndex(0);
    setScore(0);

    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };
  /*useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }
        // Prevent default behavior of leaving the screen
        e.preventDefault();
        // Prompt the user before leaving the screen
        Alert.alert(
          "Discard changes?",
          "You have unsaved answers. Are you sure to discard them and leave the screen?",
          [
            { text: "Continue Quiz", style: "cancel", onPress: () => {} },
            {
              text: "Discard",
              style: "default",
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => {
                navigation.dispatch(e.data.action);
                /!* firestore
                                    .collection("Quizzes")
                                    .doc(currentQuizId)
                                    .delete()
                                    .then(() => {
                                        console.log("quiz no saved!");
                                    })
                                    .catch((e) => console.log("error", e));*!/
              },
            },
          ]
        );
      }),
    [navigation, hasUnsavedChanges]
  );*/

  const renderQuestion = () => {
    return (
      <View
        style={{
          marginVertical: 10,
          alignSelf: "flex-start",
        }}
      >
        {/* Question Counter */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            borderBottomWidth: 3,
            borderColor: COLORS.primary,
            width: SIZES.width - SIZES.padding * 2,
            alignSelf: "center",
            paddingBottom: SIZES.radius,
            marginBottom: SIZES.radius,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
              marginRight: 2,
            }}
          >
            Question {currentQuestionIndex + 1}
          </Text>
          <Text style={{ color: COLORS.white, ...FONTS.h2, opacity: 0.6 }}>
            / {allQuestions.length}
          </Text>
        </View>

        {/* Question */}
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h1,
            textAlign: "left",
          }}
        >
          {allQuestions[currentQuestionIndex]?.question}
        </Text>
      </View>
    );
  };
  /* const renderOptions = () => {
    return <View></View>;
  };*/
  const renderNextButton = (isPrimary = true) => {
    if (showNextButton) {
      return (
        /*<TouchableOpacity
          onPress={handleNext}
          style={{
            width: "75%",
            height: SIZES.heightPlayScreen / 12,
            backgroundColor: COLORS.secondary,

            borderRadius: 200,
            justifyContent: "center",
            position: "absolute",
            bottom: 0,
          }}
        >
          <LinearGradient
            colors={["#FA6EAE", COLORS.secondary]}
            style={{
              width: "100%",
              height: "100%",
              padding: 20,
              borderRadius: 200,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.white,
                textAlign: "center",
                letterSpacing: 2,
              }}
            >
              Next
            </Text>
          </LinearGradient>
        </TouchableOpacity>*/
        <LinearGradient
          colors={[
            isPrimary ? COLORS.secondary : COLORS.white,
            isPrimary ? "#FA6EAE" : COLORS.white,
          ]}
          start={{ x: 0.1, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={{
            margin: 16,
            borderRadius: 30,
            alignSelf: "center",
            borderWidth: 1,
            borderColor: COLORS.primary,
            width: "100%",
            height: 40,
            position: "absolute",
            bottom: 0,
          }}
        >
          <View style={styles.shadow} />
          <RectButton style={styles.button} onPress={handleNext}>
            <Text
              style={{
                textAlign: "center",
                ...FONTS.h2,
                color: isPrimary ? COLORS.white : COLORS.primary,
                marginRight: 12,
              }}
            >
              {currentQuestionIndex == allQuestions.length - 1
                ? "See Results"
                : "Next"}
            </Text>
            <Image
              source={
                currentQuestionIndex == allQuestions.length - 1
                  ? icons.checked
                  : icons.right_arrow
              }
              resizeMode="contain"
              style={styles.icon}
            />
          </RectButton>
        </LinearGradient>
      );
    } else {
      return null;
    }
  };

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ["0%", "100%"],
  });
  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 20,
          borderRadius: 20,
          backgroundColor: COLORS.primary + "50",
        }}
      >
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: COLORS.primary3,
            },
            {
              width: progressAnim,
            },
          ]}
        />
      </View>
    );
  };

  return (
    <LinearGradient
      colors={[COLORS.primary2, COLORS.primary]}
      style={{
        height: SIZES.heightPlayScreen,
        paddingHorizontal: SIZES.padding,
        paddingTop: SIZES.padding,
        backgroundColor: COLORS.primary,
        position: "relative",
        alignItems: "center",
      }}
    >
      {/* ProgressBar */}
      {renderProgressBar()}

      {/* Question */}
      {renderQuestion()}

      {/* Options */}
      <View
        style={{
          height: SIZES.heightPlayScreen / 1.5,
          width: SIZES.width - SIZES.padding,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {/*{renderOptions()}*/}
        {allQuestions[currentQuestionIndex]?.allOptions.map((option) => {
          return (
            <>
              {option != null ? (
                <TouchableOpacity
                  onPress={() => validateAnswer(option)}
                  disabled={isOptionsDisabled}
                  key={option}
                  style={{
                    borderWidth: 3,
                    borderColor:
                      option == correctOption
                        ? COLORS.correct
                        : option == currentOptionSelected
                        ? COLORS.incorrect
                        : COLORS.additionalColor9 + "50",
                    backgroundColor:
                      option == correctOption
                        ? COLORS.correct + "70"
                        : option == currentOptionSelected
                        ? COLORS.incorrect + "70"
                        : COLORS.additionalColor4 + "25",
                    height: SIZES.heightPlayScreen / 12,
                    width: SIZES.width - SIZES.padding,
                    borderRadius: SIZES.radius,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    marginBottom: SIZES.padding,
                  }}
                >
                  {option != null ? (
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>
                      {option}
                    </Text>
                  ) : null}

                  {/* Show Check Or Cross Icon based on correct answer*/}
                  {option == correctOption ? (
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 30 / 2,
                        backgroundColor: COLORS.correct,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons name="checkmark" size={20} color="white" />
                    </View>
                  ) : option == currentOptionSelected ? (
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 30 / 2,
                        backgroundColor: COLORS.incorrect,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons name="close" size={20} color="white" />
                    </View>
                  ) : null}
                </TouchableOpacity>
              ) : null}
            </>
          );
        })}

        {/* Next Button */}
        {renderNextButton()}
      </View>
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={showScoreModal}
        /*onRequestClose={handleOnClose}*/
      >
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.black + "50",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.white,
              width: "90%",
              height: SIZES.height * 0.8,
              borderRadius: SIZES.radius,
              padding: SIZES.padding,
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <View
              style={{
                alignSelf: "flex-start",
                borderBottomWidth: 2,
                borderColor: COLORS.gray70,
                width: "100%",
                marginBottom: SIZES.padding,
              }}
            >
              <Text
                style={{
                  ...FONTS.h2,
                  color: COLORS.black,
                  textAlign: "left",
                  letterSpacing: 5,
                }}
              >
                Results
              </Text>
            </View>
            {/*Result Text*/}
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                {score > allQuestions.length / 2 ? "¡Felicidades!" : "Oops!"}
              </Text>
              <Image
                source={
                  score > allQuestions.length / 2
                    ? require("../../../assets/LeaderBoard/emoji_silly.gif")
                    : require("../../../assets/LeaderBoard/emoji_sad.gif")
                }
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 50,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <LiquidProgressFill
                correctCount={score}
                /* questionsLength={allQuestions.length}*/
                totalCount={allQuestions.length}
              />
              {/*   <View style={{ alignItems: "center", padding: 20 }}>
              <Text style={{ color: COLORS.primary3, fontSize: 30 }}>
                {correctCount}
              </Text>
              <Text style={{ fontSize: 16 }}>Correct</Text>
            </View>
            <View style={{ alignItems: "center", padding: 20 }}>
              <Text style={{ color: COLORS.secondary, fontSize: 30 }}>
                {incorrectCount}
              </Text>
              <Text style={{ fontSize: 16 }}>Incorrect</Text>
            </View>*/}
            </View>

            {/* Try again */}

            <LinearGradient
              colors={[COLORS.primary, COLORS.primary2]}
              start={{ x: 0.1, y: 0.5 }}
              end={{ x: 1, y: 1 }}
              style={{
                margin: 16,
                borderRadius: 30,
                alignSelf: "center",
                borderWidth: 1,
                borderColor: COLORS.primary,
                width: "100%",
                height: 40,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",

                  borderRadius: 30,
                  height: 40,
                }}
                onPress={restartQuiz}
              >
                <Image
                  source={require("../../../assets/icons/reload.png")}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.white,
                    marginRight: 10,
                  }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    color: COLORS.white,
                    ...FONTS.h3,
                  }}
                >
                  Try Again
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            {/* Leaderboard */}
            <LinearGradient
              colors={[COLORS.primary, COLORS.primary2]}
              start={{ x: 0.1, y: 0.5 }}
              end={{ x: 1, y: 1 }}
              style={{
                margin: 16,
                borderRadius: 30,
                alignSelf: "center",
                borderWidth: 1,
                borderColor: COLORS.primary,
                width: "100%",
                height: 40,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",

                  borderRadius: 30,
                  height: 40,
                }}
                onPress={() => {
                  setShowScoreModal(true);
                  navigation.navigate("Leaderboard", {
                    quizId: quizId,
                    quizImg: quizImg,
                    quizOwner: quizOwner,
                    quizTitle: quizTitle,
                  });
                }}
              >
                <Image
                  source={require("../../../assets/icons/podium.png")}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.white,
                    marginRight: 10,
                  }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    color: COLORS.white,
                    ...FONTS.h3,
                  }}
                >
                  View Leaderboard
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            {/* Try again */}

            <LinearGradient
              colors={[COLORS.primary + "20", COLORS.primary2 + "20"]}
              start={{ x: 0.1, y: 0.5 }}
              end={{ x: 1, y: 1 }}
              style={{
                margin: 16,
                borderRadius: 30,
                alignSelf: "center",
                borderWidth: 1,
                borderColor: COLORS.primary,
                width: "100%",
                height: 40,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",

                  borderRadius: 30,
                  height: 40,
                }}
                onPress={() => {
                  navigation.goBack();
                  setShowScoreModal(false);
                }}
              >
                <Image
                  source={require("../../../assets/icons/home.png")}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.primary,
                    marginRight: 10,
                  }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    color: COLORS.primary,
                    ...FONTS.h3,
                  }}
                >
                  Go Home
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </Modal>

      {/*  Score Modal
      <Modal animationType="slide" transparent={true} visible={showScoreModal}>
        <View
          style={{
            height: SIZES.height,
            backgroundColor: COLORS.primary,
            alignItems: "center",
            justifyContent: "center",
            padding: SIZES.padding,
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.white,
              width: "100%",
              height: SIZES.height * 0.7,
              justifyContent: "space-around",
              borderRadius: SIZES.radius,
              padding: SIZES.padding,
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                {score > allQuestions.length / 2 ? "¡Felicidades!" : "Oops!"}
              </Text>
              <Image
                source={
                  score > allQuestions.length / 2
                    ? require("../../../assets/LeaderBoard/emoji_silly.gif")
                    : require("../../../assets/LeaderBoard/emoji_sad.gif")
                }
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 50,
                }}
              />
            </View>

            <LiquidProgressFill
              correctCount={score}
              totalCount={allQuestions.length}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  color:
                    score > allQuestions.length / 2
                      ? COLORS.secondary2
                      : COLORS.secondary,
                }}
              >
                {score}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: COLORS.black,
                }}
              >
                / {allQuestions.length}
              </Text>
            </View>
             Retry Quiz button
            <TouchableOpacity
              onPress={restartQuiz}
              style={{
                backgroundColor: COLORS.primary2,
                padding: 20,
                width: "100%",
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: COLORS.white,
                  fontSize: 20,
                }}
              >
                Retry Quiz
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>*/}

      {/* Background Image */}
      <Image
        source={require("../../../assets/MyQuiz/DottedBG.png")}
        style={{
          width: SIZES.width,
          height: SIZES.heightPlayScreen / 9,
          zIndex: -1,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          opacity: 1,
        }}
        resizeMode={"cover"}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  containerGradient: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "90%",
    height: 40,
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 30,
    alignItems: "center",
  },
  label: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 5,
    textAlign: "center",
  },
  shadow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(29,29,29,0.3)",
    zIndex: -2,
    borderRadius: 30,
    height: 45,
    width: "100%",
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: COLORS.white,
  },
});

export default Quiz;
