import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { color } from "@rneui/base";
import { COLORS, FONT } from "@/constants";

type ImageSliderType = {
  title: string;
  image: string;
  category: string;
  time: string;
  author: string;
};

type Props = {
  item: ImageSliderType;
  index: number;
};

const { width } = Dimensions.get("screen");

const SliderItem = ({ item, index }: Props) => {
  return (
    <View style={style.itemContainer}>
      <Image
        source={{ uri: item.image }}
        style={{ width: 300, height: 300, borderRadius: 40 }}
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={style.back}
      >
        <View>
          <View style={style.categoryContainer}>
            <Text style={[style.textContainer, style.category]}>
              {item.category}
            </Text>
          </View>
          <View style={style.titleContainer}>
            <Text style={[style.textContainer, style.title]}>{item.title}</Text>
          </View>
          {/* <Text>{item.}</Text> */}
          <View style={style.authTimeContainer}>
            <Text style={[style.textContainer, style.authTime]}>
              {item.author}
            </Text>
            <Text style={[style.textContainer, style.authTime]}>
              {item.time}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const style = StyleSheet.create({
  itemContainer: {
    // justifyContent: "center",
    alignItems: "center",
    gap: 20,
    width: width,
    top: 100,
  },
  back: {
    position: "absolute",
    height: 300,
    width: 300,
    padding: 20,
    borderRadius: 40,
  },
  textContainer: {
    color: COLORS.tertiary,
    fontFamily: FONT.bold,
  },
  category: {
    // color:COLORS.tertiary
    textAlign: "center",
  },
  title: {
    textAlign: "left",
    // left:0,
  },
  categoryContainer: {
    backgroundColor: COLORS.primary,
    width: 100,
    borderRadius: 40,
    top: -10,
  },
  titleContainer: {
    width: 100,
    bottom: -100,
  },
  authTime: {
    textAlign: "right",
    zIndex:2,
    // position:"static"
  },
  authTimeContainer: {
    bottom:-100,
    position:"fixed",
  },
});

export default SliderItem;
