import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import { SearchBar, Avatar } from "@rneui/themed";
import { Stack } from "expo-router";
import { COLORS } from "@/constants";
import AppLatest from "@/components/AppLatest";
import AppAllNews from "@/components/AppAllNews";
import AppFooter from "@/components/AppFooter";
import { Provider as PaperProvider } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import AppSearch from "@/components/AppSearch";

const Index = () => {
  const [search, setSearch] = useState("");

  const updateSearch = (text: string) => {
    setSearch(text);
  };

  return (
    <LinearGradient
      colors={["#e64777", "#e377ab", "#d9a0ce", "#d6c4e0", "#e3e3e3"]} // Gradient colors
      start={{ x: 0, y: 0 }} // Start from bottom-left
      end={{ x: 0, y: 0 }} // End at top-right (creating a "to right top" effect)
      style={styles.gradientBackground}
    >
      <PaperProvider>
        <SafeAreaView style={styles.safeArea}>
          <Stack.Screen
            options={{
              headerTitle: "",
              headerTransparent: true,
              header: () => <AppSearch />,
            }}
          />
          <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <AppLatest />
              <AppAllNews />
            </ScrollView>
            <View style={{ width: "80%", alignSelf: "center", flex: 1 }}>
              <AppFooter />
            </View>
          </View>
        </SafeAreaView>
      </PaperProvider>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Ensure SafeAreaView takes up the full height
  },
  gradientBackground: {
    flex: 1, // Make sure it fills the screen
    justifyContent: "center", // Center the content
    alignItems: "center", // Center horizontally
  },
  mainContainer: {
    flex: 1, // Ensures proper layout for the footer to stay at the bottom
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80, // Space to prevent overlap with footer
  },
  searchInputContainer: {
    backgroundColor: COLORS.lightWhite,
    borderRadius: 40,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchContainer: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  avatarContainer: {
    marginRight: 10,
    backgroundColor: COLORS.lightWhite,
    padding: 2,
  },
  avatarTitle: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  avatarOverlay: {
    backgroundColor: COLORS.lightWhite,
  },
});

export default Index;
