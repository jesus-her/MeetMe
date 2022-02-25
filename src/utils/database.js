import { db, firestore } from "../../firebase";
import { ToastAndroid } from "react-native";

export const createQuiz = (
  currentQuizId,
  title,
  quizImg,
  owner,
  userId,
  attemptCounter,
  isFavorite,
  isFavoriteBy,
  sound,
  currentAudioId,
  ownerPhotoURL
) => {
  return firestore.collection("Quizzes").doc(currentQuizId).set({
    title,
    quizImg,
    owner,
    userId,
    currentQuizId,
    attemptCounter,
    isFavorite,
    isFavoriteBy,
    sound,
    currentAudioId,
    ownerPhotoURL,
  });
};

// Create new question for current quiz
export const createQuestion = (currentQuizId, currentQuestionId, question) => {
  return firestore
    .collection("Quizzes")
    .doc(currentQuizId)
    .collection("QNA")
    .doc(currentQuestionId)
    .set(question);
};

// Get All Quizzes
export const getQuizzes = () => {
  return firestore.collection("Quizzes").get();
};
// Get All Leaderboard
export const getLeaderboard = (currentQuizId) => {
  firestore
    .collection("Quizzes")
    .doc(currentQuizId)
    .collection("LeaderBoard")
    .get();
};

export const updatePhotoInQuiz = async (photoURL, uid) => {
  return firestore
    .collection("Quizzes")
    .where("userId", "==", uid)
    .set({ ownerPhotoURL: photoURL })
    .then(() => {
      console.log("it works");
    });
  /*  const dbRef = db.collection("Quizzes").where("userId", "==", uid);
  await dbRef
    .set({ ownerPhotoURL: photoURL })*/
};

// Get Quiz Details by id
export const getQuizById = (currentQuizId) => {
  return firestore.collection("Quizzes").doc(currentQuizId).get();
};

// Get Questions by currentQuizId
export const getQuestionsByQuizId = (currentQuizId) => {
  return firestore
    .collection("Quizzes")
    .doc(currentQuizId)
    .collection("QNA")
    .get();
};
