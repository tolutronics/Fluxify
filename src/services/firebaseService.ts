import { User } from "@/types/users";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import firebaseConfig from "./firebase.config";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getAllUsers = async () => {
  // return cloudDB.collection("userProfile").orderBy("firstname");
  return query(collection(db, "userProfile"), orderBy("firstname"));
};

export const getAllPosts = async () => {
  return query(collection(db, "userPosts"), orderBy("id"));
};

export const savePosts = async (data: {}) => {
  // const result = await cloudDB.collection("userPosts").add(data);
  return "result";
};

export const getFacePosts = async () => {
  return query(collection(db, "faceposts"));
};
export const getChatList = async (userId: string) => {
  return query(
    collection(db, "chatList"),
    where("matchArray", "array-contains", `${userId}`),
    orderBy("time_created")
  );
};

export const login = async (password: string, matric: string) => {
  // let response = {};
  const result = await getDocs(
    query(collection(db, "userProfile"), where("matric", "==", matric))
  );
  console.log(result.size);

  if (result.size < 1) {
    console.log("came here");
    return { error: true, msg: "User not found", data: null };
  } else {
    let response: any;
    result.forEach((res) => {
      const profile = res.data();
      if (profile.password == password) {
        response = { error: false, msg: "Login Successful", data: profile };
      } else {
        response = { error: false, msg: "User not found", data: null };
      }
    });

    console.log(response);

    return response;
  }

  // result.docs
};
