import React, { useEffect, useState } from "react";
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

import SearchResultItem from "@/components/SearchResultItem";
import service from "@/service";

// Search Result Item Component

const Index = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [newsFeed, setNewsFeed] = useState<Interface.INewsResponse[]>([]); // News state

  // Fetch filtered news from G-News
  const fetchNews = async (query: string) => {
    const results = await service.apiService. searchByGNews(query);
    setNewsFeed(results);
  };

  useEffect(() => {
    if (searchQuery) fetchNews(searchQuery); // Fetch news on query change
  }, [searchQuery]);

  return (
    <PaperProvider>
      <SafeAreaView style={styles.safeArea}>
        <Stack.Screen options={{ headerShown: false }} />
        <AppSearch setSearchQuery={setSearchQuery} />
        <View style={styles.mainContainer}>
          <FlatList
            data={newsFeed}
            renderItem={({ item }) => (
              <SearchResultItem
                title={item.title}
                imageUrl={item.imageUrl}
                description={item.description}
                outerUrl={item.outerUrl}
                id={item.id}
                category={item.category}
                time={item.time}
                author={item.author}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.scrollContent}
          />
          <AppFooter />
        </View>
      </SafeAreaView>
    </PaperProvider>
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

export default Index;
