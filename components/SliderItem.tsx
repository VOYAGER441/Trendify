import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import { COLORS, FONT } from "@/constants";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { router } from "expo-router";
import * as Interface from "@/interface";

const SkeletonLoader = () => {
  const skeletonArray = Array.from({ length: 5 }); // Number of skeleton items to display

  return (
    <View>
      {skeletonArray.map((_, index) => (
        <View key={index} style={styles.skeletonItemContainer}>
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
      ))}
    </View>
  );
};

type Props = {
  item: Interface.INewsResponse;
  index: number;
  scrollX: Animated.SharedValue<number>;
};

const { width } = Dimensions.get("screen");

const SliderItem = ({ item, index, scrollX }: Props) => {
  // Animated style for parallax effect
  const animationsStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [-width * 0.35, 0, width * 0.35],
      Extrapolate.CLAMP
    );

    const scale = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.8, 1, 0.8],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateX }, { scale }],
    };
  });

  const handleOnPress = (newsItem: Interface.INewsResponse) => {
    router.push({
      pathname: "/news", // The destination page
      params: { news: JSON.stringify(newsItem) }, // Pass the data as params
    });
  };

  return (
    <Animated.View style={[styles.itemContainer, animationsStyle]}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.overlay}
      >
        <TouchableOpacity onPress={() => handleOnPress(item)}>
          <View style={styles.contentContainer}>
            <Text style={styles.category}>Top 10 🔥</Text>
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>{item.category}</Text>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.footer}>
              <Text style={styles.author}>{item.author}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: "center",
    width: width,
    marginTop: 70,
  },
  image: {
    width: 340,
    height: 340,
    borderRadius: 30,
  },
  overlay: {
    position: "absolute",
    width: 340,
    height: 340,
    borderRadius: 30,
    padding: 16,
    justifyContent: "flex-end",
  },
  contentContainer: {
    gap: 10,
  },
  categoryContainer: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  category: {
    color: COLORS.tertiary,
    fontFamily: FONT.bold,
    fontSize: 12,
  },
  title: {
    color: COLORS.tertiary,
    fontFamily: FONT.bold,
    fontSize: 16,
    marginTop: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  author: {
    color: COLORS.tertiary,
    fontFamily: FONT.regular,
    fontSize: 12,
  },
  time: {
    color: COLORS.tertiary,
    fontFamily: FONT.regular,
    fontSize: 12,
  },

  // Skeleton loader styles
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

export default SliderItem;
