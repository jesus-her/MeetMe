import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { COLORS, FONTS, icons, images, SIZES } from "../constants";
import FormInput from "../components/shared/FormInput";
import FormButton from "../components/shared/FormButton";
import HomeScreen from "./HomeScreen";
import { createQuestion } from "../utils/database";
import { storage } from "../../firebase";
import { launchImageLibrary } from "react-native-image-picker";
import { IconButton } from "../components/ProfileScreen";
import QuizCard from "../components/shared/QuizCard";
import HeaderSection from "../components/shared/HeaderSection";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";

const MyQuizScreen = ({ navigation, route }) => {
  const [currentQuizId, setCurrentQuizId] = useState(
    route.params.currentQuizId
  );
  const [currentQuizTitle, setCurrentQuizTitle] = useState(
    route.params.currentQuizTitle
  );
  const [currentQuizImage, setCurrentQuizImage] = useState(
    route.params.currentQuizImage
  );
  const [currentImageUri, setCurrentImageUri] = useState(
    route.params.currentImageUri
  );
  const [quizOwner, setQuizOwner] = useState(route.params.quizOwner);

  const [question, setQuestion] = useState("");
  /*const [imageUri, setImageUri] = useState(currentImageUri);*/

  const [correctAnswer, setCorrectAnswer] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [optionThree, setOptionThree] = useState(null);
  const [optionFour, setOptionFour] = useState(null);

  const [count, setCount] = useState(1);

  const [error, setError] = useState("");

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
    //provide the correct answer
    if (correctAnswer == "")
      return updateError("You must provide the correct answer", setError);
    //Option 2
    if (optionTwo == "")
      return updateError("You must enter at least two options", setError);
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
    }
  };

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
            />
            {error ? (
              <Text style={{ color: "red", ...FONTS.h4, textAlign: "center" }}>
                {error}
              </Text>
            ) : null}

            {/*Question Counter*/}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.secondary,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: COLORS.black,
                  alignSelf: "flex-start",
                }}
              >
                <FontAwesome5
                  name="question"
                  size={14}
                  style={{ color: COLORS.white }}
                />
                <Text
                  style={{ color: COLORS.white, marginLeft: 6, ...FONTS.h3 }}
                >
                  : {count}
                </Text>
              </View>
            </View>

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
                value={optionTwo}
              />
              <FormInput
                labelText="Option 3"
                onChangeText={(val) => setOptionThree(val)}
                value={optionThree}
              />
              <FormInput
                labelText="Option 4"
                onChangeText={(val) => setOptionFour(val)}
                value={optionFour}
              />
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
                ToastAndroid.show("Quizzed saved!", ToastAndroid.SHORT);
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
