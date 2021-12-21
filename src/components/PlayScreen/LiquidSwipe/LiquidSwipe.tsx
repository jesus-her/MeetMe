import React, { useState } from "react";
import Slider from "./Slider";
import Slide from "./Slide";
import { View } from "react-native";
import { SIZES } from "../../../constants";
/*import CustomButton from "../components/CustomButton";*/
import CheckButton from "../../CheckButton";

const slides = [
  {
    id: 1,
    color: "#4DB9FE",
    title: "",
    description: "",
    picture: require("../../../../assets/PlayScreen/LiquidSwipe/sun-2.png"),
  },
  {
    id: 2,
    color: "#914FFF",
    title: "¿Día o Noche?",
    description: "",
    picture: require("../../../../assets/PlayScreen/LiquidSwipe/day-and-night.png"),
  },
  {
    id: 3,
    color: "#1f2248",
    title: "",
    description: "",
    picture: require("../../../../assets/PlayScreen/LiquidSwipe/eclipse.png"),
  },
  /*{
          color: "#FB3A4D",
          title: "10000+ Recipes",
          description:
            "Browse thousands of curated recipes from top chefs, each with detailled cooking instructions",
          picture: require("./assets/2.png"),
        },
        {
          color: "#F2AD62",
          title: "Video Tutorials",
          description:
            "Browse our best themed recipes, cooking tips, and how-to food video & photos",
          picture: require("./assets/3.png"),
        },
        {
          color: "#41e9ff",
          title: "Video Tutorials",
          description:
            "Browse our best themed recipes, cooking tips, and how-to food video & photos",
          picture: require("./assets/3.png"),
        },*/
];

export const assets = slides.map(({ picture }) => picture);

const LiquidSwipe = () => {
  const [index, setIndex] = useState(1);
  const prev = slides[index - 1];
  const next = slides[index + 1];
  return (
    <>
      <View
        style={{
          height: SIZES.heightPlayScreen,
          width: SIZES.width,
          position: "relative",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "65%",
            height: "90%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(29,29,29,0)",
            zIndex: 1,
          }}
        />
        <Slider
          key={index}
          index={index}
          setIndex={setIndex}
          prev={prev && <Slide slide={prev} />}
          next={next && <Slide slide={next} />}
        >
          <Slide slide={slides[index]!} />
        </Slider>
      </View>
    </>
  );
};

export default LiquidSwipe;