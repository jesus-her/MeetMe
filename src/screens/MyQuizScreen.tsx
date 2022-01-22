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
  const [quizOwner, setQuizOwner] = useState(route.params.quizOwner);

  const [question, setQuestion] = useState("");
  const [imageUri, setImageUri] = useState("");

  const [correctAnswer, setCorrectAnswer] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [optionThree, setOptionThree] = useState("");
  const [optionFour, setOptionFour] = useState("");

  const handleQuestionSave = async () => {
    if (question == "" || correctAnswer == "" || optionTwo == "") {
      return;
    }

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
    ToastAndroid.show("Question saved", ToastAndroid.SHORT);

    // Reset
    setQuestion("");
    setCorrectAnswer("");
    setOptionTwo("");
    setOptionThree("");
    setOptionFour("");
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
            />

            <FormInput
              labelText="Question"
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
