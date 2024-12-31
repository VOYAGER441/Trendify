import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  Dimensions,
} from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import AppDisplayNews from "@/components/AppDisplayNews"; // Your News Component
import AppFooter from "@/components/AppFooter";
import AppSearch from "@/components/AppSearch";
import { COLORS } from "@/constants";
import * as Interface from "@/interface";
import { newsData, newsData1 } from "@/mock/mock.data";
import { GLOBAL_FEED_NEWS } from "@/service/api.service";
const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const Index = () => {
  // Access params using useLocalSearchParams
  const { news } = useLocalSearchParams();

  // Parse the news data
  const newsItem = news ? JSON.parse(news as string) : null;

  if (!newsItem) {
    return (
      <View style={styles.container}>
        <Text>No News Data Available</Text>
      </View>
    );
  }

  const renderNewsItem = ({ item }: { item: Interface.INewsResponse }) => (
    <AppDisplayNews item={item} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <Stack.Screen
        options={{
          headerTitle: "",
          headerTransparent: true,
          header: () => <AppSearch />,
        }}
      />

      {/* Main Content */}
      <FlatList
        data={[
          ...(newsItem ? [{ ...newsItem, id: `newsItem-${newsItem.id}` }] : []),
         ...GLOBAL_FEED_NEWS
        ]}
        renderItem={renderNewsItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        snapToAlignment="center"
        decelerationRate="fast"
      />

      {/* Footer */}
      <View style={{ width: "80%", alignSelf: "center", flex: 1 }}>
        <AppFooter />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  flatList: {
    flexGrow: 1,
    width: SCREEN_WIDTH,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Index;
