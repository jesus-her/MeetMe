import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";
import data from "./data";
import { Ionicons } from "@expo/vector-icons";
import LiquidProgressFill from "../LiquidProgressFill";

const Quiz = () => {
  const allQuestions = data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  const validateAnswer = (selectedOption) => {
    let correct_option = allQuestions[currentQuestionIndex]["correct_option"];
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
    setShowScoreModal(false);

    setCurrentQuestionIndex(0);
    setScore(0);

    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

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
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h3,
              marginRight: 2,
            }}
          >
            {currentQuestionIndex + 1}
          </Text>
          <Text style={{ color: COLORS.white, ...FONTS.h3, opacity: 0.6 }}>
            / {allQuestions.length}
          </Text>
        </View>

        {/* Question */}
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h2,
            textAlign: "left",
          }}
        >
          {allQuestions[currentQuestionIndex]?.question}
        </Text>
      </View>
    );
  };
  const renderOptions = () => {
    return (
      <View>
        {allQuestions[currentQuestionIndex]?.options.map((option) => (
          <TouchableOpacity
            onPress={() => validateAnswer(option)}
            disabled={isOptionsDisabled}
            key={option}
            style={{
              borderWidth: 3,
              borderColor:
                option == correctOption
                  ? COLORS.primary3
                  : option == currentOptionSelected
                  ? COLORS.secondary
                  : COLORS.gray70 + "50",
              backgroundColor:
                option == correctOption
                  ? COLORS.primary3 + "25"
                  : option == currentOptionSelected
                  ? COLORS.secondary + "25"
                  : COLORS.gray80 + "25",
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
            <Text style={{ ...FONTS.h3, color: COLORS.white }}>{option}</Text>

            {/* Show Check Or Cross Icon based on correct answer*/}
            {option == correctOption ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: COLORS.primary3,
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
                  backgroundColor: COLORS.secondary,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="close" size={20} color="white" />
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <TouchableOpacity
          onPress={handleNext}
          style={{
            width: "100%",
            height: SIZES.heightPlayScreen / 11,
            backgroundColor: COLORS.secondary,
            padding: 20,
            borderRadius: 5,
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
        </TouchableOpacity>
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
          backgroundColor: "#00000020",
        }}
      >
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: COLORS.primary,
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
    <View
      style={{
        height: SIZES.heightPlayScreen,
        paddingHorizontal: SIZES.padding,
        paddingTop: SIZES.padding,
        backgroundColor: COLORS.primary2,
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
          justifyContent: "space-between",
        }}
      >
        {renderOptions()}

        {/* Next Button */}
        {renderNextButton()}
      </View>

      {/* Score Modal */}
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
              score={score}
              questionsLength={allQuestions.length}
            />

            {/*<View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginVertical: 20,
                backgroundColor: "red",
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
            </View>*/}
            {/* Retry Quiz button */}
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
      </Modal>

      {/* Background Image */}
      <Image
        source={require("../../../assets/MyQuiz/DottedBG.png")}
        style={{
          width: SIZES.width,
          height: SIZES.heightPlayScreen / 5,
          zIndex: -1,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          opacity: 1,
        }}
        resizeMode={"cover"}
      />
    </View>
  );
};

export default Quiz;
