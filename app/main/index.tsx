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
  const categories = [
    "regional",
    "technology",
    "lifestyle",
    "business",
    "general",
    "programming",
    "science",
    "entertainment",
    "world",
    "sports",
    "finance",
    "academia",
    "politics",
    "health",
    "opinion",
    "food",
    "game",
  ];

  const [dataBasePreferencesData, setDataBasePreferencesData] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch user preferences
  const fetchUserPreferences = async () => {
    try {
      const preferences = await service.appWrite.getCurrentUserCategory();
      if (preferences) {
        setDataBasePreferencesData(preferences);
      }
    } catch (error) {
      console.error("Error fetching user preferences:", error);
    }
  };

  // Add or remove category on selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev: string[]) =>
      prev.includes(category)
        ? prev.filter((item: string) => item !== category)
        : [...prev, category]
    );
  };

  // Submit selected categories to the backend
  const handleSubmit = async () => {
    await service.appWrite.updatePreference(selectedCategories);
    setShowModal(false);
  };

  useEffect(() => {
    fetchUserPreferences(); // Fetch preferences on mount
  }, []);

  useEffect(() => {
    // Show modal if no preferences exist
    if (dataBasePreferencesData.length === 0) {
      setShowModal(true);
    } else {
      router.push("/home" as RelativePathString);
    }
  }, [dataBasePreferencesData]);

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
            <Modal animationType="slide" transparent visible={showModal}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.headerText}>Choose whatever you like</Text>
                  <Text style={styles.subText}>Choose at least 5 topics</Text>

                  {/* Category List */}
                  <FlatList
                    data={categories}
                    keyExtractor={(item: any) => item}
                    numColumns={3}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={[
                          styles.categoryItem,
                          selectedCategories.includes(item) &&
                            styles.selectedCategory,
                        ]}
                        onPress={() => toggleCategory(item)}
                      >
                        <Text
                          style={[
                            styles.categoryText,
                            selectedCategories.includes(item) &&
                              styles.selectedCategoryText,
                          ]}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />

                  {/* Continue Button */}
                  <TouchableOpacity
                    style={[
                      styles.continueButton,
                      selectedCategories.length < 5 && styles.disabledButton,
                    ]}
                    disabled={selectedCategories.length < 5}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.continueText}>Continue</Text>
                  </TouchableOpacity>

                  {/* Close Modal Button */}
                  <TouchableOpacity
                    style={styles.continueButton} // Reuse the button style for consistency
                    onPress={() => setShowModal(false)}
                  >
                    <Text style={styles.continueText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </ImageBackground>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
  },
  modalContent: {
    width: "90%",
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.xxLarge,
    padding: SIZES.medium,
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
  categoryItem: {
    flex: 1,
    margin: 5,
    paddingVertical: 10,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: COLORS.default,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedCategory: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontFamily: FONT.bold,
    fontSize: 14,
    color: COLORS.primary,
  },
  selectedCategoryText: {
    color: COLORS.tertiary,
  },
  continueButton: {
    backgroundColor: COLORS.default,
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: COLORS.gray2,
  },
  continueText: {
    color: COLORS.tertiary,
    fontSize: 16,
    fontWeight: "bold",
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
});

export default index;
