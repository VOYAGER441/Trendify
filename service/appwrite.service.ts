import {
  Client,
  Account,
  ID,
  Models,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";

export const appWriteConfig = {
  ENDPOINT: "https://cloud.appwrite.io/v1",
  platform: "com.voyager.trendify",
  PROJECTID: "6759b2f60014b1a37a22",
  DATABASEID: "675afc1600013a7f2084",
  USERCOLLECTIONID: "675affe7000a255e8a7f",
};

let client: Client;
// let account: Account;

client = new Client();
client
  .setEndpoint(appWriteConfig.ENDPOINT)
  .setProject(appWriteConfig.PROJECTID) // Your Project ID
  .setPlatform(appWriteConfig.platform);

const account = new Account(client);
const avatar = new Avatars(client);
const database = new Databases(client);

// function for create new user
export const createUser = async (
  email: string,
  password: string,
  username: string | undefined,
  preferences: any
) => {
  try {
    // Step 1: Create the user account
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error("Failed to create a new user account.");

    // Step 2: Generate avatar
    const AvatarUrl = avatar.getInitials(username);

    // Step 3: Check active session before login
    try {
      await account.get(); // Check if a session already exists
    } catch {
      // If no session exists, create a new session
      await login(email, password);
    }

    // Step 4: Create a user document in Appwrite database
    const newUser = await database.createDocument(
      appWriteConfig.DATABASEID,
      appWriteConfig.USERCOLLECTIONID,
      ID.unique(),
      {
        accountid: newAccount.$id,
        email,
        username,
        avatar: AvatarUrl,
        preferences,
      }
    );

    return newUser;
  } catch (error) {
    console.error(error);

    // Extract and throw a meaningful error
    if (error instanceof Error) {
      throw new Error(error.message || "An unknown error occurred.");
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};

// function for login
export async function login(email: any, password: any) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (err) {
    console.error(err);
  }
}


// function for get current user
export async function getCurrentUser() {
    try {
      const currentAccount = await account.get();
      if (!currentAccount) throw new Error("No current account found");
  
      const currentUser = await database.listDocuments(
        appWriteConfig.DATABASEID,
        appWriteConfig.USERCOLLECTIONID,
        [Query.equal('accountid', currentAccount.$id)]
      );
  
      if (currentUser.documents.length === 0) throw new Error("User not found");
  
      return currentUser.documents[0];
    } catch (error) {
      console.error("Error fetching current user: ", error);
      return null;
    }
  }
  