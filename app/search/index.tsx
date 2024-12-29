import React from "react";
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
// Search Result Item Component
const SearchResultItem = ({
  title,
  imageUrl,
  description,
  outerUrl,
}: Interface.INewsResponse) => {
  // Limit description to 10 words
  const truncatedDescription = description.split(" ").slice(0, 5).join(" ") + (description.split(" ").length > 5 ? "..." : "");

  return (
    <TouchableOpacity
      style={styles.resultItemContainer}
      onPress={() => console.log(`Navigating to: ${outerUrl}`)}
    >
      {/* Left side Image */}
      <Image source={{ uri: imageUrl }} style={styles.resultImage} />

      {/* Right side Content */}
      <View style={styles.resultContent}>
        <Text style={styles.resultTitle}>{title}</Text>
        <Text style={styles.resultDescription}>{truncatedDescription}</Text>
        <Text style={styles.resultLink}>{outerUrl}</Text>
      </View>
    </TouchableOpacity>
  );
};


const Index = () => {
  

  return (
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
          {/* FlatList for rendering SearchResultItem */}
          <FlatList
            data={newsData} // Passing the news data to FlatList
            renderItem={({ item }) => (
              <SearchResultItem
                title={item.title}
                imageUrl={item.imageUrl}
                description={item.description}
                outerUrl={item.outerUrl}
                id={""}
                category={[]}
                time={""}
                author={""}
              />
            )}
            keyExtractor={(item, index) => `news-${index}`} // Unique key for each item
            contentContainerStyle={styles.scrollContent}
          />

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
    backgroundColor: COLORS.lightWhite,
  },
  mainContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80, // Space for the footer
    paddingHorizontal: 16,
    top: "12%",
  },
  resultItemContainer: {
    flexDirection: "row", // Layout for image on left and text on right
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
    marginRight: 12, // Space between image and text
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
