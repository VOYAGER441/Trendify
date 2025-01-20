import React, { useCallback, useState } from "react";
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { interpolate } from "react-native-reanimated";
import { RelativePathString, router, useRouter } from "expo-router";
import { COLORS, FONT } from "@/constants";
import { newsCategories } from "@/constants"; // Assuming this is imported from constants
import service from "@/service";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const window = {
  width: SCREEN_WIDTH,
  height: 740,
};
const SlideItem = ({ category }: any) => {
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  const handleOnPress = async (categoryName: string) => {
    try {
      if (!categoryName) return; // Prevent empty search
      setLoading(true); // Show loading indicator
      console.log("Search triggered with:", categoryName);

      // Fetch search results
      let results = await service.apiService.searchByGNews(categoryName);

      

      // Navigate to search results screen with query and results
      router.push({
        pathname: "/searchResults",
        params: { query: categoryName, results: JSON.stringify(results) },
      });
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <View style={styles.slideItemContainer}>
      <TouchableOpacity onPress={() => handleOnPress(category.name)}>
        <View style={styles.cardContainer}>
          <Image source={{ uri: category.image }} style={styles.image} />
          <Text style={styles.cardText}>{category.name}</Text>
        </View>
      </TouchableOpacity>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

const CarouselComponent = () => {
  const scale = 0.8;
  const RIGHT_OFFSET = window.width * (1 - scale);
  const ITEM_WIDTH = (window.width * scale) / 1.2;
  const ITEM_HEIGHT = 120;

  const animationStyle = useCallback((value: number) => {
    "worklet";
    const translateY = interpolate(value, [-1, 0, 1], [-ITEM_HEIGHT, 0, ITEM_HEIGHT]);
    const right = interpolate(value, [-1, -0.1, 1], [RIGHT_OFFSET / 2, RIGHT_OFFSET, RIGHT_OFFSET / 3]);

    return {
      transform: [{ translateY }],
      right,
    };
  }, []);

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        loop
        vertical
        style={styles.carousel}
        width={ITEM_WIDTH}
        pagingEnabled={false}
        height={ITEM_HEIGHT}
        data={newsCategories}
        renderItem={({ item }) => (
          <View key={item.name} style={styles.slideContainer}>
            <SlideItem category={item} />
          </View>
        )}
        customAnimation={animationStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  slideItemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    width: window.width / 1.3,
    height: 100,
    borderRadius: 10,
    backgroundColor: COLORS.lightWhite,
    elevation: 5,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  cardText: {
    position: "absolute",
    top: 10,
    left: 10,
    color: COLORS.default,
    fontSize: 20,
    fontFamily: FONT.bold,
    zIndex: 5,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 3,
  },
  carouselContainer: {
    marginVertical: 20,
  },
  carousel: {
    justifyContent: "center",
    width: SCREEN_WIDTH,
    height: window.height,
  },
  slideContainer: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
});

export default CarouselComponent;
