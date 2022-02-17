/**
 *
 * Inspiration: https://dribbble.com/shots/3731362-Event-cards-iOS-interaction
 */

import * as React from "react";
import {
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("screen");
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";
import { COLORS, FONTS, icons, SIZES } from "../../../constants";
import CheckButton from "../../CheckButton";
import QuestionHeader from "../../QuestionHeader";
import { LinearGradient } from "expo-linear-gradient";
import { COL } from "../Puzzle/Config";
import images from "../../../constants/images";
import HeaderSection from "../../shared/HeaderSection";
import { useEffect, useState } from "react";
import { firestore, storage } from "../../../../firebase";
import IconLabel from "../../IconLabel";
import PlayButton from "../../shared/PlayButton";
import { Audio } from "expo-av";
import CustomButton2 from "../../CustomButton2";

// https://www.creative-flyers.com
const DATA = [
  {
    title: "Aries",
    element: "Fuego",
    iconElement: "water-outline",
    date: "21 Marzo - 19 Abril",
    poster: "https://i.imgur.com/WcH4hKh.png",
  },
  {
    title: "Tauro",
    element: "Unknown",
    iconElement: "water-outline",
    date: "Sept 3rd, 2020",
    poster: "https://i.imgur.com/MTV1XtM.png",
  },
  {
    title: "Géminis",
    element: "New York, USA",
    iconElement: "water-outline",
    date: "Oct 11th, 2020",
    poster: "https://i.imgur.com/4qqK07a.png",
  },
  {
    title: "Cáncer",
    element: "Bucharest, Romania",
    iconElement: "water-outline",
    date: "Aug 17th, 2020",
    poster: "https://i.imgur.com/CEnoMMs.png",
  },
  {
    title: "Leo",
    element: "Prague, Czech Republic",
    iconElement: "water-outline",
    date: "Sept 11th, 2020",
    poster: "https://i.imgur.com/iRNlveJ.png",
  },
  {
    title: "Virgo",
    element: "Berlin, Germany",
    iconElement: "water-sharp",
    date: "Apr 21th, 2021",
    poster: "https://i.imgur.com/bigxRWA.png",
  },
  {
    title: "Libra",
    element: "Liboa, Portugal",
    iconElement: "water-sharp",
    date: "Aug 12th, 2020",
    poster: "https://i.imgur.com/A51P2Pj.png",
  },
  {
    title: "Escorpio",
    element: "Liboa, Portugal",
    iconElement: "water-sharp",
    date: "Aug 12th, 2020",
    poster: "https://i.imgur.com/PFelhXs.png",
  },
  {
    title: "Sagitario",
    element: "Prague, Czech Republic",
    iconElement: "water-outline",
    date: "Sept 11th, 2020",
    poster: "https://i.imgur.com/q8E0LQW.png",
  },
  {
    title: "Capricornio",
    element: "Berlin, Germany",
    iconElement: "water-sharp",
    date: "Apr 21th, 2021",
    poster: "https://i.imgur.com/dK5ngSu.png",
  },
  {
    title: "Acuario",
    element: "Liboa, Portugal",
    iconElement: "water-sharp",
    date: "Aug 12th, 2020",
    poster: "https://i.imgur.com/hU2kzKV.png",
  },
  {
    title: "Piscis",
    element: "Liboa, Portugal",
    iconElement: "water-sharp",
    date: "Aug 12th, 2020",
    poster: "https://i.imgur.com/TeKhMIj.png",
  },
];

const OVERFLOW_HEIGHT = 70;
const SPACING = 0;
const ITEM_WIDTH = width * 0.7;
const VISIBLE_ITEMS = 3;

// @ts-ignore
const OverflowItems = ({ data, scrollXAnimated }) => {
  const [allPopularQuizzes, setAllPopularQuizzes] = useState([]);
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });

  //Filter for Popular Quizzes
  React.useEffect(() => {
    const popularQuizzes = firestore
      .collection("Quizzes")
      .where("attemptCounter", ">", 3)
      .onSnapshot((querySnapshot) => {
        const quizzes = [];
        querySnapshot.forEach((quiz) => {
          quizzes.push({
            ...quiz.data(),
            id: quiz.id,
          });
          /*console.log(quiz.id);*/
        });
        setAllPopularQuizzes(quizzes.reverse());
      });
    return () => popularQuizzes();
  }, []);
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {allPopularQuizzes.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={[styles.title]} numberOfLines={1}>
                {item.title}
              </Text>

              <View style={styles.itemContainerRow}>
                <IconLabel
                  icon={icons.profile}
                  label={item.owner}
                  labelStyle={{
                    color: COLORS.primary2,
                    fontWeight: "bold",
                    fontSize: item.owner.length < 10 ? 16 : 12,
                  }}
                  iconStyle={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.primary2,
                  }}
                  containerStyle={{
                    marginTop: SIZES.base,
                  }}
                />

                <Text style={[styles.date]}>Quiz ID: {item.id}</Text>
              </View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

export default function StackCarousel({ navigation }) {
  const [data, setData] = React.useState(DATA);
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  const [allPopularQuizzes, setAllPopularQuizzes] = useState([]);

  const setActiveIndex = React.useCallback((activeIndex) => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  });

  React.useEffect(() => {
    if (index === data.length - VISIBLE_ITEMS - 1) {
      // get new data
      // fetch more data
      /* const newData = [...data, ...data];
      setData(newData);*/
    }
  });

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  //Filter for Popular Quizzes
  React.useEffect(() => {
    const popularQuizzes = firestore
      .collection("Quizzes")
      .where("attemptCounter", ">", 3)
      .onSnapshot((querySnapshot) => {
        const quizzes = [];
        querySnapshot.forEach((quiz) => {
          quizzes.push({
            ...quiz.data(),
            id: quiz.id,
          });
          /*console.log(quiz.id);*/
        });
        setAllPopularQuizzes(quizzes.reverse());
      });
    return () => popularQuizzes();
  }, []);
  const EmptyListMessage = () => {
    return (
      <View
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
            transform: [{ rotateY: "180deg" }],
          }}
          source={require("../../../../assets/icons/no-fire.png")}
        />
        <Text
          style={{
            ...FONTS.h1,
            color: COLORS.primary,
            textAlign: "center",
            transform: [{ rotateY: "180deg" }],
          }}
        >
          There are no popular Quizzes yet!
        </Text>

        <Text
          style={{
            color: COLORS.gray50,
            ...FONTS.h3,
            fontWeight: "bold",
            marginVertical: SIZES.padding,
            textAlign: "center",
            transform: [{ rotateY: "180deg" }],
          }}
        >
          Explore the quizzes and play your favorites to view them here!
        </Text>

        <CustomButton2
          label="Search Quizzes"
          labelStyle={{ transform: [{ rotateY: "180deg" }] }}
          colors={["#ff91b9", COLORS.secondary]}
          onPress={() => {
            navigation.navigate("NewFindScreen");
          }}
          icon={require("../../../../assets/icons/search.png")}
        />
        {/*   </ImageBackground>*/}
      </View>
    );
  };

  return (
    <FlingGestureHandler
      key="left"
      direction={Directions.LEFT}
      onHandlerStateChange={(ev) => {
        if (ev.nativeEvent.state === State.END) {
          if (index === data.length - 1) {
            return;
          }
          setActiveIndex(index + 1);
        }
      }}
    >
      <FlingGestureHandler
        key="right"
        direction={Directions.RIGHT}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === 0) {
              return;
            }
            setActiveIndex(index - 1);
          }
        }}
      >
        <SafeAreaView style={styles.container}>
          <HeaderSection
            title="Popular Quizzes"
            onPress={() => navigation.openDrawer()}
            icon={images.drawer}
          />
          <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />

          <FlatList
            data={allPopularQuizzes}
            ListEmptyComponent={EmptyListMessage}
            keyExtractor={(item) => `PopularQuizzes-${item.id}`}
            /*keyExtractor={(_, index) => String(index)}*/
            horizontal
            inverted
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center",
              padding: SPACING * 2,
            }}
            scrollEnabled={false}
            removeClippedSubviews={false}
            CellRendererComponent={({
              item,
              index,
              children,
              style,
              ...props
            }) => {
              const newStyle = [style, { zIndex: data.length - index }];

              return (
                <View style={newStyle} index={index} {...props}>
                  {children}
                </View>
              );
            }}
            renderItem={({ item: quiz, index }) => {
              const inputRange = [index - 1, index, index + 1];

              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [50, 0, -100],
              });
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 1.3],
              });
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              });

              return (
                <Animated.View
                  style={{
                    position: "absolute",
                    left: -ITEM_WIDTH / 2.5,
                    opacity,
                    transform: [
                      {
                        translateX,
                      },
                      { scale },
                    ],
                  }}
                >
                  <LinearGradient
                    colors={[COLORS.primary, COLORS.black]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      width: ITEM_WIDTH,
                      height: SIZES.height / 1.5,
                      borderRadius: SIZES.radius,
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    {quiz.quizImg != "" ? (
                      <Image
                        source={{ uri: quiz.quizImg }}
                        resizeMode="cover"
                        /*imageStyle={{ borderRadius: SIZES.radius }}*/
                        style={{
                          width: ITEM_WIDTH - SIZES.padding,
                          height: ITEM_WIDTH - SIZES.padding,
                          justifyContent: "flex-end",
                          alignItems: "center",
                          borderRadius: 500,
                          borderWidth: 5,
                          borderColor: COLORS.white,
                        }}
                      />
                    ) : (
                      <Image
                        source={require("../../../../assets/icons/laughing.png")}
                        resizeMode="cover"
                        /*imageStyle={{ borderRadius: SIZES.radius }}*/
                        style={{
                          width: ITEM_WIDTH - SIZES.padding,
                          height: ITEM_WIDTH - SIZES.padding,
                          justifyContent: "flex-end",
                          alignItems: "center",
                          borderRadius: 500,
                          borderWidth: 5,
                          borderColor: COLORS.white,
                          tintColor: COLORS.white,
                        }}
                      />
                    )}
                    <View style={{ width: "85%" }}>
                      <PlayButton
                        label="Play"
                        handleOnPress={() => {
                          navigation.navigate("PlayQuiz", {
                            quizId: quiz.id,
                            quizImg: quiz.quizImg,
                            quizOwner: quiz.owner,
                          });
                        }}
                      />
                      {/*Attempts*/}
                      <IconLabel
                        icon={icons.solve}
                        label={"Attempted times: " + quiz.attemptCounter}
                        containerStyle={{
                          marginLeft: 0,
                          alignSelf: "center",
                        }}
                        iconStyle={{
                          width: 15,
                          height: 15,
                          tintColor: COLORS.primary3,
                        }}
                        labelStyle={{
                          marginLeft: 5,
                          color: COLORS.white,
                          ...FONTS.h4,
                        }}
                      />
                    </View>
                  </LinearGradient>
                </Animated.View>
              );
            }}
          />
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    height: SIZES.heightPlayScreen,
    backgroundColor: "#fff",
  },
  title: {
    ...FONTS.h1,
    textTransform: "uppercase",
    letterSpacing: -1,
  },
  location: {
    fontSize: 16,
  },
  date: {
    ...FONTS.h3,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    paddingVertical: SPACING * 2,
    paddingHorizontal: SIZES.padding,
  },
  itemContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: "hidden",
    marginBottom: SIZES.padding,
  },
});
