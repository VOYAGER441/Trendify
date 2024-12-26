import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import { SearchBar, Avatar } from "@rneui/themed";
import { Stack } from "expo-router";
import { COLORS } from "@/constants";
import AppLatest from "@/components/AppLatest";
import AppAllNews from "@/components/AppAllNews";
import AppFooter from "@/components/AppFooter";
import { Provider as PaperProvider } from "react-native-paper";

const Index = () => {
  const [search, setSearch] = useState("");

  const updateSearch = (text: string) => {
    setSearch(text);
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.safeArea}>
        <Stack.Screen
          options={{
            headerTitle: "",
            headerTransparent: true,
            header: () => (
              <View style={styles.headerContainer}>
                <SearchBar
                  placeholder="Type Here..."
                  onChangeText={updateSearch}
                  value={search}
                  containerStyle={styles.searchContainer}
                  inputContainerStyle={styles.searchInputContainer}
                  inputStyle={{ color: "black" }}
                />
                <Avatar
                  rounded
                  title="MD"
                  size={40}
                  containerStyle={styles.avatarContainer}
                  titleStyle={styles.avatarTitle}
                  overlayContainerStyle={styles.avatarOverlay}
                />
              </View>
            ),
          }}
        />
        <View style={styles.mainContainer}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <AppLatest />
            <AppAllNews />
          </ScrollView>
          <View style={{width:"80%",alignSelf:'center',flex:1}}>
            <AppFooter />
          </View>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Ensure SafeAreaView takes up the full height
  },
  mainContainer: {
    flex: 1, // Ensures proper layout for the footer to stay at the bottom
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80, // Space to prevent overlap with footer
  },
  searchInputContainer: {
    backgroundColor: COLORS.gray2,
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
    backgroundColor: COLORS.gray2,
    padding: 2,
  },
  avatarTitle: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  avatarOverlay: {
    backgroundColor: COLORS.gray2,
  },
});

export default Index;
