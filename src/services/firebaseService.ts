import "firebase/database";
import "firebase/firestore";
import firebase from "./firebase.config";
const cloudDB = firebase.firestore();
const realDB = firebase.database();

export const getAllUsers = async () => {
  return cloudDB.collection("userProfile").orderBy("firstname");
};

export const getAllPosts = async () => {
  return cloudDB.collection("userPosts").orderBy("id");
};

export const savePosts = async (data: {}) => {
  const result = await cloudDB.collection("userPosts").add(data);
  return result;
};

export const getFacePosts = async () => {
  return await cloudDB.collection("faceposts");
};
export const getChatList = async (userId: string) => {
  return cloudDB
    .collection("chatList")
    .where("matchArray", "array-contains", `${userId}`)
    .orderBy("time_created");
};
