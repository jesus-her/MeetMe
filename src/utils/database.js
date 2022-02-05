import { firestore } from "../../firebase";

export const createQuiz = (
  currentQuizId,
  title,
  quizImg,
  owner,
  userId,
  attemptCounter,
  isFavorite
) => {
  return firestore.collection("Quizzes").doc(currentQuizId).set({
    title,
    quizImg,
    owner,
    userId,
    currentQuizId,
    attemptCounter,
    isFavorite,
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

export const getUserQuizzes = (userId) => {
  return firestore.collection("Quizzes").where("userId", "==", userId).get();
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
