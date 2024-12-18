import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SIZES, COLORS, FONT } from "@/constants";

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
    img: "https://images.unsplash.com/photo-1535689182613-62e5d0cc1eec?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDl8fG5ld3N8ZW58MHx8fHwxNjg5MjM1NzE5&ixlib=rb-1.2.1&q=80&w=1080",
    title: "Technology Advances: A New Era",
    description:
      "The latest breakthrough in technology is set to change the world. Find out what’s new and how it will affect us.",
    date: "Dec 18, 2024",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1600302648684-b46467e3da72?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDkxfG5ld3N8ZW58MHx8fHwxNjg5MjM1NzE5&ixlib=rb-1.2.1&q=80&w=1080",
    title: "Global News: Earthquake Strikes",
    description:
      "A massive earthquake has struck the city. Here are the updates and the current situation on the ground.",
    date: "Dec 17, 2024",
  },
];

const AllNewsCard = () => {
  return (
    <View style={styles.content}>
      <Text style={styles.text}>ALL News &#x27A4;</Text>
      {newsData.map(({ id, img, title, description, date }) => (
        <TouchableOpacity key={id}>
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <Image
                alt=""
                resizeMode="cover"
                style={styles.cardImg}
                source={{ uri: img }}
              />

                <Text style={styles.cardTitle}>{title}</Text>

            </View>

            <View style={styles.cardBody}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardDate}>{date}</Text>
              </View>

              <Text style={styles.cardDescription}>{description}</Text>
            </View>

            <View style={styles.cardFooter}>
              <AntDesign name="doubleright" size={24} color="black" />
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default AllNewsCard;

const styles = StyleSheet.create({
  content: {
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  text: {
    // top: 5,
    marginLeft: 10,
    alignSelf: "flex-start",
    fontSize: SIZES.xLarge,
    color: COLORS.default,
    fontFamily: FONT.bold,

  },
  card: {
    position: "relative",
    borderRadius: 30,
    backgroundColor: COLORS.lightWhite,
    marginBottom: 16,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginTop:10,
    // fontFamily:
  },
  cardTop: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  cardImg: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  cardBody: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#232425",
    marginRight: "auto",
    fontFamily:FONT.bold
  },
  cardDate: {
    fontSize: 12,
    color: "#595a63",
  },
  cardDescription: {
    marginTop: 8,
    fontSize: 14,
    color: "#595a63",
  },
  cardFooter: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
