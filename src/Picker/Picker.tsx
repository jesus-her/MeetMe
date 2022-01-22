/**
 * Inspiration: https://dribbble.com/shots/3431451-HUNGRY
 */
import * as React from "react";
import {
  TouchableOpacity,
  Alert,
  StatusBar,
  Dimensions,
  Animated,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

import data from "./data";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import HeaderSection from "../components/shared/HeaderSection";

const ICON_SIZE = 42;
const ITEM_HEIGHT = ICON_SIZE * 2;
const colors = {
  orange: COLORS.secondary,
  white: "#fff",
};
const { width, height } = Dimensions.get("window");

const Icon = React.memo(({ icon, color }) => {
  return <SimpleLineIcons name={icon} color={color} size={ICON_SIZE} />;
});

const Item = React.memo(({ icon, color, name, showText }) => {
  return (
    <View style={styles.itemWrapper}>
      {showText ? (
        <Text style={[styles.itemText, { color }]}>{name}</Text>
      ) : (
        // for spacing purposes
        <View />
      )}
      <Icon icon={icon} color={color} />
    </View>
  );
});

const ConnectWithText = React.memo(() => {
  return (
    <View
      style={{
        position: "absolute",
        top: SIZES.heightPlayScreen / 2 - ITEM_HEIGHT * 2,
        width: width * 0.7,
        paddingHorizontal: 14,
      }}
    >
      <Text
        style={{
          color: COLORS.secondary,
          ...FONTS.largeTitle,
          lineHeight: 52,
          letterSpacing: 3,
        }}
      >
        Connect with...
      </Text>
    </View>
  );
});

const ConnectButton = React.memo(({ onPress }) => {
  return (
    <View
      style={{
        position: "absolute",
        top: SIZES.heightPlayScreen / 3 + ITEM_HEIGHT,
        paddingHorizontal: 14,
      }}
    >
      <View
        style={{
          height: ITEM_HEIGHT * 2,
          width: 4,
          backgroundColor: COLORS.primary,
        }}
      />
      <TouchableOpacity
        onPress={onPress}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 12,
          backgroundColor: COLORS.primary,
          alignItems: "center",
          justifyContent: "center",
        }}
        activeOpacity={0.8}
      >
        <Text style={{ ...FONTS.h1, color: colors.white }}>Done!</Text>
      </TouchableOpacity>
    </View>
  );
});

const List = React.memo(
  React.forwardRef(
    ({ color, showText, style, onScroll, onItemIndexChange }, ref) => {
      return (
        <Animated.FlatList
          ref={ref}
          data={data}
          style={style}
          keyExtractor={(item) => `${item.name}-${item.icon}`}
          bounces={false}
          scrollEnabled={!showText}
          scrollEventThrottle={16}
          onScroll={onScroll}
          decelerationRate="fast"
          snapToInterval={ITEM_HEIGHT}
          showsVerticalScrollIndicator={false}
          renderToHardwareTextureAndroid
          contentContainerStyle={{
            paddingTop: showText
              ? 0
              : SIZES.heightPlayScreen / 2 - ITEM_HEIGHT / 2,
            paddingBottom: showText
              ? 0
              : SIZES.heightPlayScreen / 2 - ITEM_HEIGHT / 2,
            paddingHorizontal: 20,
          }}
          renderItem={({ item }) => {
            return <Item {...item} color={color} showText={showText} />;
          }}
          onMomentumScrollEnd={(ev) => {
            const newIndex = Math.round(
              ev.nativeEvent.contentOffset.y / ITEM_HEIGHT
            );

            if (onItemIndexChange) {
              onItemIndexChange(newIndex);
            }
          }}
        />
      );
    }
  )
);
export default function Picker(props) {
  const [index, setIndex] = React.useState(0);
  const onConnectPress = React.useCallback(() => {
    Alert.alert("Connect with:", data[index].name.toUpperCase());
  }, [index]);
  const yellowRef = React.useRef();
  const darkRef = React.useRef();
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );
  const onItemIndexChange = React.useCallback(setIndex, []);
  React.useEffect(() => {
    scrollY.addListener((v) => {
      if (darkRef?.current) {
        darkRef.current.scrollToOffset({
          offset: v.value,
          animated: false,
        });
      }
    });
  });

  // @ts-ignore
  return (
    <>
      <HeaderSection
        title="Share"
        onPress={() => props.navigation.goBack()}
        icon={icons.back}
      />

      <View style={styles.container}>
        <ConnectWithText />
        <List
          ref={yellowRef}
          color={COLORS.primary2}
          style={StyleSheet.absoluteFillObject}
          onScroll={onScroll}
          onItemIndexChange={onItemIndexChange}
        />
        <List
          ref={darkRef}
          color={colors.white}
          showText
          style={{
            position: "absolute",
            backgroundColor: COLORS.primary,
            width,
            height: ITEM_HEIGHT,
            top: SIZES.heightPlayScreen / 2 - ITEM_HEIGHT / 2,
          }}
        />
        <ConnectButton onPress={onConnectPress} />
        <Item />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SIZES.heightPlayScreen,
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  itemWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: ITEM_HEIGHT,
  },
  itemText: {
    fontSize: 26,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
