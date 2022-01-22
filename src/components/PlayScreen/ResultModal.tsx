import React from "react";
import { View, Text, Modal, TouchableOpacity, Image } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import LiquidProgressFill from "../LiquidProgressFill";

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
          backgroundColor: COLORS.black + "90",
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
              incorrectCount={incorrectCount}
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

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 7,
              width: "100%",
              backgroundColor: COLORS.primary,
              marginTop: 20,
              borderRadius: 50,
            }}
            onPress={handleRetry}
          >
            <Ionicons
              name="md-return-up-back"
              size={25}
              style={{ color: COLORS.white }}
            />
            <Text
              style={{
                textAlign: "center",
                color: COLORS.white,
                marginLeft: 10,
              }}
            >
              Try Again
            </Text>
          </TouchableOpacity>
          {/* Go Home */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 7,
              width: "100%",
              backgroundColor: COLORS.primary + "20",
              marginTop: 20,
              borderRadius: 50,
            }}
            onPress={handleHome}
          >
            <Ionicons name="home" size={25} style={{ color: COLORS.primary }} />
            <Text
              style={{
                textAlign: "center",
                color: COLORS.primary,
                marginLeft: 10,
              }}
            >
              Go Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ResultModal;
