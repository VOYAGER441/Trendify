import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

// import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View, SafeAreaView, ScrollView } from "react-native";

export default function Home() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
          <Text>Hello world</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
