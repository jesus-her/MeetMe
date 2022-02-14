import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  TouchableHighlight,
  KeyboardAvoidingView,
} from "react-native";
import FormButton from "../components/shared/FormButton";
import {
  getQuestionsByQuizId,
  getQuizById,
  getQuizzes,
  getUserQuizzes,
} from "../utils/database";
import { COLORS, FONTS, SIZES } from "../constants";
import QuizCard from "../components/shared/QuizCard";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import HeaderSection from "../components/shared/HeaderSection";
import { BlurView } from "expo-blur";
import images from "../constants/images";
import { IconButton } from "../components/ProfileScreen";
import icons from "../constants/icons";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import SearchBar from "react-native-searchbar";
import { Searchbar } from "react-native-paper";
import { auth, firestore, storage } from "../../firebase";
import IconLabel from "../components/IconLabel";
import { Audio } from "expo-av";

const FindQuizScreen = ({ navigation, route }) => {
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState("");

  /*  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const userId = auth.currentUser.uid;*/
  const ref = React.useRef(null);
  useScrollToTop(ref);

  /*const getAllQuizzes = async () => {
      setRefreshing(true);
      const quizzes = await getQuizzes();

      // Transform quiz data
      let tempQuizzes = [];
      await quizzes.docs.forEach(async (quiz) => {
        await tempQuizzes.push({ id: quiz.id, ...quiz.data() });
      });
      await setAllQuizzes([...tempQuizzes]);
      setFilterData([...tempQuizzes]);

      setRefreshing(false);
    };

    useEffect(() => {
      getAllQuizzes();
    }, []);*/

  useEffect(() => {
    const getAllQuizzes = firestore
      .collection("Quizzes")
      .onSnapshot((querySnapshot) => {
        const quizzes = [];
        querySnapshot.forEach((quiz) => {
          quizzes.push({
            ...quiz.data(),
            id: quiz.id,
          });
          /*console.log(quiz.id);*/
        });
        setAllQuizzes(quizzes);
        setFilterData(quizzes);
      });
    return () => getAllQuizzes();
  }, []);

  //Search filter
  const searchFilter = (text) => {
    if (text) {
      const newData = allQuizzes.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(allQuizzes);
      setSearch(text);
    }
  };

  const EmptyListMessage = () => {
    return (
      <KeyboardAvoidingView
        style={{
          width: SIZES.width,
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
          No Result Found
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
          We can't find any Quiz with that Quiz name.
        </Text>
      </KeyboardAvoidingView>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        position: "relative",
      }}
    >
      <StatusBar backgroundColor={COLORS.primary} barStyle={"light-content"} />
      {/*Find by Quiz Id*/}
      <TouchableHighlight
        style={{
          borderRadius: 50,
          backgroundColor: COLORS.secondary,
          width: 55,
          height: 55,
          position: "absolute",
          bottom: SIZES.radius,
          right: SIZES.radius,
          zIndex: 10,
          elevation: 3,
        }}
        onPress={() => {
          navigation.navigate("FindByQuizId");
        }}
      >
        <LinearGradient
          colors={[COLORS.primary3, COLORS.primary2]}
          start={{ x: 1, y: 0.1 }}
          end={{ x: 1, y: 0.75 }}
          style={{
            width: 55,
            height: 55,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            position: "relative",
          }}
        >
          <FontAwesome name="qrcode" size={30} color={COLORS.white} />
        </LinearGradient>
      </TouchableHighlight>

      {/*Header*/}
      <LinearGradient
        colors={[COLORS.primary, COLORS.primary2]}
        start={{ x: 1, y: 0.1 }}
        end={{ x: 1, y: 1 }}
        style={{
          flexDirection: "row",
          paddingHorizontal: SIZES.padding,
          justifyContent: "flex-start",
          alignItems: "center",
          height: SIZES.heightNav,
          position: "relative",
          backgroundColor: COLORS.white,
          elevation: 7,
          width: "100%",
        }}
      >
        <IconButton
          icon={images.drawer}
          iconStyle={{
            tintColor: COLORS.white,
          }}
          containerStyle={{ marginRight: SIZES.radius }}
          onPress={() => navigation.openDrawer()}
        />

        {/*Search Bar*/}
        <Searchbar
          style={{
            marginHorizontal: SIZES.base,
            ...FONTS.h3,
            fontWeight: "bold",
            paddingHorizontal: 10,
            width: "90%",
            height: "55%",
            borderRadius: 50,
            color: COLORS.white,
          }}
          value={search}
          placeholder="Search here"
          placeholderTextColor={COLORS.gray50}
          onChangeText={(text) => searchFilter(text)}
        />

        {/*<Image
          source={icons.search}
          style={{
            width: 25,
            height: 25,
            tintColor: COLORS.gray10,
          }}
        />*/}
      </LinearGradient>

      {/* Quiz list */}
      <FlatList
        data={filterData}
        ref={ref}
        ListEmptyComponent={EmptyListMessage}
        showsVerticalScrollIndicator={false}
        /*onRefresh={getAllQuizzes}*/
        refreshing={refreshing}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item: quiz }) => (
          <View
            style={{
              marginVertical: 20,
              padding: SIZES.radius,
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: COLORS.white,
              elevation: 5,
              width: "100%",
              alignSelf: "center",
              marginBottom: SIZES.base,
            }}
          >
            <QuizCard
              sound={quiz.sound}
              currentAudioId={quiz.currentAudioId}
              currentQuizTitle={quiz.title}
              currentQuizImage={quiz.quizImg}
              owner={quiz.owner}
              QuizID={quiz.currentQuizId}
            />
            {/* {quiz.description != "" ? (
                <Text style={{ opacity: 0.5 }}>{quiz.description}</Text>
              ) : null}*/}
            <TouchableHighlight
              style={{
                borderRadius: 50,
                width: "100%",
              }}
              onPress={() => {
                navigation.navigate("PlayQuiz", {
                  quizId: quiz.id,
                  quizImg: quiz.quizImg,
                  quizOwner: quiz.owner,
                }),
                  setSearch("");
                setFilterData(allQuizzes);
              }}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.primary]}
                start={{ x: 1, y: 0.1 }}
                end={{ x: 1, y: 0.75 }}
                style={{
                  width: "100%",
                  paddingVertical: 5,
                  paddingHorizontal: SIZES.padding,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  position: "relative",
                }}
              >
                <View
                  style={{
                    width: "30%",
                    height: "100%",
                    flexDirection: "row",
                    position: "absolute",
                    left: SIZES.padding,
                  }}
                >
                  <IconLabel
                    icon={icons.solve}
                    label={quiz.attemptCounter}
                    iconStyle={{
                      width: 15,
                      height: 15,
                      tintColor: COLORS.white,
                    }}
                    labelStyle={{
                      marginLeft: 5,
                      color: COLORS.white,
                      ...FONTS.h4,
                    }}
                  />
                </View>

                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.h2,
                    letterSpacing: 5,
                  }}
                >
                  Play
                </Text>

                <Ionicons
                  name="play"
                  size={22}
                  style={{
                    alignSelf: "center",
                    color: COLORS.white,
                    position: "absolute",
                    right: SIZES.padding,
                  }}
                />
              </LinearGradient>
            </TouchableHighlight>
          </View>
        )}
      />

      {/* Button */}
      {/* <FormButton
        labelText="Create Quiz"
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          borderRadius: 50,
          paddingHorizontal: 30,
        }}
        handleOnPress={() => navigation.navigate("CreateQuizScreen")}
      />*/}
    </SafeAreaView>
  );
};

export default FindQuizScreen;
