import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  ScrollView,
  View,
} from "react-native";
import { SearchBar, Avatar } from "@rneui/themed"; // Correct import
import { Stack } from "expo-router";
import { COLORS, SIZES } from "@/constants";
import { TextInput } from "react-native";
import AppLatest from "@/components/AppLatest";
// import { Avatar } from 'react-native-elements';

const Index = () => {
  const [search, setSearch] = useState("");

  const updateSearch = (text: string) => {
    setSearch(text + "");
  };

  return (
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

      <ImageBackground
        source={require("../../assets/images/home.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <View style={{ width: "100%" }}>
            <AppLatest />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flexGrow: 1,
    width: "100%",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    zIndex: -999,
  },
  container: {
    flexGrow: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // padding: 20,
    // top: 50,
    width: "100%",
  },
  searchInputContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 40,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Ensures proper spacing
    paddingHorizontal: 16,
    paddingVertical: 8,
    // backgroundColor: "white",
    // borderBottomWidth: 1,
    // borderColor: "#ddd",
  },
  searchContainer: {
    flex: 1, // Allow the SearchBar to take available space
    marginRight: 10, // Space between the SearchBar and the Avatar
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  avatarContainer: {
    marginRight: 10,
    backgroundColor: COLORS.primary,
  },
  avatarTitle: {
    color: COLORS.primary, // Set the color of the initials text
    fontWeight: "bold", // Make the initials bold
  },
  avatarOverlay: {
    backgroundColor: COLORS.white, // Background color for the avatar
  },
});

export default Index;
