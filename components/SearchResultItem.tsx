import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Stack } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import AppFooter from "@/components/AppFooter";
import AppSearch from "@/components/AppSearch";
import { COLORS, FONT } from "@/constants";
import * as Interface from "@/interface";
import { newsData } from "@/mock/mock.data";


const SearchResultItem = (newsItem: Interface.INewsResponse) => {
    const truncatedDescription =
      newsItem.description.split(" ").slice(0, 5).join(" ") +
      (newsItem.description.split(" ").length > 5 ? "..." : "");
  
    return (
      <TouchableOpacity style={styles.resultItemContainer}>
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
    safeArea: {
      flex: 1,
      backgroundColor: COLORS.lightWhite,
    },
    mainContainer: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: 80,
      paddingHorizontal: 16,
      top: "12%",
    },
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

  
  export default SearchResultItem