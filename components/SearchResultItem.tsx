import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, FONT } from "@/constants";
import * as Interface from "@/interface";

const SearchResultItem = (newsItem: Interface.INewsResponse) => {
  const router = useRouter();

  // Safely handle the description
  const truncatedDescription = newsItem.description
    ? newsItem.description.split(" ").slice(0, 10).join(" ") +
      (newsItem.description.split(" ").length > 10 ? "..." : "")
    : "No description available";

  const handleOnPress = (newsItem: Interface.INewsResponse) => {
    router.push({
      pathname: "/news", // The destination page
      params: { news: JSON.stringify(newsItem) }, // Pass the data as params
    });
  };

  return (
    <TouchableOpacity
      style={styles.resultItemContainer}
      onPress={() => handleOnPress(newsItem)}
    >
      <Image source={{ uri: newsItem.imageUrl }} style={styles.resultImage} />
      <View style={styles.resultContent}>
        <Text style={styles.resultTitle}>{newsItem.title}</Text>
        <Text style={styles.resultDescription}>{truncatedDescription}</Text>
        <Text style={styles.resultLink}>{newsItem.outerUrl}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  resultItemContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  resultImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  resultContent: {
    flex: 1,
    justifyContent: "center",
  },
  resultTitle: {
    fontFamily: FONT.bold,
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 6,
  },
  resultDescription: {
    fontFamily: FONT.regular,
    fontSize: 14,
    color: COLORS.default,
    marginBottom: 6,
  },
  resultLink: {
    fontFamily: FONT.regular,
    fontSize: 12,
    color: COLORS.secondary,
  },
});

export default SearchResultItem;
