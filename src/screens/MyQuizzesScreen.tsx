import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  Alert,
  Clipboard,
  FlatList,
  Image,
  ImageBackground,
  Text,
  ToastAndroid,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { firestore, auth } from "../../firebase";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import Swipeout from "react-native-swipeout";
import {
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";

import HeaderSection from "../components/shared/HeaderSection";
import CustomButton2 from "../components/CustomButton2";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import ModalOptions from "../components/MyQuizzes/ModalOptions";
import IconLabel from "../components/IconLabel";
import QuizLoader from "../components/QuizLoader";
import QuizDelete from "../components/QuizDelete.";

const MyQuizzes = ({ navigation }) => {
  const [allQuizzes, setAllQuizzes] = useState([]);

  const sheetRef = useRef<BottomSheet>(null);
  const [modalOptionsOpen, setModalOptionsOpen] = useState(false);
  const [handleQuizId, setHandleQuizId] = useState("");
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const uid = auth.currentUser.uid;

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
    setModalOptionsOpen(true);
  }, []);

  useEffect(() => {
    const userQuizzes = firestore
      .collection("Quizzes")
      .where("userId", "==", uid)
      .onSnapshot((querySnapshot) => {
        const quizzes = [];
        querySnapshot.forEach((quiz) => {
          quizzes.push({
            ...quiz.data(),
            key: quiz.id,
          });
          /*console.log(quiz.id);*/
        });
        setAllQuizzes(quizzes);
      });
    return () => userQuizzes();
  }, []);

  const EmptyListMessage = () => {
    return (
      <View
        style={{
          width: SIZES.width,
          height: SIZES.heightPlayScreen,
          padding: SIZES.padding,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            marginVertical: SIZES.padding,
            width: SIZES.heightPlayScreen / 5,
            height: SIZES.heightPlayScreen / 5,
            tintColor: COLORS.gray20,
            alignSelf: "center",
          }}
          source={require("../../assets/icons/ghost.png")}
        />
        <Text
          style={{ ...FONTS.h1, color: COLORS.primary, textAlign: "center" }}
        >
          You have not created any Quizz yet!
        </Text>

        <Text
          style={{
            color: COLORS.gray50,
            ...FONTS.h3,
            fontWeight: "bold",
            marginVertical: SIZES.padding,
            textAlign: "center",
          }}
        >
          Start to create your own quiz and share it with your friends
        </Text>

        <CustomButton2
          label="Create your Quiz"
          colors={["#ff91b9", COLORS.secondary]}
          onPress={() => {
            navigation.navigate("TabCreateQuiz");
          }}
          icon={require("../../assets/icons/writing.png")}
        />
        {/*   </ImageBackground>*/}
      </View>
    );
  };

  return (
    <>
      <View
        style={{
          flex: 1,
        }}
      >
        <HeaderSection
          title="My Quizzes"
          onPress={() => navigation.goBack()}
          icon={icons.back}
        />

        <FlatList
          data={allQuizzes}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={EmptyListMessage}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item: quiz }) => (
            <>
              <Swipeout
                backgroundColor="transparent"
                autoClose={true}
                left={[
                  {
                    text: "Copy",
                    onPress: () => {
                      Clipboard.setString(quiz.currentQuizId);
                      ToastAndroid.show(
                        "Quiz ID copied to clipboard!",
                        ToastAndroid.SHORT
                      );
                    },
                    backgroundColor: COLORS.correct,
                    color: "#fff",
                    type: "delete",
                    component: (
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <Ionicons
                          name="copy"
                          color={COLORS.white}
                          size={35}
                          style={{
                            alignSelf: "center",
                            justifyContent: "center",
                          }}
                        />
                      </View>
                    ),
                  },
                ]}
                right={[
                  {
                    onPress: () =>
                      Alert.alert(
                        "Delete Quiz",
                        "Are you sure to delete this Quiz?",
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                          },
                          {
                            text: "Yes",
                            onPress: () => {
                              setIsDeleteLoading(true);
                              firestore
                                .collection("Quizzes")
                                .doc(quiz.currentQuizId)
                                .delete()
                                .then(() => {
                                  /*ToastAndroid.show(
                                  "Deleted success!",
                                  ToastAndroid.SHORT);*/
                                  setIsDeleteLoading(false);
                                })
                                .catch((e) => console.log("error", e));
                            },
                          },
                        ]
                      ),

                    text: "Delete",
                    backgroundColor: "#ff0000",
                    color: "#fff",
                    type: "primary",
                    component: (
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <MaterialCommunityIcons
                          name="delete-forever"
                          color={COLORS.white}
                          size={35}
                          style={{
                            alignSelf: "center",
                            justifyContent: "center",
                          }}
                        />
                      </View>
                    ),
                  },
                ]}
              >
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: SIZES.padding,
                    backgroundColor: COLORS.white,
                    paddingHorizontal: SIZES.padding,
                    marginVertical: SIZES.base,
                    width: "100%",
                    alignSelf: "center",
                    alignItems: "center",
                    opacity: 1,
                    elevation: 5,
                  }}
                >
                  {/*Profile Image*/}
                  <View
                    style={{
                      width: SIZES.width / 3.5,
                      height: SIZES.width / 3.5,
                      justifyContent: "center",
                    }}
                  >
                    {quiz.quizImg != "" ? (
                      <Image
                        source={{
                          uri: quiz.quizImg,
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 100,
                          borderWidth: 2,
                          borderColor: COLORS.gray30,
                          alignSelf: "center",
                        }}
                      />
                    ) : (
                      <Image
                        source={require("../../assets/icons/laughing.png")}
                        resizeMode="cover"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 100,
                          borderWidth: 2,
                          borderColor: COLORS.gray30,
                          alignSelf: "center",
                        }}
                      />
                    )}
                  </View>
                  {/* Details */}
                  <View
                    style={{
                      flex: 1,
                      marginLeft: SIZES.radius,
                      alignItems: "flex-start",

                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Text
                      style={{
                        ...FONTS.h2,
                        color: COLORS.black,
                        fontWeight: "normal",
                        borderRadius: SIZES.radius,
                      }}
                    >
                      {quiz.title} Quiz
                    </Text>
                    <Text
                      style={{
                        color: COLORS.gray50,
                        ...FONTS.h5,
                        fontWeight: "normal",
                      }}
                    >
                      Created by {quiz.owner}
                    </Text>
                    <IconLabel
                      icon={icons.solve}
                      label={"Attempted times: " + quiz.attemptCounter}
                      containerStyle={{
                        marginLeft: 0,
                      }}
                      iconStyle={{
                        width: 12,
                        height: 12,
                        tintColor: COLORS.primary2,
                      }}
                      labelStyle={{
                        marginLeft: 5,
                        color: COLORS.primary2,
                        ...FONTS.h5,
                      }}
                    />

                    <Text
                      style={{
                        ...FONTS.h3,
                        color: COLORS.primary,
                        textAlign: "left",
                        marginTop: SIZES.base / 2,
                      }}
                    >
                      Quiz ID: {quiz.currentQuizId}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setModalOptionsOpen(!modalOptionsOpen);
                      setHandleQuizId(quiz.currentQuizId);
                    }}
                    style={{ alignSelf: "flex-start" }}
                  >
                    <SimpleLineIcons
                      name="options-vertical"
                      size={24}
                      style={{ alignSelf: "flex-start" }}
                    />
                  </TouchableOpacity>
                </View>
              </Swipeout>
            </>
          )}
        />
        {/*{allQuizzes != null ? (
          <View
            style={{
              width: SIZES.width,

              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: SIZES.padding,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("TabCreateQuiz");
              }}
              style={{
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="add-circle" size={55} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>
        ) : null}*/}
        {/*Modal Options*/}
        <ModalOptions
          isDeleteLoading={isDeleteLoading}
          setIsDeleteLoading={setIsDeleteLoading}
          modalOptionsOpen={modalOptionsOpen}
          setModalOptionsOpen={setModalOptionsOpen}
          currentQuizId={handleQuizId}
        />
      </View>
      {isDeleteLoading ? <QuizDelete /> : null}
    </>
  );
};

export default MyQuizzes;
