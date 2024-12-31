import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, FlatList, View, Text } from "react-native";
import { PaperProvider } from "react-native-paper";
import AppSearch from "@/components/AppSearch";
import service from "@/service";
import * as Interface from "@/interface";
import { Stack } from "expo-router";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const [newsFeed, setNewsFeed] = useState<Interface.INewsResponse[]>([]); // State for news data

  // Fetch filtered news based on search query
  const fetchNews = async (query: string) => {
    const results = await service.apiService.searchByGNews(query);
    setNewsFeed(results);
  };

  useEffect(() => {
    if (searchQuery) {
      fetchNews(searchQuery); // Fetch news when search query changes
    }
  }, [searchQuery]);

  return (
    <PaperProvider>
      <SafeAreaView style={styles.safeArea}>
        <Stack.Screen
          options={{
            headerTitle: "",
            headerTransparent: true,
            header: () => <AppSearch />,
          }}
        />{" "}
        {/* Pass setSearchQuery here */}
        <View style={styles.mainContainer}>
          {/* Render news feed based on search results */}
          <FlatList
            data={newsFeed}
            renderItem={({ item }) => (
              <Text key={item.id}>{item.title}</Text> // Render news titles
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  mainContainer: { flex: 1, padding: 16 },
});

export default Index;
