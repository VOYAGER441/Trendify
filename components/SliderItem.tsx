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

export type ImageSliderType = {
  title: string;
  image: string;
  category: string;
  time: string;
  author: string;
};

type Props = {
  item: ImageSliderType;
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
      transform: [
        { translateX },
        { scale },
      ],
    };
  });

  return (
    <Animated.View style={[styles.itemContainer, animationsStyle]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.overlay}
      >
        <TouchableOpacity>
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
    // flex:1,
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
});

export default SliderItem;

