import { COLORS, FONT, SIZES } from "@/constants";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, { useSharedValue, useAnimatedScrollHandler } from "react-native-reanimated";
import SliderItem from "./SliderItem";
import * as Interface from "@/interface";
import service from "@/service";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("screen");

const AppLatest = () => {
  const scrollX = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState<Interface.INewsResponse[] | null>(null);  // Initially set to null

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  const onViewableItemsChanged = React.useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await service.apiService.latestNewsCollectionByNewsData();
        setData(fetchedData); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Latest News &#x27A4;</Text>

      {/* Show SkeletonLoader while data is loading */}
      {data === null ? (
        <View>
          {/* Skeleton Loader */}
          <View style={styles.skeletonItemContainer}>
            <View style={styles.skeletonImage} />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.8)"]}
              style={styles.skeletonOverlay}
            >
              <View style={styles.skeletonContentContainer}>
                <View style={styles.skeletonCategory} />
                <View style={styles.skeletonCategoryContainer}>
                  <View style={styles.skeletonCategory} />
                </View>
                <View style={styles.skeletonTitle} />
                <View style={styles.skeletonFooter}>
                  <View style={styles.skeletonAuthor} />
                  <View style={styles.skeletonTime} />
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>
      ) : (
        <Animated.FlatList
          data={data}
          renderItem={({ item, index }) => (
            <SliderItem item={item} index={index} scrollX={scrollX} />
          )}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        />
      )}

      <View style={styles.pagination}>
        {data?.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

// Skeleton Styles
const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "auto",
  },
  text: {
    top: 65,
    marginLeft: 20,
    alignSelf: "flex-start",
    fontSize: SIZES.xLarge,
    color: COLORS.default,
    fontFamily: FONT.bold,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLORS.primary, // Active dot color
  },
  inactiveDot: {
    backgroundColor: COLORS.default, // Inactive dot color
  },
  skeletonItemContainer: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: COLORS.lightWhite,
  },
  skeletonImage: {
    width: "100%",
    height: 200,
    backgroundColor: COLORS.gray,
  },
  skeletonOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%",
    padding: 16,
    justifyContent: "flex-end",
  },
  skeletonContentContainer: {
    justifyContent: "flex-end",
  },
  skeletonCategory: {
    height: 14,
    width: 80,
    backgroundColor: COLORS.gray,
    borderRadius: 5,
    marginBottom: 8,
  },
  skeletonCategoryContainer: {
    height: 14,
    width: 60,
    backgroundColor: COLORS.gray,
    borderRadius: 5,
    marginBottom: 8,
  },
  skeletonTitle: {
    height: 20,
    width: "70%",
    backgroundColor: COLORS.gray,
    borderRadius: 5,
    marginBottom: 12,
  },
  skeletonFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skeletonAuthor: {
    height: 14,
    width: 100,
    backgroundColor: COLORS.gray,
    borderRadius: 5,
  },
  skeletonTime: {
    height: 14,
    width: 50,
    backgroundColor: COLORS.gray,
    borderRadius: 5,
  },
});

export default AppLatest;
