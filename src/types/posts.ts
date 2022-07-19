export type Post = {
  id?: number;
  postId?: string;
  title?: string;
  createdAt?: string | Date;
  studentId: string;
  studentNumber: string;
  photoUrl?: string;
  postText?: string;
  commentId?: string;
};
