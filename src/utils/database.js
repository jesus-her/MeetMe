import { firestore } from "../../firebase";

export const createQuiz = (currentQuizId, title, quizImg, owner) => {
  return firestore.collection("Quizzes").doc(currentQuizId).set({
    title,
    quizImg,
    owner,
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
