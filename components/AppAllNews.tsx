import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SIZES, COLORS, FONT } from "@/constants";
import { RelativePathString, router } from "expo-router";

const newsData = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDd8fG5ld3N8ZW58MHx8fHwxNjg5MjM1NzE5&ixlib=rb-1.2.1&q=80&w=1080",
    title: "Breaking News: Local Event Happens",
    description:
      "A major local event is happening this week in your city. Click to read more about the event happening tomorrow!",
    date: "Dec 19, 2024",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDd8fG5ld3N8ZW58MHx8fHwxNjg5MjM1NzE5&ixlib=rb-1.2.1&q=80&w=1080",
    title: "Technology Advances: A New Era",
    description:
      "The latest breakthrough in technology is set to change the world. Find out what’s new and how it will affect us.",
    date: "Dec 18, 2024",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDd8fG5ld3N8ZW58MHx8fHwxNjg5MjM1NzE5&ixlib=rb-1.2.1&q=80&w=1080",
    title: "Global News: Earthquake Strikes",
    description:
      "A massive earthquake has struck the city. Here are the updates and the current situation on the ground.",
    date: "Dec 17, 2024",
  },
];



const AllNewsCard = () => {

const handleOnPress=()=>{
  router.push('/news' as RelativePathString)
}

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>ALL News &#x27A4;</Text>
      {newsData.map(({ id, img, title, description, date }) => (
        <TouchableOpacity key={id} style={styles.card} onPress={handleOnPress}>
          <Image source={{ uri: img }} style={styles.image} />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={styles.overlay}
          >
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
              <View style={styles.footer}>
                <Text style={styles.date}>{date}</Text>
                <AntDesign name="doubleright" size={20} color={COLORS.tertiary} />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    // backgroundColor: COLORS.lightWhite,
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
  date: {
    fontSize: 12,
    color: COLORS.tertiary,
    fontFamily: FONT.regular,
  },
});

export default AllNewsCard;
