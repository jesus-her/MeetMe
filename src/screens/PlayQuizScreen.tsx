import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import { getQuizById, getQuestionsByQuizId } from "../utils/database";

import { IconButton } from "../components/ProfileScreen";

import { firestore, firebase_db } from "../../firebase";

import Quiz from "../components/MyQuiz/Quiz";
import AppLoader from "../components/AppLoader";

const PlayQuizScreen = ({ navigation, route }) => {
  const [currentQuizId, setCurrentQuizId] = useState(route.params.quizId);
  const [quizImg, setQuizImg] = useState(route.params.quizImg);
  const [quizOwner, setQuizOwner] = useState(route.params.quizOwner);
  const [quizAudioId, setQuizAudioId] = useState(route.params.quizAudioId);
  const [title, setTitle] = useState("");

  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /*  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);*/

  //Attempts counter
  const attempts = async (currentQuizId) => {
    await firestore
      .collection("Quizzes")
      .doc(currentQuizId)
      .update({
        attemptCounter: firebase_db.firestore.FieldValue.increment(1),
      });
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      // Generate random number
      let j = Math.floor(Math.random() * (i + 1));

      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const getQuizAndQuestionDetails = async () => {
    setIsLoading(true);
    // Get Quiz
    let currentQuiz = await getQuizById(currentQuizId);
    currentQuiz = currentQuiz.data();
    setTitle(currentQuiz.title);

    // Get Questions for current quiz
    const questions = await getQuestionsByQuizId(currentQuizId);

    // Transform and shuffle options
    let tempQuestions = [];
    await questions.docs.forEach(async (res) => {
      let question = res.data();

      //Create 1 option only
      /* question.optionOne = shuffleArray([question.correct_answer]);
            await tempQuestions.push(question);*/

      // Create Single array of all options and shuffle it
      question.allOptions = shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]);
      await tempQuestions.push(question);
    });
    setIsLoading(false);
    setQuestions([...tempQuestions]);
    setQuestionsLength([...tempQuestions]);
  };

  useEffect(() => {
    getQuizAndQuestionDetails();
  }, []);

  const getOptionBgColor = (currentQuestion, currentOption) => {
    if (currentQuestion.selectedOption) {
      if (currentOption == currentQuestion.selectedOption) {
        if (currentOption == currentQuestion.correct_answer) {
          return COLORS.primary2;
        } else {
          return COLORS.secondary;
        }
      } else {
        return COLORS.white;
      }
    } else {
      return COLORS.white;
    }
  };

  const getOptionTextColor = (currentQuestion, currentOption) => {
    if (currentQuestion.selectedOption) {
      if (currentOption == currentQuestion.selectedOption) {
        return COLORS.white;
      } else {
        return COLORS.black;
      }
    } else {
      return COLORS.black;
    }
  };

  return (
    <>
      <SafeAreaView
        style={{
          height: SIZES.height,
          position: "relative",
        }}
      >
        <StatusBar
          hidden={false}
          backgroundColor={COLORS.white}
          barStyle={"dark-content"}
        />
        {/* Top Bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 10,
            paddingHorizontal: SIZES.radius,
            backgroundColor: COLORS.white,
            elevation: 4,
            height: SIZES.heightNav,
          }}
        >
          {/* Back Icon */}
          <IconButton
            icon={icons.back}
            containerStyle={{
              position: "absolute",
              left: SIZES.padding,
            }}
            iconStyle={{
              tintColor: COLORS.black,
            }}
            /* containerStyle={{ position: "absolute", left: SIZES.radius }}*/
            onPress={() => navigation.goBack()}
          />
          <View
            style={{
              flexDirection: "row",
            }}
          >
            {quizImg != "" ? (
              <Image
                source={{ uri: quizImg }}
                style={{
                  width: SIZES.heightNav / 1.25,
                  height: SIZES.heightNav / 1.25,
                  borderRadius: SIZES.heightNav,
                }}
              />
            ) : (
              <Image
                source={require("../../assets/icons/laughing.png")}
                style={{
                  width: SIZES.heightNav / 1.25,
                  height: SIZES.heightNav / 1.25,
                  borderRadius: SIZES.heightNav,
                  tintColor: COLORS.black,
                }}
              />
            )}

            <View>
              {/* Title */}
              <Text
                style={{
                  ...FONTS.h3,
                  marginLeft: SIZES.base,
                  textAlign: "left",
                }}
              >
                {title}
              </Text>

              {/* Quiz by: */}
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: quizOwner.length < 10 ? 14 : 10,
                  marginLeft: SIZES.base,
                  color: COLORS.primary,
                  textAlign: "left",
                }}
              >
                Quiz by: {quizOwner}
              </Text>
            </View>
          </View>

          {/*  Correct and incorrect count
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          Correct
          <View
            style={{
              backgroundColor: COLORS.primary2,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              borderWidth: 2,
              borderColor: COLORS.black,
            }}
          >
            <Ionicons
              name="checkmark"
              size={14}
              style={{ color: COLORS.white }}
            />
            <Text style={{ color: COLORS.white, marginLeft: 6, ...FONTS.h4 }}>
              {correctCount}
            </Text>
          </View>

          Incorrect
          <View
            style={{
              backgroundColor: COLORS.secondary,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              borderWidth: 2,
              borderColor: COLORS.black,
            }}
          >
            <Ionicons name="close" size={14} style={{ color: COLORS.white }} />
            <Text style={{ color: COLORS.white, marginLeft: 6, ...FONTS.h4 }}>
              {incorrectCount}
            </Text>
          </View>
        </View>*/}
        </View>

        {/* Questions and Options list */}
        <Quiz
          quizId={currentQuizId}
          allQuestions={questions}
          shuffle={getQuizAndQuestionDetails}
          attempts={attempts}
          quizImg={quizImg}
          quizOwner={quizOwner}
          quizTitle={title}
          /* correctOption={item.correct_option}
          setQuestions={setQuestions}
          allQuestionsLength={questions.length}
          question={item.question}
          quizImage={quizImg}
          correctCount={correctCount}
          incorrectCount={incorrectCount}
          setIncorrectCount={setIncorrectCount}
          quizOwner={quizOwner}
          quizImg={quizImg}
          quizTitle={title}
          selectedOption={item.selectedOption}
          allOptions={item.allOptions}*/
        />
      </SafeAreaView>
      {isLoading ? <AppLoader /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width: SIZES.width,
    height: SIZES.height,
  },
});

export default PlayQuizScreen;
