import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#ff6f16", // Yellow
  primary2: "#ff6f16", // Orange
  primary3: "#990000", // Dark Red
  secondary: "#00ffa6", // Red
  gray10: "#E5E5E5",
  gray20: "#CCCCCC",
  gray30: "#A1A1A1",
  gray40: "#999999",
  gray50: "#7F7F7F",
  gray60: "#666666",
  gray70: "#4C4C4C",
  gray80: "#333333",

  additionalColor4: "#C3C3C3",
  additionalColor9: "#F3F3F3",
  additionalColor11: "rgba(251,179,68,0.1)",
  additionalColor13: "#EBF3EF",

  white: "#FFFFFF",
  black: "#000000",

  transparent: "transparent",
  transparentWhite1: "rgba(255, 255, 255, 0.1)",
  transparentBlack1: "rgba(0, 0, 0, 0.1)",
  transparentBlack7: "rgba(0, 0, 0, 0.7)",
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  largeTitle: { fontFamily: "Roboto-Black", fontSize: SIZES.largeTitle },
  h1: { fontSize: SIZES.h1, fontWeight: "bold" },
  h2: { fontSize: SIZES.h2, fontWeight: "bold", lineHeight: 30 },
  h3: { fontSize: SIZES.h3, fontWeight: "bold", lineHeight: 22 },
  h4: { fontSize: SIZES.h4, fontWeight: "bold", lineHeight: 22 },
  h5: { fontSize: SIZES.h5, fontWeight: "bold", lineHeight: 22 },
  body1: { fontSize: SIZES.body1, fontWeight: "normal", lineHeight: 36 },
  body2: { fontSize: SIZES.body2, fontWeight: "normal", lineHeight: 30 },
  body3: { fontSize: SIZES.body3, fontWeight: "normal", lineHeight: 22 },
  body4: { fontSize: SIZES.body4, fontWeight: "normal", lineHeight: 22 },
  body5: { fontSize: SIZES.body5, fontWeight: "normal", lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
