import React from "react";
import { SafeAreaView, FlatList, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import SearchResultItem from "@/components/SearchResultItem";
import AppSearch from "@/components/AppSearch";
import AppFooter from "@/components/AppFooter";
import { FONT } from "@/constants";

const Index = () => {
  const { query, results } = useLocalSearchParams(); // Get params from route

  // Ensure results is treated as a string (handle both string and string[] cases)
  const parsedResults = JSON.parse(
    Array.isArray(results) ? results[0] : results || "[]"
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerTransparent: true,
          header: () => <AppSearch />,
        }}
      />
      <Text style={styles.heading}>Search Results for: {query}</Text>
      {parsedResults.length > 0 ? (
        <FlatList
          data={parsedResults}
          renderItem={({ item }) => <SearchResultItem {...item} />}
          keyExtractor={(item, index) => `${item.id}-${index}`}
        />
      ) : (
        <Text style={styles.noResults}>No results found.</Text>
      )}
      <View style={{ width: "80%", alignSelf: "center", flex: 1 }}>
        <AppFooter />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 20, fontFamily:FONT.bold , marginBottom: 10,marginTop:60,textAlign:"center" },
  noResults: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
  safeArea: { flex: 1 },
});

export default Index;
