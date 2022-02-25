/**
 * Inspiration: https://dribbble.com/shots/8257559-Movie-2-0
 *
 */
import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  Platform,
} from "react-native";

const { width, height } = Dimensions.get("window");
import { getMovies } from "./api";
import Genres from "./Genres";
import Rating from "./Raiting";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS, icons, SIZES } from "../../../constants";
import CheckButton from "../../CheckButton";
import QuestionHeader from "../../QuestionHeader";
import IconLabel from "../../IconLabel";
import LeaderboardLoader from "../../LeaderboardLoader";

const SPACING = 10;
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.33 : width * 0.33;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);

const Backdrop = ({ movies, scrollX }) => {
  return (
    <View
      style={{
        height: SIZES.heightPlayScreen / 2,
        width,
        position: "absolute",
      }}
    >
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", COLORS.white]}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 0.5, y: 1.5 }}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: "absolute",
          bottom: 0,
        }}
      />
    </View>
  );
};

export default function Billboard({ allLeaderboard }) {
  const [movies, setMovies] = React.useState([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      // Add empty items to create fake space
      // [empty_item, ...movies, empty_item]
      setMovies([{ key: "empty-left" }, ...movies, { key: "empty-right" }]);
    };

    if (allLeaderboard.length === 0) {
      fetchData(movies);
    }
  }, [movies]);

  if (allLeaderboard.length === 0) {
    return <LeaderboardLoader />;
  }

  return (
    <View style={styles.container}>
      <Backdrop movies={allLeaderboard} scrollX={scrollX} />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        data={allLeaderboard.slice(0, 3)}
        maxToRenderPerBatch={3}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: "center" }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item: quiz, index }) => {
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [75, 150, 75],
            extrapolate: "clamp",
          });

          if (quiz.score > 0) {
            return (
              <View
                style={{
                  width: ITEM_SIZE,
                  paddingVertical: SIZES.padding,
                }}
              >
                <Animated.View
                  style={{
                    marginHorizontal: SPACING,
                    padding: SPACING,
                    alignItems: "center",
                    transform: [{ translateY }],
                    backgroundColor: "white",
                    borderRadius: SIZES.radius * 2,
                    marginBottom: 250,
                  }}
                >
                  <IconLabel
                    icon={icons.king}
                    iconStyle={{
                      width: SIZES.width / 9,
                      height: SIZES.width / 9,
                      alignSelf: "center",
                    }}
                    containerStyle={{
                      position: "absolute",
                      top: -35,

                      flexDirection: "column",
                    }}
                  />
                  {quiz.attemptedByPhotoURL != "" ? (
                    <Image
                      source={{ uri: quiz.attemptedByPhotoURL }}
                      style={styles.posterImage}
                    />
                  ) : (
                    <Image
                      source={{ uri: "https://i.imgur.com/IN5sYw6.png" }}
                      style={styles.posterImage}
                    />
                  )}

                  <Text
                    style={{
                      ...FONTS.h3,
                      marginLeft: SIZES.radius,
                      fontSize: quiz.attemptedBy.length < 20 ? 16 : 9,
                      textAlign: "center",
                    }}
                    numberOfLines={2}
                  >
                    {quiz.attemptedBy}
                  </Text>
                  {/*<Rating rating={item.rating} />
                <Genres genres={item.genres} />*/}
                  <IconLabel
                    icon={icons.star}
                    label={quiz.score}
                    containerStyle={{
                      marginLeft: 0,
                    }}
                    iconStyle={{
                      width: 15,
                      height: 15,
                      tintColor: COLORS.secondary,
                    }}
                    labelStyle={{
                      marginLeft: 5,
                      color: COLORS.secondary,
                      ...FONTS.h4,
                    }}
                  />
                  {/*  <Text style={{ ...FONTS.h4, color: COLORS.secondary }}>
                  {quiz.score}
                </Text>*/}
                </Animated.View>
              </View>
            );
          } else null;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    height: SIZES.heightPlayScreen / 2,
    width: SIZES.width,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    height: SIZES.heightPlayScreen / 2,
    width: SIZES.width,
    backgroundColor: COLORS.secondary,
  },
  paragraph: {
    ...FONTS.h4,
    textAlign: "center",
  },
  posterImage: {
    width: ITEM_SIZE / 1.5,
    height: ITEM_SIZE / 1.5,
    resizeMode: "cover",
    borderRadius: 100,
    margin: 0,
    marginBottom: 5,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
});
