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
} from "react-native";
import FormButton from "../components/shared/FormButton";
import { getQuizzes } from "../utils/database";
import { COLORS, FONTS, SIZES } from "../constants";
import QuizCard from "../components/shared/QuizCard";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import HeaderSection from "../components/shared/HeaderSection";
import { BlurView } from "expo-blur";
import images from "../constants/images";
import { IconButton } from "../components/ProfileScreen";
import icons from "../constants/icons";

const FindQuizScreen = ({ navigation, route }) => {
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState("");

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
  return (
    <SafeAreaView
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
          icon={images.drawer}
          iconStyle={{
            tintColor: COLORS.white,
          }}
          containerStyle={{ marginRight: SIZES.radius }}
          onPress={() => navigation.openDrawer()}
        />

        <TextInput
          style={{
            marginLeft: SIZES.base,
            ...FONTS.h3,
            fontWeight: "bold",
            padding: 10,
            borderColor: COLORS.gray20,
            borderBottomWidth: 1,
            width: "80%",
            borderRadius: 5,
            color: COLORS.white,
          }}
          value={search}
          placeholder="Search here"
          placeholderTextColor={COLORS.gray10}
          onChangeText={(text) => searchFilter(text)}
        />
        <Image
          source={icons.search}
          style={{
            width: 25,
            height: 25,
            tintColor: COLORS.gray10,
          }}
        />
      </LinearGradient>

      {/* Quiz list */}
      <FlatList
        data={filterData}
        onRefresh={getAllQuizzes}
        refreshing={refreshing}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item: quiz }) => (
          <View
            /*colors={[COLORS.secondary, COLORS.primary2]}
                              start={{ x: 0.1, y: 0.5 }}
                              end={{ x: 1, y: 1 }}*/
            style={{
              borderRadius: SIZES.radius,
              marginVertical: 10,
              padding: SIZES.radius,
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: COLORS.primary,
              elevation: 5,
              width: "95%",
              alignSelf: "center",
              marginBottom: SIZES.padding,
            }}
          >
            <QuizCard
              currentQuizTitle={quiz.title}
              currentQuizImage={quiz.quizImg}
              owner={quiz.owner}
            />
            {/* {quiz.description != "" ? (
                <Text style={{ opacity: 0.5 }}>{quiz.description}</Text>
              ) : null}*/}
            <TouchableOpacity
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
                colors={["#ff91b9", COLORS.secondary]}
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
                  style={{ color: COLORS.white, ...FONTS.h2, letterSpacing: 5 }}
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
            </TouchableOpacity>
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
