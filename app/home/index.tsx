import { COLORS, FONT, SIZES } from "@/constants";
import service from "@/service";
import { RelativePathString, router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { StyleSheet } from "react-native";

const index = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerTitleAlign: "center",
          headerTitle: "",
          headerTransparent: true,
        }}
      />

      <ImageBackground
        source={require("../../assets/images/home.png")}
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View></View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: SIZES.medium,
  },
  subText: {
    textAlign: "center",
    color: COLORS.gray,
    marginBottom: SIZES.large,
  },

  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  agreementText: {
    textAlign: "center",
    fontSize: SIZES.small,
    color: COLORS.default,
    marginBottom: 20,
  },
  linkText: {
    color: COLORS.secondary,
    textDecorationLine: "underline",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tabText: {
    fontSize: SIZES.medium,
    color: COLORS.default,
    marginHorizontal: 10,
  },
  activeTabText: {
    color: COLORS.secondary,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.secondary,
  },
  input: {
    borderWidth: 1,
    // borderColor: COLORS.default,
    borderRadius: 40,
    padding: 10,
    width: "100%",
    marginBottom: 10,
    color: "black",
  },
});

export default index;
