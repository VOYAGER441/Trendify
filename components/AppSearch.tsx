import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { RelativePathString, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import service from "@/service";
import { COLORS } from "@/constants";

const AppSearch = () => {
  const [search, setSearch] = useState("");
  const router = useRouter(); // Router for navigation

  const handleSearch = async () => {
    try {
      const trimmedSearch = search.trim();
      if (!trimmedSearch) return; // Prevent empty search
      console.log("Search triggered with:", trimmedSearch);

      // Fetch search results
      const results = await service.apiService.searchByGNews(trimmedSearch);

      // Navigate to search results screen with query and results
      router.push({
        pathname: "/searchResults" as RelativePathString,
        params: { query: trimmedSearch, results: JSON.stringify(results) }, // Stringify results for safe navigation
      });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <View style={styles.headerContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Search Here..."
        placeholderTextColor={COLORS.gray}
        onChangeText={setSearch}
        value={search}
      />
      <TouchableOpacity style={styles.iconButton} onPress={handleSearch}>
        <MaterialCommunityIcons
          name="magnify"
          size={24}
          color={COLORS.white}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: { flexDirection: "row", alignItems: "center", padding: 10, },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 20,
    padding: 8,
  },
  iconButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppSearch;
