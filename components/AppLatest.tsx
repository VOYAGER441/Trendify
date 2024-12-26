import { COLORS, FONT, SIZES } from "@/constants";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import SliderItem from "./SliderItem";

const { width } = Dimensions.get("screen");

export const ImageSliderData = [
  {
    title: "Breaking News: New Tech Innovations",
    category: "Technology",
    image: "https://cdn.pixabay.com/photo/2023/01/08/14/22/sample-7705346_640.jpg",
    time: "2024-12-18 09:00",
    author: "John Doe",
  },
  {
    title: "Latest Updates on AI Advancements",
    category: "AI",
    image: "https://cdn.pixabay.com/photo/2023/01/08/14/22/sample-7705346_640.jpg",
    time: "2024-12-18 10:30",
    author: "Jane Smith",
  },
  {
    title: "Latest Updates on AI Advancements",
    category: "AI",
    image: "https://cdn.pixabay.com/photo/2023/01/08/14/22/sample-7705346_640.jpg",
    time: "2024-12-18 10:30",
    author: "Jane Smith",
  },
  {
    title: "Latest Updates on AI Advancements",
    category: "AI",
    image: "https://cdn.pixabay.com/photo/2023/01/08/14/22/sample-7705346_640.jpg",
    time: "2024-12-18 10:30",
    author: "Jane Smith",
  },
  {
    title: "Latest Updates on AI Advancements",
    category: "AI",
    image: "https://cdn.pixabay.com/photo/2023/01/08/14/22/sample-7705346_640.jpg",
    time: "2024-12-18 10:30",
    author: "Jane Smith",
  },
  {
    title: "Latest Updates on AI Advancements",
    category: "AI",
    image: "https://cdn.pixabay.com/photo/2023/01/08/14/22/sample-7705346_640.jpg",
    time: "2024-12-18 10:30",
    author: "Jane Smith",
  },
  {
    title: "Latest Updates on AI Advancements",
    category: "AI",
    image: "https://cdn.pixabay.com/photo/2023/01/08/14/22/sample-7705346_640.jpg",
    time: "2024-12-18 10:30",
    author: "Jane Smith",
  },
  {
    title: "Latest Updates on AI Advancements",
    category: "AI",
    image: "https://cdn.pixabay.com/photo/2023/01/08/14/22/sample-7705346_640.jpg",
    time: "2024-12-18 10:30",
    author: "Jane Smith",
  },
  {
    title: "Latest Updates on AI Advancements",
    category: "AI",
    image: "https://cdn.pixabay.com/photo/2023/01/08/14/22/sample-7705346_640.jpg",
    time: "2024-12-18 10:30",
    author: "Jane Smith",
  },
  // Add more data items...
];

const AppLatest = () => {
  const scrollX = useSharedValue(0); // SharedValue to track scroll position
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current page index
  const [data, setData] = useState(ImageSliderData); // Initialize `data` as an array

  // Scroll handler for updating the scrollX value
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  // Handler to track visible items and update the current index
  const onViewableItemsChanged = React.useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Latest News &#x27A4;</Text>

      {/* Image Slider */}
      <Animated.FlatList
        data={data}
        renderItem={({ item, index }) => (
          <SliderItem item={item} index={index} scrollX={scrollX} />
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={scrollHandler} // Attach scroll handler
        scrollEventThrottle={16}
        // onEndReached={() => setData((prevData) => [...prevData, ...ImageSliderData])} // Append new data
        // onEndReachedThreshold={0.5}
        onViewableItemsChanged={onViewableItemsChanged} // Track visible items
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {data.map((_, index) => (
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
    backgroundColor: COLORS.tertiary, // Inactive dot color
  },
});

export default AppLatest;
