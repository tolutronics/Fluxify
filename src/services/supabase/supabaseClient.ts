import { ref } from "vue";
import { supabase } from "./supabaseConfig";
const userSession = ref();
export const getSession = async () => {
  userSession.value = supabase.auth.session();
  // console.log("user session", userSession);
  supabase.auth.onAuthStateChange((event: any, session: any) => {
    // console.log("event==>", event, session);
    userSession.value = session;
  });
  return userSession.value;
};

export const signUpWithEmail = async (
  matric: string,
  password: string,
  userData?: any
) => {
  const { user, error } = await supabase.auth.signUp(
    {
      email: `${matric}@fluxify.com`,
      password,
    },
    { data: userData }
  );
  return { user, error };
};

export const signInWithEmail = async (matric: string, password: string) => {
  const { user, error } = await supabase.auth.signIn({
    email: `${matric}@fluxify.com`,
    password,
  });
  return { user, error };
};

export const getCurrentUser = async () => {
  const { user, error } = await supabase.auth.api.getUser(
    userSession.value.access_token
  );
  return { user, error };
};

export const forgetPassword = async (email: string) => {
  const result = await supabase.auth.api.resetPasswordForEmail(email);
  return result;
};

export const saveUserToDatabase = async (user: any): Promise<any> => {
  const { data, error } = await supabase.from("users").insert([user]);
  return { data, error };
};

export const getAllPosts = async (): Promise<any> => {
  const { data, error } = await supabase.from("posts").select("*");

  return { data, error };
};

export const getAllUsers = async (): Promise<any> => {
  const { data, error } = await supabase.from("users").select("*");
  return { data, error };
};

export const getUserId = async (matric: any): Promise<any> => {
  const { data, error } = await supabase
    .from("users")
    .select("studentId")
    .eq("studentNumber", matric);
  return { data, error };
};

export const savePostToDatabase = async (post: any): Promise<any> => {
  const { data, error } = await supabase.from("posts").insert([post]);
  return { data, error };
};

export const commentOnPost = async (comment: any): Promise<any> => {
  const { data, error } = await supabase.from("comments").insert([comment]);
  return { data, error };
};
export const getPostComments = async (postId: any): Promise<any> => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("postId", postId);
  return { data, error };
};

export const logUserOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
  } catch (error) {
    // console.log(error);
  }
};

export const updatePassword = async (newPassword: string, email: string) => {
  const { data, error } = await supabase.auth.update({
    email,
    password: newPassword,
  });
  return { data, error };
};
