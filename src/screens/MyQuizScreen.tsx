import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
  Alert,
  TouchableOpacity,
} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import FormInput from "../components/shared/FormInput";
import FormButton from "../components/shared/FormButton";

import { createQuestion } from "../utils/database";

import QuizCard from "../components/shared/QuizCard";
import HeaderSection from "../components/shared/HeaderSection";

import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import AppLoader from "../components/AppLoader";
import QuizLoader from "../components/QuizLoader";
import { LinearGradient } from "expo-linear-gradient";
import { firestore } from "../../firebase";
import IconLabel from "../components/IconLabel";
import { LineDivider } from "../components/ProfileScreen";

const MyQuizScreen = ({ navigation, route }) => {
  const [currentQuizId, setCurrentQuizId] = useState(
    route.params.currentQuizId
  );
  const [currentAudioId, setCurrentAudioId] = useState(
    route.params.currentAudioId
  );
  const [currentQuizTitle, setCurrentQuizTitle] = useState(
    route.params.currentQuizTitle
  );
  const [currentQuizImage, setCurrentQuizImage] = useState(
    route.params.currentQuizImage
  );
  /*const [currentImageUri, setCurrentImageUri] = useState(
    route.params.currentImageUri
  );*/
  const [quizOwner, setQuizOwner] = useState(route.params.quizOwner);

  const [question, setQuestion] = useState("");
  /*const [imageUri, setImageUri] = useState(currentImageUri);*/

  const [correctAnswer, setCorrectAnswer] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [optionThree, setOptionThree] = useState(null);
  const [optionFour, setOptionFour] = useState(null);
  const [showOptionThree, setShowOptionThree] = useState(false);
  const [showOptionFour, setShowOptionFour] = useState(false);

  const [count, setCount] = useState(1);

  const [error, setError] = useState("");
  const hasUnsavedChanges = Boolean(count > 0);

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
    if (question == "")
      return updateError("Required a question field!", setError);
    //If title have 3 or more characters
    if (!question.trim() || question.length < 3)
      return updateError("Question must have at least 3 characters", setError);
    if (!question.trim() || question.length > 30)
      return updateError("Question is too long!", setError);
    //provide the correct answer
    if (correctAnswer == "")
      return updateError("You must provide the correct answer", setError);
    //Option 2
    if (optionTwo == "")
      return updateError("You must enter at least two options", setError);

    //Possible repeat options
    if (correctAnswer === optionTwo)
      return updateError("Options must be differents!", setError);
    if (correctAnswer === optionThree)
      return updateError("Options must be differents!", setError);
    if (correctAnswer === optionFour)
      return updateError("Options must be differents!", setError);
    //
    if (optionTwo === optionThree)
      return updateError("Options must be differents!", setError);
    if (optionTwo === optionFour)
      return updateError("Options must be differents!", setError);
    if (optionThree === optionTwo)
      return updateError("Options must be differents!", setError);
    /* if (optionThree == optionFour && showOptionFour == showOptionThree)
      return setShowOptionFour(false);
    setShowOptionThree(false);

    updateError("Try to save your question again!", setError);*/

    /* if (optionThree && optionFour == null && showOptionFour == showOptionThree)
      return setShowOptionFour(false);
    setShowOptionThree(false);*/
    /* if (optionFour === optionThree)
      return updateError("Options must be differents!", setError);*/
    if (optionFour === optionTwo)
      return updateError("Options must be differents!", setError);
    if (
      showOptionThree &&
      showOptionFour == true &&
      optionThree &&
      optionFour == null
    )
      return setShowOptionFour(false);
    setShowOptionThree(false);
    return true;
  };

  //
  const handleQuestionSave = async () => {
    /*if (question == "" || correctAnswer == "" || optionTwo == "") {
      return;
    }*/
    if (isValidQuiz()) {
      let currentQuestionId = Math.floor(
        100000 + Math.random() * 9000
      ).toString();

      // Add question to db
      await createQuestion(currentQuizId, currentQuestionId, {
        question: question,
        correct_answer: correctAnswer,
        incorrect_answers: [optionTwo, optionThree, optionFour],
        /* imageUrl: imageUrl,*/
      });

      //Increment question counter
      setCount(count + 1);

      ToastAndroid.show("Question saved", ToastAndroid.SHORT);

      // Reset
      setQuestion("");
      setCorrectAnswer("");
      setOptionTwo("");
      setOptionThree(null);
      setOptionFour(null);
      setShowOptionThree(false);
      setShowOptionFour(false);
    }
  };

  const handleAddOptions = () => {
    if (!showOptionThree) {
      setShowOptionThree(true);
    }
    if (showOptionFour == false && showOptionThree == true) {
      setShowOptionFour(true);
    }
    /*  if (showOptionFour == true && showOptionThree == true) {
      setShowOptionFour(false);
      setOptionFour(null);
    }*/
    /*if (
      showOptionFour == false &&
      showOptionThree == true &&
      optionFour == null
    ) {
      setShowOptionThree(false);
      setOptionThree(null);
    }*/
  };
  const deleteQuiz = () =>
    Alert.alert("Delete Quiz", "Are you sure to delete this Quiz?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          firestore
            .collection("Quizzes")
            .doc(currentQuizId)
            .delete()
            .then(() => {
              console.log("quiz no saved!");
            })
            .catch((e) => console.log("error", e));
        },
      },
    ]);
  useEffect(
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
          "You have unsaved changes. Are you sure to discard them and leave the screen?",
          [
            { text: "Don't leave", style: "cancel", onPress: () => {} },
            {
              text: "Discard",
              style: "destructive",
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => {
                navigation.dispatch(e.data.action);
                firestore
                  .collection("Quizzes")
                  .doc(currentQuizId)
                  .delete()
                  .then(() => {
                    console.log("quiz no saved!");
                  })
                  .catch((e) => console.log("error", e));
              },
            },
          ]
        );
      }),
    [navigation, hasUnsavedChanges]
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}
      >
        {/*Render Header*/}
        <HeaderSection
          title="Add Your Questions"
          onPress={() => navigation.goBack()}
          icon={icons.back}
        />

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
          }}
        >
          <View style={{ padding: 20 }}>
            {/*Render Quiz Card*/}
            <QuizCard
              currentQuizImage={currentQuizImage}
              currentQuizTitle={currentQuizTitle}
              owner={quizOwner}
              QuizID={currentQuizId}
              currentAudioId={currentAudioId}
            />

            {/*Question Counter*/}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: SIZES.radius,
              }}
            >
              <LinearGradient
                colors={["#FA6EAE", COLORS.secondary]}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 10,
                  alignSelf: "flex-start",
                  elevation: 3,
                }}
              >
                <FontAwesome
                  name="question-circle"
                  size={18}
                  style={{ color: COLORS.white }}
                />
                <Text
                  style={{ color: COLORS.white, marginLeft: 6, ...FONTS.h3 }}
                >
                  Total questions saved : {count - 1}
                </Text>
              </LinearGradient>
            </View>
            {error ? (
              <Text style={{ color: "red", ...FONTS.h4, textAlign: "center" }}>
                {error}
              </Text>
            ) : null}
            {/*Question*/}
            <FormInput
              labelText={"Question " + count}
              placeholderText="Enter a Question"
              onChangeText={(val) => setQuestion(val)}
              value={question}
            />

            {/* Options */}
            <View style={{ marginTop: 30 }}>
              <FormInput
                labelText="Correct Answer"
                onChangeText={(val) => setCorrectAnswer(val)}
                value={correctAnswer}
              />

              <FormInput
                labelText="Option 2"
                onChangeText={(val) => setOptionTwo(val)}
                color={COLORS.incorrect}
                value={optionTwo}
              />
              {showOptionThree != false ? (
                <FormInput
                  labelText="Option 3"
                  icon={!showOptionFour ? "remove-circle" : ""}
                  color={COLORS.incorrect}
                  _changeIcon={() => {
                    if (showOptionThree == true) {
                      setShowOptionThree(!showOptionThree);
                      setOptionThree(null);
                      console.log("presss 3");
                    }
                  }}
                  onChangeText={(val) => setOptionThree(val)}
                  value={optionThree}
                />
              ) : null}

              {showOptionFour != false ? (
                <FormInput
                  labelText="Option 4"
                  icon="remove-circle"
                  color={COLORS.incorrect}
                  _changeIcon={() => {
                    if (showOptionFour == true) {
                      setShowOptionFour(!showOptionFour);
                      setOptionFour(null);
                      console.log("presss");
                    }
                  }}
                  onChangeText={(val) => setOptionFour(val)}
                  value={optionFour}
                />
              ) : null}
              {showOptionFour != true ? (
                <TouchableOpacity onPress={handleAddOptions}>
                  <IconLabel
                    containerStyle={{
                      alignSelf: "center",
                      marginVertical: SIZES.padding,
                    }}
                    label="Add Option"
                    labelStyle={{ color: COLORS.primary2 }}
                    iconStyle={{
                      width: 25,
                      height: 25,
                      tintColor: COLORS.primary2,
                    }}
                    icon={icons.add}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            <FormButton
              labelText="Save Question"
              handleOnPress={handleQuestionSave}
            />
            <FormButton
              labelText="Done & Go Home"
              isPrimary={false}
              handleOnPress={() => {
                setCurrentQuizId("");
                navigation.navigate("Home");
                route.params.setCurrentQuizImage("");
                setCount(1);
                if (count == 1) {
                  firestore
                    .collection("Quizzes")
                    .doc(currentQuizId)
                    .delete()
                    .then(() => {
                      console.log("quiz no saved!");
                    })
                    .catch((e) => console.log("error", e));
                }
                if (count != 1) {
                  ToastAndroid.show("Quizzed saved!", ToastAndroid.SHORT);
                } else null;
              }}
              style={{
                marginVertical: 20,
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default MyQuizScreen;
