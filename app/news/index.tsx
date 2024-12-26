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
import { RelativePathString, router, Stack, useRouter } from "expo-router";
import { COLORS, FONT, SIZES } from "@/constants";
import AppFooter from "@/components/AppFooter";
import Carousel from "react-native-reanimated-carousel";
import { interpolate } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import * as Interface from "@/interface";
import AppSearch from "@/components/AppSearch";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");
// Constants for window dimensions
const window = {
  width: SCREEN_WIDTH,
  height: 830,
};

type Props = {
  item: Interface.INewsResponse;
};

const Index = ({ item }: Props) => {
  //   const { query  = useRouter();
  //   const item = query as Props["item"];

  return (
    <LinearGradient
      colors={["#e64777", "#e97db0", "#e6acda", "#e9d6f2", "#fcfcfc"]} // Gradient colors
      start={{ x: 0, y: 0 }} // Start from bottom-left
      end={{ x: 0, y: 0 }} // End at top-right (creating a "to right top" effect)
      style={styles.gradientBackground}
    >
      <SafeAreaView style={styles.safeArea}>
        <Stack.Screen
          options={{
            headerTitle: "",
            headerTransparent: true,
            header: () => <AppSearch />,
          }}
        />
        <View style={styles.mainContainer}>
          <View style={styles.scrollContent}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1721332155484-5aa73a54c6d2?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
              style={styles.image}
            />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.8)"]}
              style={styles.overlay}
            >
              <View style={styles.contentContainer}>
                <View style={styles.categoryContainer}>
                  <Text style={styles.category}>
                    {/* {item.category[0]} */}Technology
                  </Text>
                </View>
                <Text style={styles.title}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Text>
                <View style={styles.footer}>
                  <Text style={styles.author}>{/* {item.author} */}mainak</Text>
                  <Text style={styles.time}>{/* {item.time} */}23/06/2004</Text>
                </View>
              </View>
            </LinearGradient>
            {/* description part */}
            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionText}>
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur?" But I must explain to you how all this
                mistaken idea of denouncing pleasure and praising pain was born
               
                
               
              </Text>
            </View>
            <TouchableOpacity style={styles.moreContent}>
              <Text style={{textAlign:"center"}}>More Details</Text>
            </TouchableOpacity>
          </View>
          {/* Footer Component */}
          <View style={{ width: "80%", alignSelf: "center", flex: 1 }}>
            <AppFooter />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor:COLORS.lightWhite // Ensure SafeAreaView takes up the full height
    // backgroundImage:''
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
  itemContainer: {
    alignItems: "center",
    width: window.width,
    // marginTop: 70,
  },
  image: {
    width: window.width - 30,
    height: 300,
    top: 80,
    borderRadius: 20,
  },
  overlay: {
    position: "absolute",
    width: window.width - 30,
    height: 300,
    top: 80,
    borderRadius: 20,
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
  descriptionBox: {
    width: window.width - 30,
    // height:window.height,
    padding: 10,
    top: 80,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    textAlign: "center",
    backgroundColor: COLORS.lightWhite,
  },
  descriptionText: {
    textAlign: "left",
    fontFamily:FONT.regular,
    fontSize:14    
  },
  moreContent: {
    backgroundColor: COLORS.white,
    // padding: 15,
    borderRadius: 50,
    width: 60,
    height: 60,
    position:"absolute",
    right: 20,
    bottom: -10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#e64777",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 53,
    elevation: 9,
    zIndex:2
  },
});

export default Index;
