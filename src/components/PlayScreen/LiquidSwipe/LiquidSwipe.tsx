import React, { useState } from "react";
import Slider from "./Slider";
import Slide from "./Slide";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../../../constants";
/*import CustomButton from "../components/CustomButton";*/
import CheckButton from "../../CheckButton";
import { COL } from "../Puzzle/Config";

const slides = [
  {
    id: 1,
    color: "#4361EE",
    title: "",
    description: "",
    picture: require("../../../../assets/PlayScreen/LiquidSwipe/sun-2.png"),
  },
  {
    id: 2,
    color: "#F72585",
    title: "¿Día o Noche?",
    description: "",
    picture: require("../../../../assets/PlayScreen/LiquidSwipe/day-and-night.png"),
  },

  /*{
    id: 3,
    color: "#1f2248",
    title: "",
    description: "",
    picture: require("../../../../assets/PlayScreen/LiquidSwipe/eclipse.png"),
  },*/

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

const LiquidSwipe = ({
  question,
  allOptions,
  ListFooterComponent,
  quizImage,
  correctCount,
  incorrectCount,
  quizOwner,
  quizImg,
  quizTitle,
  indexx,
  setIndexx,
  data,
  allQuestionsLength,
}) => {
  const [index, setIndex] = useState(0);
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
        <>
          <View
            style={{
              width: "100%",
              height: "15%",
              backgroundColor: "rgba(29,29,29,0)",
              zIndex: 100,
            }}
          />
          {/*<TouchableOpacity
            onPress={() => {
              if (indexx === data.length - 1) {
                return;
              }
              setIndexx(indexx + 1);
            }}
            style={{
              width: 20,
              height: 20,
              position: "absolute",
              zIndex: 1000,
              bottom: 10,
              alignSelf: "center",
              backgroundColor: "red",
            }}
          />*/}
          {index == 0 ? (
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "85%",
                height: "100%",
                backgroundColor: "rgba(29,29,29,0)",
                zIndex: 100,
              }}
            />
          ) : (
            <View
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "18%",
                backgroundColor: "rgba(29,29,29,0)",
                zIndex: 100,
              }}
            />
          )}
        </>

        <Slider
          key={index}
          index={index}
          setIndex={setIndex}
          prev={prev && <Slide slide={prev} />}
          next={next && <Slide slide={next} />}
        >
          <Slide
            allQuestionsLength={allQuestionsLength}
            slide={slides[index]!}
            question={question}
            allOptions={allOptions}
            ListFooterComponent={ListFooterComponent}
            quizImage={quizImage}
            correctCount={correctCount}
            incorrectCount={incorrectCount}
            quizOwner={quizOwner}
            quizImg={quizImg}
            quizTitle={quizTitle}
          />
        </Slider>
      </View>
    </>
  );
};

export default LiquidSwipe;
