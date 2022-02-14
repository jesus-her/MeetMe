import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import { getQuizById, getQuestionsByQuizId } from "../utils/database";
import ResultModal from "../components/PlayScreen/ResultModal";
import CheckButton from "../components/CheckButton";
import LiquidSwipe from "../components/PlayScreen/LiquidSwipe";
import { IconButton } from "../components/ProfileScreen";

import { LinearGradient } from "expo-linear-gradient";
import { firestore, firebase_db } from "../../firebase";
import PlayButton from "../components/shared/PlayButton";
import { Ionicons } from "@expo/vector-icons";
import Quiz from "../components/MyQuiz/Quiz";

const PlayQuizScreen = ({ navigation, route }) => {
  const [currentQuizId, setCurrentQuizId] = useState(route.params.quizId);
  const [quizImg, setQuizImg] = useState(route.params.quizImg);
  const [quizOwner, setQuizOwner] = useState(route.params.quizOwner);
  const [quizAudioId, setQuizAudioId] = useState(route.params.quizAudioId);
  const [title, setTitle] = useState("");

  const [questions, setQuestions] = useState([]);

  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);

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
          justifyContent: "space-between",
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
                width: SIZES.heightNav / 1.5,
                height: SIZES.heightNav / 1.5,
                borderRadius: SIZES.heightNav,
              }}
            />
          ) : (
            <Image
              source={require("../../assets/icons/laughing.png")}
              style={{
                width: SIZES.heightNav / 1.5,
                height: SIZES.heightNav / 1.5,
                borderRadius: SIZES.heightNav,
                tintColor: COLORS.black,
              }}
            />
          )}

          <View>
            {/* Title */}
            <Text style={{ ...FONTS.h3, marginLeft: 10 }}>{title}</Text>

            {/* Quiz by: */}
            <Text
              style={{
                ...FONTS.h5,
                marginLeft: 10,
                color: COLORS.primary,
                textAlign: "center",
              }}
            >
              Quiz by: {quizOwner}
            </Text>
          </View>
        </View>

        {/* Correct and incorrect count*/}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/*Correct*/}
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

          {/*Incorrect*/}
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
        </View>
      </View>

      {/* Questions and Options list */}
      <FlatList
        data={questions}
        pagingEnabled={true}
        scrollEnabled={scrollEnabled}
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.question}
        renderItem={({ item, index }) => (
          <View
            style={{
              backgroundColor: COLORS.white,
            }}
          >
            {/* Result Modal */}
            <ResultModal
              isModalVisible={isResultModalVisible}
              correctCount={correctCount}
              incorrectCount={incorrectCount}
              totalCount={questions.length}
              handleOnClose={() => {
                setIsResultModalVisible(false);
              }}
              handleRetry={() => {
                setCorrectCount(0);
                setIncorrectCount(0);
                getQuizAndQuestionDetails();
                setIsResultModalVisible(false);
              }}
              handleHome={() => {
                navigation.goBack();
                setIsResultModalVisible(false);
              }}
            />
            {/*<LiquidSwipe
              allQuestionsLength={questions.length}
              question={item.question}
              quizImage={quizImg}
              correctCount={correctCount}
              incorrectCount={incorrectCount}
              quizOwner={quizOwner}
              quizImg={quizImg}
              quizTitle={title}
              allOptions={item.allOptions.map((option, optionIndex) => {
                return (
                  <>
                    {
                      option != null ? (
                        <TouchableOpacity
                          key={optionIndex}
                          style={{
                            paddingVertical: SIZES.radius,
                            paddingHorizontal: SIZES.padding,
                            borderRadius: SIZES.radius,
                            backgroundColor: getOptionBgColor(item, option),
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            width: "100%",
                          }}
                          onPress={() => {
                            if (item.selectedOption) {
                              return null;
                            }
                            // Increase correct/incorrect count
                            if (option == item.correct_answer) {
                              setCorrectCount(correctCount + 1);
                            } else {
                              setIncorrectCount(incorrectCount + 1);
                            }

                            let tempQuestions = [...questions];
                            tempQuestions[index].selectedOption = option;
                            setQuestions([...tempQuestions]);
                          }}
                        >
                          <LinearGradient
                            colors={[
                              COLORS.primary,
                              COLORS.primary2,
                              COLORS.primary3,
                            ]}
                            style={{
                              width: 25,
                              height: 25,
                              borderWidth: 3,
                              borderColor: COLORS.black,
                              marginRight: SIZES.padding,

                              borderRadius: 25,
                              backgroundColor: getOptionTextColor(item, option),
                            }}
                          />

                          <Text
                            style={{
                              ...FONTS.h3,
                              color: getOptionTextColor(item, option),
                            }}
                          >
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ) : null
                    }
                  </>
                );
              })}
            />*/}
            <Quiz
              quizId={currentQuizId}
              allQuestions={questions}
              shuffle={getQuizAndQuestionDetails}
              attempts={attempts}
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
          </View>
        )}
        /*ListFooterComponent={() => (
          <View
            style={{
              height: SIZES.heightPlayScreen,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckButton
              handleOnPress={() => {
                setIsResultModalVisible(true);
                attempts(currentQuizId);
              }}
            />
          </View>
        )}*/
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width: SIZES.width,
    height: SIZES.height,
  },
});

export default PlayQuizScreen;
