import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { RelativePathString, router, Stack } from "expo-router";
import { COLORS, FONT } from "@/constants";
import AppFooter from "@/components/AppFooter";
import Carousel from "react-native-reanimated-carousel";
import { interpolate } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import AppSearch from "@/components/AppSearch";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");
// Constants for window dimensions
const window = {
  width: SCREEN_WIDTH, // Replace with actual device width dynamically if needed
  height: 830, // Replace with actual device height dynamically if needed
};

// A reusable SlideItem component
const SlideItem = ({ category }: any) => {


 const handleOnPress =()=>{
  router.push('/search' as RelativePathString)
 }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Shadow Container */}
      <TouchableOpacity onPress={handleOnPress}>
        <View
          style={{
            width: window.width / 1.3,
            height: 100,
            borderRadius: 10,
            backgroundColor: COLORS.lightWhite,
            // Adds shadow for Android
            elevation: 5,
            // Adds shadow for iOS
            shadowColor: COLORS.primary,
            shadowOpacity: 0.2,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 5 },
          }}
        >
          {/* Image */}
          <Image
            source={{ uri: category.image }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 10,
            }}
            resizeMode="cover"
          />
          {/* Text Overlay */}
          <Text
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              color: COLORS.tertiary,
              fontSize: 20,
              fontFamily: FONT.bold,
              // fontWeight: "bold",
              zIndex: 5,
              textShadowColor: "rgba(0, 0, 0, 0.5)",
              textShadowOffset: { width: 0.5, height: 0.5 },
              textShadowRadius: 3,
            }}
          >
            {category.name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

// Static news categories array
const newsCategories = [
  {
    name: "Politics",
    image:
      "https://plus.unsplash.com/premium_photo-1682308447000-c0f53c7fbb90?q=80&w=2011&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Sports",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Technology",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    name: "Health",
    image:
      "https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Entertainment",
    image:
      "https://plus.unsplash.com/premium_photo-1710409625244-e9ed7e98f67b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Business",
    image:
      "https://plus.unsplash.com/premium_photo-1661277816311-28cced31f998?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Science",
    image:
      "https://plus.unsplash.com/premium_photo-1661432575489-b0400f4fea58?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Travel",
    image:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
];

const Index = () => {
  // Carousel dimensions
  const headerHeight = 100;
  const scale = 0.8;
  const RIGHT_OFFSET = window.width * (1 - scale);
  const ITEM_WIDTH = (window.width * scale) / 1.2;
  const ITEM_HEIGHT = 120;
  const PAGE_HEIGHT = window.height - headerHeight;
  const PAGE_WIDTH = window.width;

  // Animation style for the carousel
  const animationStyle = React.useCallback((value: number) => {
    "worklet";

    const translateY = interpolate(
      value,
      [-1, 0, 1],
      [-ITEM_HEIGHT, 0, ITEM_HEIGHT]
    );
    const right = interpolate(
      value,
      [-1, -0.1, 1],
      [RIGHT_OFFSET / 2, RIGHT_OFFSET, RIGHT_OFFSET / 3]
    );

    return {
      transform: [{ translateY }],
      right,
    };
  }, []);

  return (
    // <LinearGradient
    //   colors={["#e64777", "#e97db0", "#e6acda", "#e9d6f2", "#fcfcfc"]} // Gradient colors
    //   start={{ x: 0, y: 0 }} // Start from bottom-left
    //   end={{ x: 0, y: 0 }} // End at top-right (creating a "to right top" effect)
    //   style={styles.gradientBackground}
    // >
      <SafeAreaView style={styles.safeArea}>
        <Stack.Screen
          options={{
            headerTitle: "",
            headerTransparent: true,
            header: () => <AppSearch/>,
          }}
        />
        <View style={styles.mainContainer}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Carousel Component */}

            <View style={{ marginVertical: 20 }}>
              <Carousel
                loop
                vertical
                style={{
                  justifyContent: "center",
                  width: PAGE_WIDTH,
                  height: PAGE_HEIGHT,
                }}
                width={ITEM_WIDTH}
                pagingEnabled={false}
                height={ITEM_HEIGHT}
                data={newsCategories}
                renderItem={({ item }) => (
                  <View key={item.name} style={{ flex: 1, padding: 10 }}>
                    <SlideItem category={item} />
                  </View>
                )}
                customAnimation={animationStyle}
              />
            </View>
          </ScrollView>
          {/* Footer Component */}
          <View style={{ width: "80%", alignSelf: "center", flex: 1 }}>
            <AppFooter />
          </View>
        </View>
      </SafeAreaView>
    // </LinearGradient>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor:COLORS.lightWhite // Ensure SafeAreaView takes up the full height
    backgroundImage:"#e9ecef"
  },
  gradientBackground: {
    flex: 1, // Make sure it fills the screen
    justifyContent: "center", // Center the content
    alignItems: "center", // Center horizontally
  },
  mainContainer: {
    flex: 1, // Ensures proper layout for the footer to stay at the bottom
  },
  scrollContent: {
    flexGrow: 1,
    // paddingBottom: 80, // Space to prevent overlap with footer
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default Index;
