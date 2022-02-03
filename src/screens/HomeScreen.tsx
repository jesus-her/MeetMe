import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  ImageBackground,
  ScrollView,
  FlatList,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import CustomButton2 from "../components/CustomButton2";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import HeaderSection from "../components/shared/HeaderSection";
import images from "../constants/images";
import { getQuizzes } from "../utils/database";
import VerticalCourseCard from "../components/VerticalCourseCard";
import HorizontalCourseCard from "../components/HorizontalCourseCard";
import LineDivider from "../components/LineDivider";
import { useScrollToTop } from "@react-navigation/native";
import ModalFindByQuizId from "../components/shared/ModalFindByQuizId";

const Section = ({ containerStyle, title, onPress, children }) => {
  return (
    <View
      style={{
        ...containerStyle,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: SIZES.padding,
        }}
      >
        <Text
          style={{
            flex: 1,
            ...FONTS.h2,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
        {/*<TextButton
          contentContainerStyle={{
            width: 80,
            borderRadius: 30,
            backgroundColor: COLORS.primary,
          }}
          label="See All"
          onPress={onPress}
        />*/}
      </View>
      {children}
    </View>
  );
};
// @ts-ignore
const HomeScreen = ({ navigation }) => {
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalFindByQuizIdVisible, setModalFindByQuizIdVisible] =
    useState(false);
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

    setRefreshing(false);
  };

  useEffect(() => {
    getAllQuizzes();
  }, []);

  function renderStartCreating() {
    return (
      <ImageBackground
        source={images.card}
        style={{
          alignItems: "flex-start",
          paddingVertical: SIZES.base,
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.radius,
        }}
        imageStyle={{
          borderRadius: SIZES.radius,
          resizeMode: "cover",
        }}
      >
        {/*Info*/}
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h1,
            marginHorizontal: SIZES.padding,
          }}
        >
          Let's play!
        </Text>

        <Text
          style={{
            color: COLORS.white,
            ...FONTS.body3,
            fontWeight: "bold",
            marginHorizontal: SIZES.padding,
            marginBottom: SIZES.padding,
          }}
        >
          start to create your own quiz and share it with your friends
        </Text>
        {/* <Text
          style={{
            marginTop: SIZES.radius,
            color: COLORS.white,
            ...FONTS.body4,
            marginHorizontal: SIZES.padding,
          }}
        >
          By Jesús Hernández
        </Text>*/}

        {/*Image*/}
        {/*<Image
          source={images.profile}
          style={{
            width: "90%",
            height: 110,
            marginTop: SIZES.padding,
          }}
        />*/}

        {/*Button*/}
        {/*<TextButton
              label="Start Learning"
              contentContainerStyle={{
                height: 40,
                paddingHorizontal: SIZES.padding,
                borderRadius: 20,
                backgroundColor: COLORS.white
              }}
              labelStyle={{
                color: COLORS.black,
                fontWeight: "bold"
              }}

          />*/}
        <CustomButton2
          label="Create your Quiz"
          colors={["#ff91b9", COLORS.secondary]}
          onPress={() => {
            navigation.navigate("TabCreateQuiz");
          }}
          icon={require("../../assets/icons/writing.png")}
        />
        {/*<ModalFindByQuizId
          modalFindByQuizIdVisible={modalFindByQuizIdVisible}
          setModalFindByQuizIdVisible={setModalFindByQuizIdVisible}
        />*/}
        <CustomButton2
          label="Find by Quiz ID"
          colors={["#ff91b9", COLORS.secondary]}
          onPress={() => {
            navigation.navigate("FindByQuizId");
          }}
          icon={require("../../assets/icons/lens.png")}
        />
      </ImageBackground>
    );
  }

  function renderQuizzesHorizontal() {
    return (
      <FlatList
        horizontal
        ref={ref}
        showsHorizontalScrollIndicator={false}
        data={allQuizzes}
        onRefresh={getAllQuizzes}
        refreshing={refreshing}
        listKey="Courses"
        keyExtractor={(item) => `Courses-${item.id}`}
        contentContainerStyle={{
          marginTop: SIZES.padding,
        }}
        renderItem={({ item: quiz, index }) => (
          <VerticalCourseCard
            containerStyle={{
              marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
              padding: SIZES.radius,
              marginRight: index === allQuizzes.length - 1 ? SIZES.padding : 0,
            }}
            /*course={item}*/
            quizAttempts={quiz.attemptCounter}
            quizTitle={quiz.title}
            quizId={quiz.id}
            quizImage={quiz.quizImg}
            owner={quiz.owner}
          />
        )}
      />
    );
  }

  function renderPopularQuizzes() {
    return (
      <Section
        title="Popular Quizzes"
        containerStyle={{
          marginTop: 30,
        }}
      >
        <FlatList
          data={allQuizzes}
          listKey="PopularQuizzes"
          scrollEnabled={false}
          keyExtractor={(item) => `PopularQuizzes-${item.id}`}
          contentContainerStyle={{
            marginTop: SIZES.radius,
            paddingHorizontal: SIZES.padding,
          }}
          renderItem={({ item: quiz, index }) => (
            <HorizontalCourseCard
              quizAttempts={quiz.attemptCounter}
              quizTitle={quiz.title}
              quizImage={quiz.quizImg}
              quizId={quiz.id}
              owner={quiz.owner}
              containerStyle={{
                marginTop: index === 0 ? SIZES.radius : SIZES.padding,
                marginVertical: SIZES.padding,
              }}
            />
          )}
          ItemSeparatorComponent={() => (
            <LineDivider
              lineStyle={{
                backgroundColor: COLORS.gray20,
              }}
            />
          )}
        />
      </Section>
    );
  }

  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} barStyle={"light-content"} />
      <HeaderSection
        title=""
        onPress={() => navigation.openDrawer()}
        icon={images.drawer}
        source={require("../../assets/logo/TheQuizTitle2.png")}
      />
      <View
        /*colors={[COLORS.primary, COLORS.secondary]}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 2.5, y: 0 }}*/
        style={styles.container}
      >
        <ScrollView
          ref={ref}
          contentContainerStyle={{
            paddingBottom: 150,
          }}
          showsHorizontalScrollIndicator={false}
        >
          {/*Start Creating*/}
          {renderStartCreating()}

          {/*Quizzes Horizontal*/}
          {renderQuizzesHorizontal()}

          {/*Popular Quizzes*/}
          {renderPopularQuizzes()}

          {/*<BlurView
          style={{
            width: SIZES.width / 2,
            height: SIZES.height / 3,
            borderRadius: SIZES.radius * 1.5,
          }}
          tint="dark"
          intensity={0}
        >
          <Image
            source={require("../../assets/TheQuizLogoWhiteBackground.png")}
            style={styles.logo}
          />
          <Image
            source={require("../../assets/logo/TheQuizTitle2.png")}
            style={styles.appName}
          />
        </BlurView>*/}
          {/* <View>
            <Text style={styles.title}> Let's Play! </Text>
            <Text style={styles.subtitle}> Invite your friends </Text>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton2
              label="Play Now"
              colors={["#ff91b9", COLORS.secondary]}
              onPress={() => {
                navigation.navigate("FindQuiz");
              }}
              icon={require("../../assets/HomeScreen/fire.png")}
            />
            <CustomButton2
              label="My Quiz"
              colors={["#ff91b9", COLORS.secondary]}
              onPress={() => {
                navigation.navigate("CreateQuiz");
              }}
              icon={require("../../assets/HomeScreen/forma-de-vineta.png")}
            />
          </View>*/}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    height: SIZES.height - SIZES.heightNav,
    width: SIZES.width,
    /* resizeMode: "contain",*/
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
  },
  logo: {
    resizeMode: "contain",
    width: "100%",
    height: "60%",
    borderRadius: SIZES.radius,
    overflow: "hidden",
    alignSelf: "center",
  },
  appName: {
    resizeMode: "contain",
    width: "100%",
    height: "40%",
    position: "absolute",
    bottom: 35,
    alignSelf: "center",
  },
  title: {
    ...FONTS.h1,
    color: COLORS.primary2,
    letterSpacing: 7,
    textAlign: "center",
  },
  subtitle: {
    ...FONTS.h2,
    color: COLORS.primary2,
    letterSpacing: 5,
    textAlign: "center",
  },
  buttonContainer: {
    height: SIZES.height / 4,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
export default HomeScreen;
