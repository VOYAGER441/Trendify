import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
} from "react-native";
import { Stack } from "expo-router";
import { COLORS } from "@/constants";
import AppFooter from "@/components/AppFooter";
import Carousel from "react-native-reanimated-carousel";
import { interpolate } from "react-native-reanimated";

// Constants for window dimensions
const window = {
  width: 360, // Replace with actual device width dynamically if needed
  height: 740, // Replace with actual device height dynamically if needed
};

// A reusable SlideItem component
const SlideItem = ({ category }: any) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        elevation: 5, // Adds shadow for Android
        shadowColor: "#000", // Adds shadow for iOS
        shadowOpacity: 0.2,
        shadowRadius: 5,
      }}
    >
      <Text style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>
        {category.name}
      </Text>
      <Image
        source={{ uri: category.image }}
        style={{
          width: 150,
          height: 100,
          borderRadius: 10,
          marginTop: 10,
        }}
        resizeMode="cover"
      >
        
      </Image>
    </View>
  );
};

// Static news categories array
const newsCategories = [
  { name: "Politics", image: "https://example.com/politics.jpg" },
  { name: "Sports", image: "https://example.com/sports.jpg" },
  { name: "Technology", image: "https://example.com/technology.jpg" },
  { name: "Health", image: "https://example.com/health.jpg" },
  { name: "Entertainment", image: "https://example.com/entertainment.jpg" },
  { name: "Business", image: "https://example.com/business.jpg" },
  { name: "Science", image: "https://example.com/science.jpg" },
  { name: "Travel", image: "https://example.com/travel.jpg" },
];

const Index = () => {
  const [search, setSearch] = useState("");

  // Carousel dimensions
  const headerHeight = 100;
  const scale = 0.9;
  const RIGHT_OFFSET = window.width * (1 - scale);
  const ITEM_WIDTH = window.width * scale;
  const ITEM_HEIGHT = 120;
  const PAGE_HEIGHT = window.height - headerHeight;
  const PAGE_WIDTH = window.width;

  // Animation style for the carousel
  const animationStyle = React.useCallback((value: number) => {
    "worklet";

    const translateY = interpolate(
      value,
      [-1, 0, 1],
      [-ITEM_HEIGHT, 0, ITEM_HEIGHT]
    );
    const right = interpolate(
      value,
      [-1, -0.2, 1],
      [RIGHT_OFFSET / 2, RIGHT_OFFSET, RIGHT_OFFSET / 3]
    );

    return {
      transform: [{ translateY }],
      right,
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerTransparent: true,
          header: () => <View style={styles.headerContainer}></View>,
        }}
      />
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Carousel Component */}
          <View style={{ marginVertical: 20 }}>
            <Carousel
              loop
              vertical
              style={{
                justifyContent: "center",
                width: PAGE_WIDTH,
                height: PAGE_HEIGHT,
              }}
              width={ITEM_WIDTH}
              pagingEnabled={false}
              height={ITEM_HEIGHT}
              data={newsCategories}
              renderItem={({ item }) => (
                <View key={item.name} style={{ flex: 1, padding: 10 }}>
                  <SlideItem category={item} />
                </View>
              )}
              customAnimation={animationStyle}
            />
          </View>
        </ScrollView>
        {/* Footer Component */}
        <View style={{ width: "80%", alignSelf: "center", flex: 1 }}>
          <AppFooter />
        </View>
      </View>
    </SafeAreaView>
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default Index;
