import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Animated,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../../../constants";
import songs from "./data";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import CheckButton from "../../CheckButton";
import QuestionHeader from "../../QuestionHeader";

const MusicPlayer = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [songIndex, setSongIndex] = useState(0);
  const songSlider = useRef(null);

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      const index = Math.round(value / SIZES.width);
      setSongIndex(index);
    });
    return () => {
      scrollX.removeAllListeners();
    };
  }, []);

  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * SIZES.width,
    });
  };
  const skipToPrevious = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * SIZES.width,
    });
  };

  const renderSongs = ({ item, index }) => {
    return (
      <Animated.View
        style={{
          width: SIZES.width,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.artworkWrapper}>
          <Image
            source={item.image}
            resizeMode="contain"
            style={styles.artworkAlbum}
          />
        </View>
      </Animated.View>
    );
  };

  return (
    <ImageBackground
      source={songs[songIndex].image}
      style={styles.container}
      blurRadius={10}
    >
      <View
        style={{
          height: SIZES.heightPlayScreen,
          width: SIZES.width,
          backgroundColor: "#000",
          position: "absolute",
          opacity: 0.5,
        }}
      />
      <View style={styles.mainContainer}>
        <QuestionHeader
          label="¿Mi canción favorita?"
          colors={[COLORS.secondary, COLORS.secondary2]}
          textColor={COLORS.white}
        />
        <Animated.FlatList
          ref={songSlider}
          data={songs}
          renderItem={renderSongs}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x: scrollX },
                },
              },
            ],
            { useNativeDriver: true }
          )}
        />

        <View>
          <Text style={styles.title}>{songs[songIndex].title}</Text>
          <Text style={styles.artist}>{songs[songIndex].artist}</Text>
        </View>
        <View>
          <Slider
            style={styles.progressContainer}
            value={30}
            minimumValue={0}
            maximumValue={100}
            thumbTintColor="#F72585"
            minimumTrackTintColor="#F72585"
            maximumTrackTintColor="white"
            onSlidingComplete={() => {}}
          />
          <View style={styles.progressLabelContainer}>
            <Text style={styles.progressLabelText}>0:00</Text>
            <Text style={styles.progressLabelText}>3:33</Text>
          </View>
        </View>
        <View style={styles.musicControls}>
          <TouchableOpacity onPress={skipToPrevious}>
            <Ionicons name="play-skip-back" size={35} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ios-play-circle-outline" size={75} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipToNext}>
            <Ionicons name="play-skip-forward" size={35} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <CheckButton />
      </View>
    </ImageBackground>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    height: SIZES.heightPlayScreen,
    width: SIZES.width,
    backgroundColor: "#000",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: SIZES.padding,
  },
  artworkWrapper: {
    width: SIZES.heightPlayScreen / 2.5,
    height: SIZES.heightPlayScreen / 2.5,
    /*shadowColor: "#fff",
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1.2,
        elevation: 15,*/
  },
  artworkAlbum: {
    width: "100%",
    height: "100%",
  },
  title: {
    color: "#fff",
    ...FONTS.h2,
    textAlign: "center",
  },
  artist: {
    ...FONTS.h3,
    textAlign: "center",
    fontWeight: "200",
    color: "#fff",
  },
  progressContainer: {
    width: 350,
    height: 40,
    marginTop: 0,
    flexDirection: "row",
  },
  progressLabelContainer: {
    width: 350,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.padding,
  },
  progressLabelText: {
    color: "white",
  },
  musicControls: {
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 0,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: "#fff",
    width: SIZES.width,
    alignItems: "center",
  },
});
