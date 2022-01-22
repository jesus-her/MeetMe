import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Button,
  ToastAndroid,
  Alert,
} from "react-native";
import { auth, firestore, storage } from "../../firebase";

import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import { IconButton } from "../components/ProfileScreen";
import FormInput from "../components/shared/FormInput";
import FormButton from "../components/shared/FormButton";
import HeaderSection from "../components/shared/HeaderSection";
import * as ImagePicker from "expo-image-picker";
import { savePhoto, updatePhoto, useAuth } from "../utils/auth";
import * as firebase from "firebase";

const EditProfileScreen = (props) => {
  const [photoURL, setPhotoURL] = useState("https://i.imgur.com/S0sWJZD.png");
  const [imageUri, setImageUri] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [userProfile, setUserProfile] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });

  const handleChangeText = (name, value) => {
    setUserProfile({ ...userProfile, [name]: value });
  };

  //Reauthenticate
  /* reauthenticate = (currentPassword) => {
    var user = auth.currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };*/

  //Set a new password
  /*const handleOnChangePassword = () => {
    this.reauthenticate(currentPassword)
      .then(() => {
        var user = auth.currentUser;
        user
          .updatePassword(newPassword)
          .then(() => {
            Alert.alert("Password was changed");
          })
          .catch((error) => {
            Alert.alert(error.message);
          });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };*/

  const handleOnSave = () => {
    if (photoURL != "") {
      // Load PhotoURL to Firebase  SignUp
      updatePhoto(photoURL);
    } else {
      console.log("No new photo updated");
    }
  };

  /*  const currentUser = useAuth();

    useEffect(() => {
      if (currentUser?.photoURL) {
        setPhotoURL(currentUser.photoURL);
      }
    }, [currentUser]);

    auth.currentUser.updateProfile({
      photoURL: setPhotoURL,
    });*/

  /* const handleOnSave = async () => {
      // Getting user's object
      let { user } = await auth.currentUser();

      // Updating user's profile using the updateProfile method
      await user.updateProfile({
        displayName: photoURL,
      });
    };*/

  /*auth.onAuthStateChanged(auth, (user) => {
        const userFirebase = auth.currentUser;
        if (userFirebase !== null) {
          const photoURL = user.photoURL;
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
        } else {
          // User is signed out
          // ...
        }
      });*/

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });
    console.log(result);
    if (!result.cancelled) {
      this.uploadImage(result.uri)
        .then(() => {
          console.log("Image Uploaded");
        })
        .catch((error) => {
          Alert.alert(error);
        });
      setImageUri(result.uri);
    }
  };

  //Upload Image to Firebase
  uploadImage = async (uri) => {
    const currentPhotoUrlID = Math.floor(
      100000 + Math.random() * 9000
    ).toString();
    const response = await fetch(uri);
    const blob = await response.blob();

    try {
      var ref = storage.ref(`/images/users/profilePhotos/${currentPhotoUrlID}`);
      await ref
        .put(blob)
        .then((snapshot) => {
          return snapshot.ref.getDownloadURL();
        })
        .then((downloadURL) => {
          console.log("you image:" + downloadURL);
          setPhotoURL(downloadURL);
          return downloadURL;
        });

      return null;
    } catch (error) {
      return null;
    }
  };

  //Render

  function renderProfileCard() {
    const user = auth.currentUser;
    return (
      <View
        style={{
          flexDirection: "column",
          marginVertical: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          paddingVertical: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          elevation: 5,
          alignItems: "center",
        }}
      >
        {/*Upload Image Profile*/}

        <TouchableOpacity
          style={{
            width: 100,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={selectImage}
        >
          {imageUri == "" ? (
            <Image
              source={{ uri: photoURL }}
              resizeMode="contain"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 50,
                borderWidth: 2,
                borderColor: COLORS.white,
              }}
            />
          ) : (
            <Image
              source={{
                uri: imageUri,
              }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 50,
                borderWidth: 2,
                borderColor: COLORS.white,
              }}
            />
          )}
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                marginBottom: -15,
                width: 30,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.secondary,
                borderRadius: 15,
              }}
            >
              {/* Camera Icon*/}
              <Image
                source={icons.camera}
                resizeMode="contain"
                style={{
                  width: 17,
                  height: 17,
                }}
              />
            </View>
          </View>
        </TouchableOpacity>

        {/* Details */}
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            marginTop: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.black,
              ...FONTS.h2,
            }}
          >
            {user.displayName}
          </Text>
          <Text
            style={{
              color: COLORS.gray80,
              ...FONTS.body4,
            }}
          >
            {user.email}
          </Text>
        </View>
      </View>
    );
  }

  function renderEditProfileInfo(props) {
    const user = auth.currentUser;
    return (
      <View
        style={{
          width: "100%",
          alignItems: "center",
          backgroundColor: COLORS.white,
          elevation: 3,
          borderRadius: SIZES.radius,
          padding: SIZES.radius,
        }}
      >
        {/* Name */}
        <FormInput
          labelText="Name"
          placeholderText={user.displayName}
          onChangeText={(value) => handleChangeText("name", value)}
        />

        {/* Email */}
        <FormInput
          labelText="Email"
          placeholderText={user.email}
          keyboardType={"email-address"}
          onChangeText={(value) => handleChangeText("email", value)}
        />

        {/* Password */}
        <FormInput
          autoCapitalize="none"
          labelText="Current Password"
          placeholderText="Enter your current password"
          secureTextEntry={true}
          value={currentPassword}
          onChangeText={(value) => setCurrentPassword(value)}
        />
        <FormInput
          autoCapitalize="none"
          labelText="Password"
          placeholderText="Enter your new password"
          secureTextEntry={true}
          value={newPassword}
          onChangeText={(value) => setNewPassword(value)}
        />
        <FormButton
          onPress={handleOnChangePassword}
          labelText="Set new password"
          style={{ width: "100%" }}
        />

        {/* Phone */}
        <FormInput
          labelText="Phone"
          placeholderText="Phone number"
          keyboarTyoe={"phone-pad"}
          onChangeText={(value) => handleChangeText("phone", value)}
        />

        {/* Submit button */}
        <FormButton
          onPress={handleOnSave}
          labelText="Save"
          style={{ width: "100%" }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      {/* Header */}
      <HeaderSection
        title="Edit Profile"
        onPress={() => props.navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: 150,
        }}
      >
        {/*Profile Card*/}
        {renderProfileCard()}

        {/*Edit Profile Info*/}
        {renderEditProfileInfo()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  profileSectionContainer: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.gray20,
  },
});

export default EditProfileScreen;
