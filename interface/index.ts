export interface INewsResponse {
  id:string;
  imageUrl: string;
  category: string[];
  title: string;
  time: string;
  author: string;
  description:string;
  outerUrl:string;
}
export interface IUserDocument {
  username: string; // The user's username
  email: string; // The user's email
  preferences: string[]; // User preferences
  accountid: string; // The account ID linked to this user
  avatar: string; // The user's avatar URL or path
  created: string; // Timestamp of when the document was created
  updated: string;  // Timestamp of when the document was last updated
}
