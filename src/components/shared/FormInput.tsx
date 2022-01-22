import { Formik } from "formik";
import React from "react";
import { Text, TextInput, View } from "react-native";
import { COLORS, FONTS } from "../../constants";

const FormInput = (props) => {
  const {
    labelText = "",
    placeholderText = "",
    onChangeText = null,
    value = null,
    ...more
  } = props;
  // @ts-ignore

  return (
    <View style={{ width: "100%", marginBottom: 20 }}>
      <Text style={{ ...FONTS.h3, color: COLORS.primary }}>{labelText}</Text>

      <TextInput
        {...props}
        style={{
          padding: 10,
          borderColor: COLORS.gray20,
          borderBottomWidth: 1,
          width: "100%",
          borderRadius: 5,
          marginTop: 10,
        }}
        placeholder={placeholderText}
        onChangeText={onChangeText}
        value={value}
        {...more}
      />
    </View>
  );
};

export default FormInput;
