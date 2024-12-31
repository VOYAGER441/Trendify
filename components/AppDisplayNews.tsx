import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONT } from "@/constants";
import { Link, RelativePathString } from "expo-router";
import * as Interface from "@/interface";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

type Props = {
  item: Interface.INewsResponse;
};

// Dynamic word limit calculation based on screen height
const calculateWordLimit = () => Math.floor(SCREEN_HEIGHT / 12);

const AppDisplayNews = ({ item }: Props) => {
  const wordLimit = calculateWordLimit();

  return (
    <View style={styles.container}>
      {/* News Image */}
      <Image source={{ uri: item.imageUrl }} style={styles.image} />

      {/* Overlay Gradient */}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.overlay}
      >
        <View style={styles.contentContainer}>
          {/* Category */}
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{item.category}</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>{item.title}</Text>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Description */}
      <View style={styles.descriptionBox}>
        <Text style={styles.descriptionText}>
          {item.description
            ? item.description.split(" ").slice(0, wordLimit).join(" ") +
              (item.description.split(" ").length > wordLimit ? "..." : "")
            : "No description available"}
        </Text>
      </View>

      {/* More Details Button */}
      <TouchableOpacity style={styles.moreContent}>
        <Link href={`${item.outerUrl}` as RelativePathString}>
          <Text
            style={{ textAlign: "center", fontFamily: FONT.bold, fontSize: 11 }}
          >
            More Details
          </Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT, // Fullscreen height for each news item
    // justifyContent: "center",
    alignItems: "center",
    top: "10%",
  },
  image: {
    width: SCREEN_WIDTH - 30,
    height: 350, // Cover half the screen height
    borderRadius: 20,
  },
  overlay: {
    position: "absolute",
    width: SCREEN_WIDTH - 30,
    height: 350,
    borderRadius: 20,
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
    fontSize: 20,
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
    fontSize: 14,
  },
  time: {
    color: COLORS.tertiary,
    fontFamily: FONT.regular,
    fontSize: 14,
  },
  descriptionBox: {
    width: SCREEN_WIDTH - 30,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f8f9fa",
    alignSelf: "center",
  },
  descriptionText: {
    textAlign: "left",
    fontSize: 14,
    color: "#333",
  },
  moreContent: {
    backgroundColor: COLORS.white,
    borderRadius: 50,
    width: 60,
    height: 60,
    position: "absolute",
    right: 20,
    bottom: 250,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#e64777",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 53,
    elevation: 9,
    zIndex: 2,
    padding: 5,
  },
});

export default AppDisplayNews;
