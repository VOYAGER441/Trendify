import { COLORS, FONT, SIZES } from "@/constants";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import SliderItem from "./SliderItem";

const ImageSliderData = [
  {
    title: "Breaking News: New Tech Innovations",
    category: "Technology",
    image: "/assets/images/logo-color.png",
    time: "2024-12-18 09:00",
    author: "John Doe",
  },
  {
    title: "Latest Updates on AI Advancements",
    category: "AI",
    image: "/assets/images/logo-color.png",
    time: "2024-12-18 10:30",
    author: "Jane Smith",
  },
  {
    title: "New Trends in Mobile App Development",
    category: "Mobile",
    image: "/assets/images/logo-color.png",
    time: "2024-12-18 11:45",
    author: "Alice Johnson",
  },
  {
    title: "Exploring the Future of Virtual Reality",
    category: "Virtual Reality",
    image: "/assets/images/logo-color.png",
    time: "2024-12-18 13:00",
    author: "Bob Brown",
  },
  {
    title: "Cybersecurity in 2024: What You Need to Know",
    category: "Cybersecurity",
    image: "/assets/images/logo-color.png",
    time: "2024-12-18 14:15",
    author: "Charlie Green",
  },
  {
    title: "Cloud Computing: The Future of Data Storage",
    category: "Cloud",
    image: "/assets/images/logo-color.png",
    time: "2024-12-18 15:30",
    author: "Diana White",
  },
  {
    title: "The Impact of 5G on Global Connectivity",
    category: "Telecommunications",
    image: "/assets/images/logo-color.png",
    time: "2024-12-18 16:45",
    author: "Ethan Black",
  },
  {
    title: "Blockchain: Revolutionizing Industries",
    category: "Blockchain",
    image: "/assets/images/logo-color.png",
    time: "2024-12-18 17:30",
    author: "Fayla Harris",
  },
  {
    title: "How Quantum Computing is Shaping the Future",
    category: "Quantum Computing",
    image: "/assets/images/logo-color.png",
    time: "2024-12-18 18:00",
    author: "George King",
  },
  {
    title: "The Rise of Smart Cities",
    category: "Smart Cities",
    image: "/assets/images/logo-color.png",
    time: "2024-12-18 19:00",
    author: "Hannah Lee",
  },
  {
    title: "Exploring New Frontiers in Space Technology",
    category: "Space Technology",
    image: "/assets/images/logo-color.png",
    time: "2024-12-18 20:30",
    author: "Ian Scott",
  },
];

const AppLatest = () => {
  return (
    <View style={styles.container}>
      {/* Main Content */}
      <Text style={styles.text}>Latest News</Text>
      <View>
        <FlatList
          data={ImageSliderData}
          renderItem={({ item, index }) => (
            <SliderItem item={item} index={index} />
          )}
          keyExtractor={(item, index) => index.toString()} // Ensure each item has a unique key
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // Explicitly make it take full width
    height: "auto", // Let height adjust
  },
  text: {
    top: 70,
    left: -50,
    fontSize: SIZES.xxLarge,
    color: COLORS.default,
    fontFamily: FONT.bold,
  },
});

export default AppLatest;
