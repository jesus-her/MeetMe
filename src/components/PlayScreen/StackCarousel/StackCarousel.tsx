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
} from "react-native";

const { width } = Dimensions.get("screen");
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";
import { COLORS, SIZES } from "../../../constants";
import CheckButton from "../../CheckButton";
import QuestionHeader from "../../QuestionHeader";
import { LinearGradient } from "expo-linear-gradient";
import { COL } from "../Puzzle/Config";

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
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={[styles.title]} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text style={[styles.location]}>
                  Elemento: {item.element}
                  <Ionicons
                    name={item.iconElement}
                    size={16}
                    color="black"
                    style={{ marginRight: 5 }}
                  />
                </Text>
                <Text style={[styles.date]}>{item.date}</Text>
              </View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

export default function StackCarousel() {
  const [data, setData] = React.useState(DATA);
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
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
          <QuestionHeader
            label="¿Qué signo soy?"
            colors={[COLORS.primary, COLORS.secondary2]}
            textColor="white"
          />
          <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />

          <FlatList
            data={data}
            keyExtractor={(_, index) => String(index)}
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
            renderItem={({ item, index }) => {
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
                      height: SIZES.height / 1.6,
                      borderRadius: SIZES.radius,
                    }}
                  >
                    <ImageBackground
                      source={{ uri: item.poster }}
                      resizeMode="contain"
                      /*imageStyle={{ borderRadius: SIZES.radius }}*/
                      style={{
                        width: ITEM_WIDTH,
                        height: SIZES.height / 1.65,
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <CheckButton />
                    </ImageBackground>
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
    padding: SIZES.padding,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: -1,
  },
  location: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
  },
  itemContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: "hidden",
    marginTop: 5,
  },
});
