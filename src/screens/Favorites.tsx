import React, { useCallback, useEffect, useRef, useState } from "react";
import Quiz from "../components/MyQuiz/Quiz";
import {
  Alert,
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
import QuizCard from "../components/shared/QuizCard";
import { LinearGradient } from "expo-linear-gradient";
import Swipeout from "react-native-swipeout";
import {
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { getQuizzes } from "../utils/database";
import HeaderSection from "../components/shared/HeaderSection";
import { COL } from "../components/PlayScreen/Puzzle/Config";
import images from "../constants/images";
import CustomButton2 from "../components/CustomButton2";
import ModalFindByQuizId from "../components/shared/ModalFindByQuizId";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import ModalOptions from "../components/MyQuizzes/ModalOptions";
import IconLabel from "../components/IconLabel";
import ModalFavoritesOptions from "../components/modals/ModalFavoritesOptions";
import QuizDelete from "../components/QuizDelete.";
import RemoveFavorite from "../components/RemoveFavorite";

const Favorites = ({ navigation }) => {
  const [favoriteQuizzes, setFavoriteQuizzes] = useState([]);

  const sheetRef = useRef<BottomSheet>(null);
  const [modalOptionsOpen, setModalOptionsOpen] = useState(false);
  const [isRemoveFavoriteLoading, setIsRemoveFavoriteLoading] = useState(false);
  const [handleQuizId, setHandleQuizId] = useState("");
  const uid = auth.currentUser.uid;

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
    setModalOptionsOpen(true);
  }, []);

  useEffect(() => {
    const favoriteQuizzes = firestore
      .collection("Quizzes")
      .where("isFavorite", "==", true)
      .onSnapshot((querySnapshot) => {
        const quizzes = [];
        querySnapshot.forEach((quiz) => {
          quizzes.push({
            ...quiz.data(),
            key: quiz.id,
          });
          /*console.log(quiz.id);*/
        });
        setFavoriteQuizzes(quizzes);
      });
    return () => favoriteQuizzes();
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
          source={require("../../assets/icons/broken-heart.png")}
        />
        <Text
          style={{ ...FONTS.h1, color: COLORS.primary, textAlign: "center" }}
        >
          You do not have any favorite Quiz added!
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
          Explore the quizzes and add your favorites to view them here!
        </Text>

        <CustomButton2
          label="Go home"
          colors={["#ff91b9", COLORS.secondary]}
          onPress={() => {
            navigation.navigate("Home");
          }}
          icon={require("../../assets/icons/home.png")}
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
          title="Global favorites"
          onPress={() => navigation.goBack()}
          icon={icons.back}
        />

        <FlatList
          data={favoriteQuizzes}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={EmptyListMessage}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item: quiz }) => (
            <>
              <Swipeout
                backgroundColor="transparent"
                autoClose={true}
                right={[
                  {
                    onPress: () =>
                      Alert.alert(
                        "Remove favorite Quiz",
                        "Are you sure to remove Quiz from your favorites?",
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                          },
                          {
                            text: "Yes",
                            onPress: () => {
                              setIsRemoveFavoriteLoading(true);
                              firestore
                                .collection("Quizzes")
                                .doc(quiz.currentQuizId)
                                .update({ isFavorite: false })
                                .then(() => {
                                  ToastAndroid.show(
                                    "Remove from your favorites!",
                                    ToastAndroid.SHORT
                                  );
                                  setIsRemoveFavoriteLoading(false);
                                })
                                .catch((e) => {
                                  console.log("error", e);
                                  setIsRemoveFavoriteLoading(false);
                                });
                            },
                          },
                        ]
                      ),

                    text: "Remove",
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
                        <Image
                          style={{
                            width: 55,
                            height: 55,
                            tintColor: COLORS.white,
                            alignSelf: "center",
                          }}
                          source={require("../../assets/icons/broken-heart.png")}
                        />
                        {/*<MaterialCommunityIcons
                        name="delete-forever"
                        color={COLORS.white}
                        size={35}
                        style={{
                          alignSelf: "center",
                          justifyContent: "center",
                        }}
                      />*/}
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
                  {/*Modal Options*/}
                  <ModalFavoritesOptions
                    isRemoveFavoriteLoading={isRemoveFavoriteLoading}
                    setIsRemoveFavoriteLoading={setIsRemoveFavoriteLoading}
                    modalOptionsOpen={modalOptionsOpen}
                    setModalOptionsOpen={setModalOptionsOpen}
                    currentQuizId={handleQuizId}
                  />
                </View>
              </Swipeout>
            </>
          )}
        />
      </View>
      {isRemoveFavoriteLoading ? <QuizDelete /> : null}
    </>
  );
};

export default Favorites;
