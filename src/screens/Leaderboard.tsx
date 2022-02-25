import React, { useCallback, useEffect, useRef, useState } from "react";
import Quiz from "../components/MyQuiz/Quiz";
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  ToastAndroid,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { firestore, auth } from "../../firebase";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import QuizCard from "../components/shared/QuizCard";
import { LinearGradient } from "expo-linear-gradient";
import Swipeout from "react-native-swipeout";
import {
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";

import HeaderSection from "../components/shared/HeaderSection";
import CustomButton2 from "../components/CustomButton2";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import IconLabel from "../components/IconLabel";
import Billboard from "../components/PlayScreen/Billboard/Billboard";
import { IconButton } from "../components/ProfileScreen";
import LineDivider from "../components/LineDivider";

const Leaderboard = ({ navigation, route }) => {
  const [currentQuizId, setCurrentQuizId] = useState(route.params.quizId);
  const [quizImg, setQuizImg] = useState(route.params.quizImg);
  const [quizOwner, setQuizOwner] = useState(route.params.quizOwner);
  const [quizTitle, setQuizTitle] = useState(route.params.quizTitle);
  const sheetRef = useRef<BottomSheet>(null);
  const [modalOptionsOpen, setModalOptionsOpen] = useState(false);
  const [isRemoveFavoriteLoading, setIsRemoveFavoriteLoading] = useState(false);
  const [handleQuizId, setHandleQuizId] = useState("");
  const uid = auth.currentUser.uid;
  const [allLeaderboard, setAllLeaderboard] = useState([]);
  /* const navigation = useNavigation();*/
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
    setModalOptionsOpen(true);
  }, []);

  useEffect(() => {
    const leaderboards = firestore
      .collection("Quizzes")
      .doc(currentQuizId)
      .collection("LeaderBoard")
      .where("score", ">=", 0)
      .onSnapshot((querySnapshot) => {
        const leaderboard = [];
        querySnapshot.forEach((quiz) => {
          leaderboard.push({
            ...quiz.data(),
            key: quiz.id,
          });
          /*console.log(quiz.id);*/
        });
        setAllLeaderboard(leaderboard.reverse());
      });
    return () => leaderboards();
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
          source={require("../../assets/icons/no-results.png")}
        />
        <Text
          style={{ ...FONTS.h1, color: COLORS.primary, textAlign: "center" }}
        >
          No one has answered this quiz yet
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
          Be the first!
        </Text>

        <CustomButton2
          label="Play Quiz Now"
          colors={["#ff91b9", COLORS.secondary]}
          onPress={() => {
            navigation.navigate("PlayQuiz", {
              quizId: currentQuizId,
              quizImg: quizImg,
              quizOwner: quizOwner,
            });
          }}
          icon={require("../../assets/icons/play.png")}
        />
        {/*   </ImageBackground>*/}
      </View>
    );
  };

  return (
    <>
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
          onPress={() => {
            navigation.goBack();
          }}
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
              {quizTitle}
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
      </View>
      {/* <FlatList
          data={allLeaderboard}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item: quiz }) => (
            <>
              <View>
                <Text>{quiz.score}</Text>
              </View>
            </>
          )}
        />*/}
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ backgroundColor: COLORS.white }}
      >
        <Billboard allLeaderboard={allLeaderboard} />

        <FlatList
          data={allLeaderboard}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={EmptyListMessage}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => (
            <LineDivider
              lineStyle={{
                backgroundColor: COLORS.gray20,
                height: 2,
              }}
            />
          )}
          renderItem={({ item: quiz }) => (
            <>
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
                  elevation: 0,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  {/*Profile Image*/}
                  <View
                    style={{
                      width: SIZES.width / 7,
                      height: SIZES.width / 7,
                      justifyContent: "center",
                    }}
                  >
                    {quiz.attemptedByPhotoURL != "" ? (
                      <Image
                        source={{
                          uri: quiz.attemptedByPhotoURL,
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
                        source={{ uri: "https://i.imgur.com/IN5sYw6.png" }}
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
                  <Text
                    numberOfLines={2}
                    style={{
                      ...FONTS.h3,
                      marginLeft: SIZES.radius,
                      fontSize: quiz.attemptedBy.length < 20 ? 16 : 14,
                    }}
                  >
                    {quiz.attemptedBy}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IconLabel
                    icon={icons.star_1}
                    label={quiz.score}
                    containerStyle={{
                      marginLeft: 0,
                    }}
                    iconStyle={{
                      width: 15,
                      height: 15,
                      tintColor: COLORS.primary2,
                    }}
                    labelStyle={{
                      marginLeft: 5,
                      color: COLORS.primary2,
                      ...FONTS.h4,
                    }}
                  />
                  <Text style={{ color: COLORS.primary2 + "75", ...FONTS.h4 }}>
                    {""} / {quiz.allQuestions}
                  </Text>
                </View>
              </View>
            </>
          )}
        />
      </ScrollView>
    </>
  );
};

export default Leaderboard;
