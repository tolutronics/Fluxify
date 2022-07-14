let postData = {};

export const setPost = (data: any) => {
  postData = data;
};

export const getPost = () => {
  return postData;
};
