import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SIZES, COLORS, FONT } from "@/constants";
import { useRouter } from "expo-router";
import * as Interface from "@/interface";
import { newsData } from "@/mock/mock.data";

const AllNewsCard = () => {
  const router = useRouter();

  const handleOnPress = (newsItem: Interface.INewsResponse) => {
    router.push({
      pathname: "/news", // Destination page
      params: { news: JSON.stringify(newsItem) }, // Passing the selected news item as params
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>ALL News &#x27A4;</Text>
      {newsData.map(
        ({
          id,
          imageUrl,
          title,
          description,
          time,
          category,
          author,
          outerUrl,
        }) => (
          <TouchableOpacity
            key={id}
            style={styles.card}
            onPress={() =>
              handleOnPress({
                id,
                imageUrl,
                title,
                description,
                time,
                category,
                author,
                outerUrl,
              })
            }
          >
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.8)"]}
              style={styles.overlay}
            >
              <View style={styles.contentContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                <View style={styles.footer}>
                  <Text style={styles.time}>{time}</Text>
                  <AntDesign
                    name="doubleright"
                    size={20}
                    color={COLORS.tertiary}
                  />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headerText: {
    fontSize: SIZES.xLarge,
    color: COLORS.default,
    fontFamily: FONT.bold,
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 200,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%",
    padding: 16,
    justifyContent: "flex-end",
  },
  contentContainer: {
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 16,
    fontFamily: FONT.bold,
    color: COLORS.tertiary,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: FONT.regular,
    color: COLORS.tertiary,
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  time: {
    fontSize: 12,
    color: COLORS.tertiary,
    fontFamily: FONT.regular,
  },
});

export default AllNewsCard;
