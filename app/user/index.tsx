import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "@rneui/themed"; // Avatar for profile picture
import { Stack } from "expo-router";
import { COLORS, FONT } from "@/constants"; // Assuming you have color and font constants
import { Provider as PaperProvider } from "react-native-paper";
import AppFooter from "@/components/AppFooter"; // Assuming you have a footer component
import service from "@/service";
import * as Interface from "@/interface"

const UserProfile = () => {
  // Example user data for a news app
  const [data, setData] = useState<Interface.IUserDocument | null>(null);  // Initialize with null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result2 = await service.appWrite.fetchUserData(); // Fetch user data from Appwrite
  
        // console.log("result2", result2);
  
        if (result2 && result2.length > 0) {
          const userData = result2[0] as unknown as Interface.IUserDocument; // Type assertion
          setData(userData); // Set the state with the correct type
        } else {
          console.error("No user data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [setData]);
  
  const user = {
    name: data?.username || "Jane Doe", // Optional chaining to avoid undefined errors
    email: data?.email || "jane.doe@example.com",
    bio: "News enthusiast, technology lover, and a frequent reader of global news updates. Passionate about staying informed.",
    imageUrl: data?.avatar || "https://example.com/path/to/profile-image.jpg",
    followedCategories: data?.preferences || ["Technology", "Health", "Business", "Sports"],
    recentArticles: [
      { title: "Tech Innovations in 2024", time: "2 hours ago" },
      { title: "Global Health Trends", time: "1 day ago" },
      { title: "Stock Market Insights", time: "3 days ago" },
    ],
  };
  


  return (
    <PaperProvider>
      <SafeAreaView style={styles.safeArea}>
        <Stack.Screen
          options={{
            headerTitle: "",
            headerTransparent: true,
            header: () => <Text style={styles.headerTitle}>Profile</Text>,
          }}
        />
        <View style={styles.mainContainer}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Profile Image */}
            <View style={styles.profileImageContainer}>
              <Avatar
                size="xlarge"
                rounded
                source={{ uri: user.imageUrl }}
                containerStyle={styles.avatar}
              />
            </View>

            {/* Name */}
            <Text style={styles.name}>{user.name}</Text>

            {/* Email */}
            <Text style={styles.email}>{user.email}</Text>

            {/* Bio */}
            <Text style={styles.bio}>{user.bio}</Text>

            {/* Followed Categories */}
            <View style={styles.followedCategoriesContainer}>
              <Text style={styles.followedCategoriesTitle}>
                Followed Categories:
              </Text>
              <View style={styles.categories}>
                {user.followedCategories.map((category, index) => (
                  <TouchableOpacity key={index} style={styles.categoryButton}>
                    <Text style={styles.categoryText}>{category}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Recent Articles */}
            <View style={styles.recentArticlesContainer}>
              <Text style={styles.recentArticlesTitle}>Recent Articles:</Text>
              {user.recentArticles.map((article, index) => (
                <View key={index} style={styles.articleItem}>
                  <Text style={styles.articleTitle}>{article.title}</Text>
                  <Text style={styles.articleTime}>{article.time}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={{ width: "80%", alignSelf: "center", flex: 1 }}>
            <AppFooter />
          </View>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightWhite, // Background color
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: "2%",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 80, // Space to prevent footer overlap
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.primary,
    marginTop: 10,
    textAlign: "center",
  },
  profileImageContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  avatar: {
    borderWidth: 4,
    borderColor: COLORS.primary, // Add a border around the avatar
  },
  name: {
    fontSize: 24,
    fontFamily: FONT.bold,
    color: COLORS.primary,
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    fontFamily: FONT.regular,
    color: COLORS.secondary,
    marginBottom: 20,
  },
  bio: {
    fontSize: 14,
    fontFamily: FONT.regular,
    color: COLORS.default,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  followedCategoriesContainer: {
    width: "100%",
    marginBottom: 20,
  },
  followedCategoriesTitle: {
    fontSize: 18,
    fontFamily: FONT.bold,
    color: COLORS.primary,
    marginBottom: 10,
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  categoryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    margin: 5,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: FONT.regular,
    color: COLORS.white,
  },
  recentArticlesContainer: {
    width: "100%",
    marginBottom: 20,
  },
  recentArticlesTitle: {
    fontSize: 18,
    fontFamily: FONT.bold,
    color: COLORS.primary,
    marginBottom: 10,
  },
  articleItem: {
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  articleTitle: {
    fontSize: 16,
    fontFamily: FONT.bold,
    color: COLORS.primary,
  },
  articleTime: {
    fontSize: 12,
    fontFamily: FONT.regular,
    color: COLORS.secondary,
    marginTop: 5,
  },
});

export default UserProfile;
