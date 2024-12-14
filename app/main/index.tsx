import { COLORS, FONT, SIZES } from "@/constants";
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
} from "react-native";
import { StyleSheet } from "react-native";













const index = () => {
  const dataBasePreferencesData: any[] = []; // Placeholder data
  
  const [showModal, setShowModal] = useState(false);

  // Check for data and show modal when there's no data
  useEffect(() => {
    if (dataBasePreferencesData.length === 0) {
      setShowModal(true);
    } else {
      router.push("/home" as RelativePathString);
    }
  }, [dataBasePreferencesData]);

  // Function to handle category selection
  const handleCategorySelect = (category: string) => {
    console.log("Selected Category:", category);
    setShowModal(false);
    // TODO: Save the selected category to your database or state management
  };

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
          <View>
            <TouchableOpacity>
              <Text style={styles.headerText}>Welcome</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>

      {/* Modal for Category Selection */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Your Preferred Categories</Text>
            <TouchableOpacity onPress={() => handleCategorySelect("Technology")}>
              <Text style={styles.categoryText}>Technology</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCategorySelect("Sports")}>
              <Text style={styles.categoryText}>Sports</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCategorySelect("Politics")}>
              <Text style={styles.categoryText}>Politics</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCategorySelect("Entertainment")}>
              <Text style={styles.categoryText}>Entertainment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5, // Shadow for Android
  },
  modalTitle: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    marginBottom: 20,
    color: "black",
  },
  categoryText: {
    fontSize: SIZES.medium,
    color: COLORS.default,
    marginBottom: 10,
    textAlign: "center",
  },
  icon: {
    position: "absolute", // Make it position-relative to the container
    right: 10, // Adjust the distance from the right edge
    top: "50%", // Vertically center it within the container
    transform: [{ translateY: -12 }], // Offset for proper centering
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

  headerText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: "black",
    marginBottom: 10,
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
