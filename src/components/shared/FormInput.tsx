import { Formik } from "formik";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

const FormInput = (props) => {
  const {
    labelText = "",
    placeholderText = "",
    onChangeText = null,
    value = null,
    icon,
    hidePassword,
    _changeIcon,
    icon2,
    hidePassword2,
    _changeIcon2,
    color,
    ...more
  } = props;
  // @ts-ignore

  return (
    <View style={{ width: "100%", marginBottom: 20 }}>
      <Text style={{ ...FONTS.h3, color: COLORS.primary }}>{labelText}</Text>
      <View
        style={{
          flexDirection: "row",
          position: "relative",
          alignItems: "center",
        }}
      >
        <TextInput
          {...props}
          style={{
            padding: 10,
            borderColor: COLORS.gray20,
            borderBottomWidth: 1,
            width: "100%",
            borderRadius: 5,
            marginTop: 10,
            ...FONTS.h4,
            fontWeight: "900",
          }}
          placeholder={placeholderText}
          onChangeText={onChangeText}
          value={value}
          {...more}
        />
        <TouchableOpacity
          style={{ position: "absolute", right: SIZES.radius }}
          onPress={_changeIcon ? _changeIcon : _changeIcon2}
        >
          <Ionicons name={icon ? icon : icon2} size={22} color={color} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormInput;
