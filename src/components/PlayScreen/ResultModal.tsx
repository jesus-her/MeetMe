import React from "react";
import { View, Text, Modal, TouchableOpacity, Image } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import LiquidProgressFill from "../LiquidProgressFill";
import { Form } from "formik";
import FormButton from "../shared/FormButton";
import { LinearGradient } from "expo-linear-gradient";

const ResultModal = ({
  isModalVisible,
  correctCount,
  incorrectCount,
  totalCount,
  handleOnClose,
  handleRetry,
  handleHome,
}) => {
  return (
    <Modal
      animationType={"slide"}
      transparent={true}
      visible={isModalVisible}
      onRequestClose={handleOnClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black + "50",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.white,
            width: "90%",
            height: SIZES.height * 0.8,
            borderRadius: SIZES.radius,
            padding: SIZES.padding,
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              alignSelf: "flex-start",
              borderBottomWidth: 2,
              borderColor: COLORS.gray70,
              width: "100%",
              marginBottom: SIZES.padding,
            }}
          >
            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.black,
                textAlign: "left",
                letterSpacing: 5,
              }}
            >
              Results
            </Text>
          </View>
          {/*Result Text*/}
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>
              {correctCount > totalCount / 2 ? "¡Felicidades!" : "Oops!"}
            </Text>
            <Image
              source={
                correctCount > totalCount / 2
                  ? require("../../../assets/LeaderBoard/emoji_silly.gif")
                  : require("../../../assets/LeaderBoard/emoji_sad.gif")
              }
              resizeMode="contain"
              style={{
                width: 50,
                height: 50,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <LiquidProgressFill
              correctCount={correctCount}
              /* questionsLength={allQuestions.length}*/
              totalCount={totalCount}
            />
            {/*   <View style={{ alignItems: "center", padding: 20 }}>
              <Text style={{ color: COLORS.primary3, fontSize: 30 }}>
                {correctCount}
              </Text>
              <Text style={{ fontSize: 16 }}>Correct</Text>
            </View>
            <View style={{ alignItems: "center", padding: 20 }}>
              <Text style={{ color: COLORS.secondary, fontSize: 30 }}>
                {incorrectCount}
              </Text>
              <Text style={{ fontSize: 16 }}>Incorrect</Text>
            </View>*/}
          </View>
          <Text style={{ opacity: 0.8 }}>
            {totalCount - (incorrectCount + correctCount)} Unattempted
          </Text>

          {/* Try again */}

          <LinearGradient
            colors={[COLORS.primary, COLORS.primary2]}
            start={{ x: 0.1, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            style={{
              margin: 16,
              borderRadius: 30,
              alignSelf: "center",
              borderWidth: 1,
              borderColor: COLORS.primary,
              width: "100%",
              height: 40,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",

                borderRadius: 30,
                height: 40,
              }}
              onPress={handleRetry}
            >
              <Image
                source={require("../../../assets/icons/reload.png")}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.white,
                  marginRight: 10,
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: COLORS.white,
                  ...FONTS.h3,
                }}
              >
                Try Again
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          {/* Go Home */}
          {/* Try again */}

          <LinearGradient
            colors={[COLORS.primary + "20", COLORS.primary2 + "20"]}
            start={{ x: 0.1, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            style={{
              margin: 16,
              borderRadius: 30,
              alignSelf: "center",
              borderWidth: 1,
              borderColor: COLORS.primary,
              width: "100%",
              height: 40,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",

                borderRadius: 30,
                height: 40,
              }}
              onPress={handleHome}
            >
              <Image
                source={require("../../../assets/icons/home.png")}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.primary,
                  marginRight: 10,
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: COLORS.primary,
                  ...FONTS.h3,
                }}
              >
                Go Home
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

export default ResultModal;
