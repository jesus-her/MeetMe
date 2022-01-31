import { COLORS, FONTS, icons, SIZES } from "../../constants";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { auth, storage } from "../../../firebase";
import QuizCard from "./QuizCard";
import { LinearGradient } from "expo-linear-gradient";
import { Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { getQuizzes } from "../../utils/database";
import HeaderSection from "./HeaderSection";
import { IconButton } from "../ProfileScreen";
import images from "../../constants/images";

const ModalFindByQuizId = ({
  modalFindByQuizIdVisible,
  setModalFindByQuizIdVisible,
}) => {
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState("");
  const [searchBar, setSearchBar] = useState(false);

  /*const [currentQuizImage, setCurrentQuizImage] = useState(
        route.params.currentQuizImage
      );*/

  const getAllQuizzes = async () => {
    setRefreshing(true);
    const quizzes = await getQuizzes();

    // Transform quiz data
    let tempQuizzes = [];
    await quizzes.docs.forEach(async (quiz) => {
      await tempQuizzes.push({ id: quiz.id, ...quiz.data() });
    });
    await setAllQuizzes([...tempQuizzes]);
    setFilterData([...tempQuizzes]);

    setRefreshing(false);
  };

  useEffect(() => {
    getAllQuizzes();
  }, []);

  //Search filter
  const searchFilter = (text) => {
    if (text) {
      const newData = allQuizzes.filter((item) => {
        const itemData = item.id ? item.id.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(null);
      setSearch(text);
    }
  };

  const user = auth.currentUser;
  const navigation = useNavigation();
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalFindByQuizIdVisible}
        onRequestClose={() => {
          setModalFindByQuizIdVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.primary2]}
              start={{ x: 1, y: 0.1 }}
              end={{ x: 1, y: 1 }}
              style={{
                flexDirection: "row",
                paddingHorizontal: SIZES.padding,
                justifyContent: "flex-start",
                alignItems: "center",
                height: SIZES.heightNav,
                position: "relative",
                backgroundColor: COLORS.white,
                elevation: 7,
                width: "100%",
                borderRadius: 100,
                marginBottom: SIZES.radius,
              }}
            >
              <IconButton
                icon={icons.back}
                iconStyle={{
                  tintColor: COLORS.white,
                }}
                containerStyle={{ marginRight: SIZES.radius }}
                onPress={() => {
                  setModalFindByQuizIdVisible(!modalFindByQuizIdVisible);
                }}
              />

              <Searchbar
                style={{
                  marginHorizontal: SIZES.base,
                  ...FONTS.h3,
                  fontWeight: "bold",
                  width: "85%",
                  height: "55%",
                  borderRadius: 50,
                  color: COLORS.white,
                }}
                value={search}
                placeholder="Enter a Quiz ID"
                placeholderTextColor={COLORS.gray50}
                onChangeText={(text) => searchFilter(text)}
              />
            </LinearGradient>

            <View style={styles.textInputContainer}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={filterData}
                onRefresh={getAllQuizzes}
                refreshing={refreshing}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item: quiz }) => (
                  <View
                    /*colors={[COLORS.secondary, COLORS.primary2]}
                                                              start={{ x: 0.1, y: 0.5 }}
                                                              end={{ x: 1, y: 1 }}*/
                    style={{
                      borderRadius: SIZES.radius,
                      marginVertical: 10,
                      padding: SIZES.radius,
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: COLORS.primary,
                      elevation: 5,
                      width: "100%",
                      alignSelf: "center",
                      marginBottom: SIZES.padding,
                      overflow: "hidden",
                    }}
                  >
                    <QuizCard
                      currentQuizTitle={quiz.title}
                      currentQuizImage={quiz.quizImg}
                      owner={quiz.owner}
                      QuizID={quiz.currentQuizId}
                    />
                    {/* {quiz.description != "" ? (
                <Text style={{ opacity: 0.5 }}>{quiz.description}</Text>
              ) : null}*/}
                    <TouchableOpacity
                      style={{
                        borderRadius: 50,
                        backgroundColor: COLORS.secondary,
                        width: "100%",
                      }}
                      onPress={() => {
                        navigation.navigate("PlayQuiz", {
                          quizId: quiz.id,
                          quizImg: quiz.quizImg,
                          quizOwner: quiz.owner,
                        }),
                          setSearch("");
                        setFilterData(allQuizzes);
                      }}
                    >
                      <LinearGradient
                        colors={["#ff91b9", COLORS.secondary]}
                        start={{ x: 1, y: 0.1 }}
                        end={{ x: 1, y: 0.75 }}
                        style={{
                          width: "100%",
                          paddingVertical: 5,
                          paddingHorizontal: SIZES.padding,
                          borderRadius: 50,
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                          position: "relative",
                        }}
                      >
                        <Text
                          style={{
                            color: COLORS.white,
                            ...FONTS.h2,
                            letterSpacing: 5,
                          }}
                        >
                          Play
                        </Text>
                        <Ionicons
                          name="play"
                          size={22}
                          style={{
                            alignSelf: "center",
                            color: COLORS.white,
                            position: "absolute",
                            right: SIZES.padding,
                          }}
                        />
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: COLORS.black + "70",
    height: SIZES.height,
    width: SIZES.width,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 0,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    elevation: 5,
    width: "95%",
    height: "85%",
    overflow: "hidden",
  },
  modalHeader: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  textInputContainer: {
    width: "100%",
  },
});

export default ModalFindByQuizId;
