import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";
import * as Interface from "@/interface";


export const appWriteConfig = {
  ENDPOINT: "https://cloud.appwrite.io/v1",
  platform: "com.voyager.trendify",
  PROJECTID: "6759b2f60014b1a37a22",
  DATABASEID: "675afc1600013a7f2084",
  USERCOLLECTIONID: "675affe7000a255e8a7f",
};

// global array
export const USER_DATA: Interface.IUserDocument[] = [];

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
      [Query.equal("accountid", currentAccount.$id)]
    );

    if (currentUser.documents.length === 0) throw new Error("User not found");

    return currentUser.documents[0];
  } catch (error) {
    console.error("Error fetching current user: ", error);
    return null;
  }
}

//function for log out
// Sign Out
export async function logOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error: any) {
    throw new Error(error);
  }
}

// Function to update the preferences field
export async function updatePreference(selectedCategories: any) {
  try {
    const response = await getCurrentUser();
    // console.log("User Response:", response);

    const userId = response?.$id; // Ensure userId is valid

    // Step 3: Update the preferences field
    const updatePayload = {
      preferences: selectedCategories, // Update "preferences" with the selected categories
    };

    const permissions = ['read("any")']; // Optional: Set permissions as needed

    const result = await database.updateDocument(
      appWriteConfig.DATABASEID, // Database ID
      appWriteConfig.USERCOLLECTIONID, // Collection ID
      userId + "", // Document ID (associated with the user)
      updatePayload, // Data to update
      permissions // Permissions (optional)
    );

    // console.log("Updated Document:", result);
    return result; // Return the updated document
  } catch (error: any) {
    console.error("Error updating preferences:", error.message);
    throw error; // Optional: rethrow the error for further handling
  }
}

// get category data
export async function getCurrentUserCategory() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("No current account found");
    // console.log(currentAccount);

    const currentUser = await database.listDocuments(
      appWriteConfig.DATABASEID,
      appWriteConfig.USERCOLLECTIONID,
      [Query.equal("accountid", currentAccount.$id)]
    );

    if (currentUser.documents.length === 0) throw new Error("User not found");

    return currentUser.documents[0].preferences;
  } catch (error) {
    console.error("Error fetching current user: ", error);
    return null;
  }
}

export async function fetchUserData() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("No current account found");

    // Log the account ID being queried
    console.log("Account ID being queried:", currentAccount.$id);

    // Fetch all documents for the account ID
    const currentUser = await database.listDocuments(
      appWriteConfig.DATABASEID,
      appWriteConfig.USERCOLLECTIONID,
      [Query.equal("accountid", currentAccount.$id)]
    );

    // console.log("Documents fetched:", currentUser.documents);
    // USER_DATA.push(createUser.documents)

    if (currentUser.documents.length === 0) throw new Error("User not found");

    return currentUser.documents;
  } catch (error) {
    console.error("Error fetching all user data: ", error);
  }
}
