import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SIZES, COLORS, FONT } from "@/constants";
import { useRouter } from "expo-router";
import * as Interface from "@/interface";
import service from "@/service";

const SkeletonLoader = () => {
  return (
    <View style={styles.skeletonContainer}>
      {Array(3)
        .fill("")
        .map((_, index) => (
          <View key={index} style={styles.skeletonCard}>
            <View style={styles.skeletonImage} />
            <View style={styles.skeletonText} />
            <View style={styles.skeletonFooter} />
          </View>
        ))}
    </View>
  );
};


const AllNewsCard = () => {
  const router = useRouter();
  const [data, setData] = useState<Interface.INewsResponse[]>([]); // Default to empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await service.apiService.getAllGeneralNewsByTheNewsApi();

        // Check for unique IDs in the fetched data
        const ids = fetchedData.map((item) => item.id);
        const uniqueIds = new Set(ids);
       

        if (fetchedData && Array.isArray(fetchedData)) {
          setData(fetchedData); // Set the combined data
        } else {
          console.warn("Fetched data is invalid or empty.");
          setData([]); // Fallback to empty array if no valid data
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]); // Fallback to empty array in case of error
      }
    };
    fetchData();
  }, []);

  const handleOnPress = (newsItem: Interface.INewsResponse) => {
    router.push({
      pathname: "/news", // Destination page
      params: { news: JSON.stringify(newsItem) }, // Passing the selected news item as params
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>ALL News &#x27A4;</Text>
      {data.length > 0 ? (
        data.map(({
          id,
          imageUrl,
          title,
          description,
          time,
          category,
          author,
          outerUrl,
        }, index) => {
          // If there are duplicates, generate a unique key using index as a fallback
          const uniqueKey = `${id}-${index}`;

          return (
            <TouchableOpacity
              key={uniqueKey} // Use uniqueKey to prevent key duplication
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
              <Image
                source={{ uri: imageUrl || "https://via.placeholder.com/200" }} // Ensure fallback if imageUrl is empty or invalid
                style={styles.image}
              />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.8)"]}
                style={styles.overlay}
              >
                <View style={styles.contentContainer}>
                  <Text style={styles.title}>{title}</Text>
                  {/* <Text style={styles.description}>{description}</Text> */}
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
          );
        })
      )  : (
        <SkeletonLoader /> // Display skeleton loader when no data is available
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
    // marginBottom: 5,
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
    marginTop:10
  },
   // Skeleton styles
   skeletonContainer: { marginTop: 20 },
   skeletonCard: {
     marginBottom: 15,
     borderRadius: 10,
     backgroundColor: COLORS.lightWhite,
     overflow: "hidden",
   },
   skeletonImage: {
     width: "100%",
     height: 150,
     backgroundColor: COLORS.gray,
   },
   skeletonText: {
     height: 20,
     marginTop: 10,
     marginHorizontal: 10,
     backgroundColor: COLORS.gray,
     borderRadius: 5,
   },
   skeletonFooter: {
     height: 15,
     marginTop: 10,
     marginHorizontal: 10,
     backgroundColor: COLORS.gray,
     borderRadius: 5,
     marginBottom: 10,
   },
});

export default AllNewsCard;
