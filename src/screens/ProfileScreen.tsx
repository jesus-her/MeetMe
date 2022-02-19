import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";

import { auth, firestore } from "../../firebase";

import { COLORS, FONTS, SIZES, icons } from "../constants";
import {
  LineDivider,
  ProfileRadioButton,
  ProfileValue,
} from "../components/ProfileScreen";
import HeaderSection from "../components/shared/HeaderSection";
import ModalEditPassword from "../components/ProfileScreen/ModalEditPassword";

import ModalEditEmail from "../components/ProfileScreen/ModalEditEmail";
import ModalEditName from "../components/ProfileScreen/ModalEditName";
import ModalEditPhoto from "../components/ProfileScreen/ModalEditPhoto";
import { signOut } from "../utils/auth";

const Profile = (props) => {
  const [newCourseNotification, setNewCourseNotification] =
    React.useState(false);
  const [studyReminder, setStudyReminder] = React.useState(false);
  const [allQuizzes, setAllQuizzes] = useState([]);
  const uid = auth.currentUser.uid;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEmailVisible, setModalEmailVisible] = useState(false);
  const [modalNameVisible, setModalNameVisible] = useState(false);
  const [modalPhotoVisible, setModalPhotoVisible] = useState(false);

  useEffect(() => {
    const userQuizzes = firestore
      .collection("Quizzes")
      .where("userId", "==", uid)
      .onSnapshot((querySnapshot) => {
        const quizzes = [];
        querySnapshot.forEach((quiz) => {
          quizzes.push({
            ...quiz.data(),
            key: quiz.id,
          });
          /*console.log(quiz.id);*/
        });
        setAllQuizzes(quizzes);
      });
    return () => userQuizzes();
  }, []);

  function renderProfileCard() {
    const user = auth.currentUser;
    return (
      <View
        style={{
          flexDirection: "row",
          marginVertical: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          paddingVertical: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.primary,
        }}
      >
        {/*Profile Image*/}

        <TouchableOpacity
          onPress={() => {
            setModalPhotoVisible(!modalPhotoVisible);
          }}
          style={{
            width: 80,
            height: 80,
          }}
        >
          {user.photoURL === null ? (
            <Image
              source={{ uri: "https://i.imgur.com/IN5sYw6.png" }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 40,
                borderWidth: 2,
                borderColor: COLORS.white,
              }}
            />
          ) : (
            <Image
              source={{ uri: user.photoURL }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 40,
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
        <ModalEditPhoto
          title="Photo"
          modalPhotoVisible={modalPhotoVisible}
          setModalPhotoVisible={setModalPhotoVisible}
        />
        {/* Details */}
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
            }}
          >
            {user.displayName}
          </Text>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.body4,
            }}
          >
            {user.email}
          </Text>
        </View>
      </View>
    );
  }

  function renderProfileSection1() {
    const user = auth.currentUser;
    return (
      <View style={styles.profileSectionContainer}>
        {/*Name*/}
        <ProfileValue
          onPress={() => {
            setModalNameVisible(!modalNameVisible);
          }}
          icon={icons.profile}
          label="Name"
          value={user.displayName}
        />
        <ModalEditName
          title="Name"
          modalNameVisible={modalNameVisible}
          setModalNameVisible={setModalNameVisible}
        />

        <LineDivider />

        {/*Email*/}
        <ProfileValue
          onPress={() => {
            setModalEmailVisible(!modalEmailVisible);
          }}
          icon={icons.email}
          label="Email"
          value={user.email}
        />
        <ModalEditEmail
          title="Email"
          modalEmailVisible={modalEmailVisible}
          setModalEmailVisible={setModalEmailVisible}
        />
        <LineDivider />

        {/*Password*/}
        <ModalEditPassword
          title="Password"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />

        <ProfileValue
          onPress={() => {
            props.navigation.navigate("ForgotPasswordInside");
          }}
          icon={icons.password}
          label="Password"
          value="********"
        />
        <LineDivider />

        <ProfileValue
          onPress={signOut}
          icon={icons.logout}
          value="Sign Out"
          valueStyles={{ color: COLORS.incorrect }}
        />

        {/*<LineDivider />*/}
        {/*<ProfileValue
          icon={icons.call}
          label="Contact number"
          value="+52 2462224323"
        />*/}
      </View>
    );
  }

  function renderProfileSection2() {
    return (
      <>
        <View style={styles.profileSectionContainer}>
          <ProfileValue
            onPress={() => {
              props.navigation.navigate("MyQuizzes");
            }}
            icon={icons.writing}
            label="My quizzes"
            value={"Total Quizzes: " + allQuizzes.length}
          />

          <LineDivider />
          <ProfileRadioButton
            icon={icons.newQuiz}
            label="New Quizzes Notification"
            isSelected={newCourseNotification}
            onPress={() => {
              setNewCourseNotification(!newCourseNotification);
            }}
          />
          <LineDivider />
          <ProfileRadioButton
            icon={icons.eye}
            label="My Quiz Visible"
            isSelected={studyReminder}
            onPress={() => {
              setStudyReminder(!studyReminder);
            }}
          />
        </View>
      </>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <StatusBar backgroundColor={COLORS.primary} barStyle={"light-content"} />
      {/* Header */}
      <HeaderSection
        title="Profile"
        onPress={() => props.navigation.goBack()}
        icon={icons.back}
      />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: 150,
        }}
      >
        {/*Profile Card*/}
        {renderProfileCard()}

        {/*Edit Profile Card*/}
        {/* {renderEditProfile()}*/}

        {/*Profile Section 1*/}
        {renderProfileSection1()}

        {/*Profile Section 2*/}
        {renderProfileSection2()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  profileSectionContainer: {
    marginBottom: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.gray20,
  },
});

export default Profile;
