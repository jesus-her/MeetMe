import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableHighlight,
  Image,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import FormButton from "../components/shared/FormButton";
import { getQuizzes } from "../utils/database";
import { COLORS, FONTS, SIZES } from "../constants";
import QuizCard from "../components/shared/QuizCard";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import HeaderSection from "../components/shared/HeaderSection";
import { BlurView } from "expo-blur";
import images from "../constants/images";
import { IconButton } from "../components/ProfileScreen";
import icons from "../constants/icons";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import SearchBar from "react-native-searchbar";
import { Searchbar } from "react-native-paper";

const ByQuizId = ({ navigation, route }) => {
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState("");
  const [searchBar, setSearchBar] = useState(false);

  const ref = React.useRef(null);
  useScrollToTop(ref);

  /*const [currentQuizImage, setCurrentQuizImage] = useState(
        route.params.currentQuizImage
      );*/

  const getAllQuizzes = async () => {
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
  }, []);

  //Search filter
  const searchFilter = (text) => {
    if (text) {
      const newData = allQuizzes.filter((item) => {
        const itemData = item.id ? item.id.toUpperCase() : "".toUpperCase();
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

  //Use
  /* useEffect(() => {
      navigation.setOptions({
        headerLargeTitle: true,
        headerTitle: "Finddd",
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Stack")}
            style={{
              backgroundColor: "purple",
              width: 30,
              height: 30,
              borderRadius: 10,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                color: "white",
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        ),
        headerSearchBarOptions: {
          placeholder: "Friends",
        },
      });
    }, [navigation]);*/
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        position: "relative",
      }}
    >
      <StatusBar backgroundColor={COLORS.primary} barStyle={"light-content"} />
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
          icon={icons.back}
          iconStyle={{
            tintColor: COLORS.white,
          }}
          containerStyle={{ marginRight: SIZES.radius }}
          onPress={() => navigation.goBack()}
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
      <LinearGradient
        colors={[COLORS.primary2, COLORS.primary]}
        start={{ x: 1, y: 0.1 }}
        end={{ x: 1, y: 1 }}
        style={{
          backgroundColor: "red",
          justifyContent: "space-around",
          alignItems: "center",
          height: SIZES.heightPlayScreen,
        }}
      >
        <Searchbar
          icon={() => <FontAwesome name="qrcode" size={30} color="white" />}
          selectionColor={COLORS.primary3}
          keyboardType="number-pad"
          theme={{ colors: { text: COLORS.white, accent: "yellow" } }}
          style={{
            backgroundColor: COLORS.primary,
            marginHorizontal: SIZES.base,
            ...FONTS.h3,
            fontWeight: "bold",
            paddingHorizontal: 10,
            width: "90%",
            height: SIZES.heightNav,
            borderRadius: 50,

            position: "absolute",
            top: SIZES.heightPlayScreen / 5,
            zIndex: 10,
          }}
          value={search}
          placeholder="Search by Quiz ID"
          placeholderTextColor={COLORS.gray20}
          onChangeText={(text) => searchFilter(text)}
        />

        {search != "" ? (
          <FlatList
            data={filterData}
            pagingEnabled={true}
            ref={ref}
            horizontal
            onRefresh={getAllQuizzes}
            refreshing={refreshing}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item: quiz }) => (
              <View
                style={{
                  borderRadius: SIZES.radius,
                  marginVertical: 10,
                  padding: SIZES.radius,
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "transparent",
                  elevation: 0,
                  width: SIZES.width,
                  alignSelf: "center",
                  marginBottom: SIZES.padding,
                }}
              >
                <QuizCard
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
                    backgroundColor: COLORS.secondary,
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
                    colors={["#fff", COLORS.white]}
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
                    <Text
                      style={{
                        color: COLORS.primary,
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
                        color: COLORS.secondary,
                        position: "absolute",
                        right: SIZES.padding,
                      }}
                    />
                  </LinearGradient>
                </TouchableHighlight>
              </View>
            )}
          />
        ) : (
          <View
            style={{
              borderRadius: SIZES.radius,
              marginVertical: 10,
              padding: SIZES.radius,
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "transparent",
              elevation: 0,
              width: SIZES.width,
              alignSelf: "center",
              marginBottom: SIZES.padding,
            }}
          >
            <Text
              style={{
                ...FONTS.h1,
                color: COLORS.white,
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              Enter a Quiz ID to find any Quiz
            </Text>
            <Image
              style={{
                marginTop: SIZES.padding,
                width: SIZES.heightPlayScreen / 5,
                height: SIZES.heightPlayScreen / 5,
                tintColor: COLORS.black,
              }}
              source={require("../../assets/icons/codigo-qr.png")}
            />
            {/* <LinearGradient
              colors={[COLORS.primary, COLORS.primary2]}
              start={{ x: 0.1, y: 0.5 }}
              end={{ x: 1, y: 1 }}
              style={{
                flexDirection: "row",
                paddingVertical: 20,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary2,
                paddingHorizontal: SIZES.radius,
                marginVertical: SIZES.base,
                width: "100%",
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.white,
                  textAlign: "center",
                  position: "absolute",
                  top: 5,
                  left: 0,
                  right: 0,
                  alignSelf: "center",
                }}
              >
                *Quiz Card Preview
              </Text>
              Profile Image
              <View
                style={{
                  width: 90,
                  height: 90,
                }}
              >
                <Image
                  source={require("../../assets/icons/laughing.png")}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 45,
                    borderWidth: 2,
                    borderColor: COLORS.black,
                    tintColor: COLORS.white,
                    alignSelf: "center",
                  }}
                />
              </View>
               Details
              <View
                style={{
                  flex: 1,
                  marginLeft: SIZES.radius,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    ...FONTS.h2,
                    color: COLORS.primary,
                    textAlign: "left",
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius,
                    paddingHorizontal: SIZES.base,
                  }}
                >
                  "Your title" Quiz
                </Text>
                <View
                  style={{
                    width: "100%",
                    height: 6,
                    backgroundColor: COLORS.primary,
                    marginTop: SIZES.padding / 2,
                  }}
                />
                <View
                  style={{
                    width: "80%",
                    height: 5,
                    backgroundColor: COLORS.primary,
                    marginTop: SIZES.base,
                  }}
                />
              </View>
            </LinearGradient>
            <TouchableWithoutFeedback
              style={{
                borderRadius: 50,
                backgroundColor: COLORS.secondary,
                width: "100%",
              }}
            >
              <LinearGradient
                colors={["#fff", COLORS.white]}
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
                <Text
                  style={{
                    color: COLORS.primary,
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
                    color: COLORS.secondary,
                    position: "absolute",
                    right: SIZES.padding,
                  }}
                />
              </LinearGradient>
            </TouchableWithoutFeedback>*/}
          </View>
        )}
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default ByQuizId;
