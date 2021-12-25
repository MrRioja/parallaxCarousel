import * as React from "react";
import { EvilIcons } from "@expo/vector-icons";
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";

// Flatlist styles
const { width, height } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

// header Styles
const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
// const ITEM_WIDTH = width * 0.76;
// const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

const images = [
  {
    title: "Yuri Mosley",
    location: "Oldenzaal",
    date: "Nov 16th, 2021",
    image:
      "https://images.unsplash.com/photo-1562569633-622303bafef5?w=800&q=80",
  },
  {
    title: "Cassady Morrison",
    location: "Mejillones",
    date: "Apr 30th, 2022",
    image:
      "https://images.unsplash.com/photo-1517957754642-2870518e16f8?w=800&q=80",
  },
  {
    title: "Cade Dominguez",
    location: "Charleville-Mézières",
    date: "Nov 22nd, 2021",
    image:
      "https://images.unsplash.com/photo-1511208687438-2c5a5abb810c?w=800&q=80",
  },
  {
    title: "Lara Franklin",
    location: "Imperatriz",
    date: "May 21st, 2021",
    image:
      "https://images.unsplash.com/photo-1546484959-f9a381d1330d?w=800&q=80",
  },
  {
    title: "Heather Bailey",
    location: "Matiari",
    date: "Feb 5th, 2021",
    image:
      "https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=800&q=80",
  },
  {
    title: "Shana Mcleod",
    location: "Mamuju",
    date: "Jun 27th, 2022",
    image:
      "https://images.unsplash.com/photo-1503656142023-618e7d1f435a?w=800&q=80",
  },
  {
    title: "Hayden Swanson",
    location: "Villahermosa",
    date: "May 18th, 2021",
    image:
      "https://images.unsplash.com/photo-1555096462-c1c5eb4e4d64?w=800&q=80",
  },
  {
    title: "Hop Morris",
    location: "Gore",
    date: "Mar 18th, 2022",
    image:
      "https://images.unsplash.com/photo-1548761208-b7896a6ff225?w=800&q=80",
  },
  {
    title: "Cadman Mckenzie",
    location: "Villahermosa",
    date: "Jan 7th, 2021",
    image:
      "https://images.unsplash.com/photo-1548614606-52b4451f994b?w=800&q=80",
  },
  {
    title: "Cooper Wynn",
    location: "Ligney",
    date: "Feb 18th, 2022",
    image:
      "https://images.unsplash.com/photo-1548600916-dc8492f8e845?w=800&q=80",
  },
];

const data = images.map((item, index) => ({
  key: String(item.title),
  title: item.title,
  location: item.location,
  date: item.date,
  photo: item.image,
  avatar_url: `https://randomuser.me/api/portraits/women/${Math.floor(
    Math.random() * 40
  )}.jpg`,
}));

const OverflowItems = ({ data }) => {
  return (
    <View style={styles.overflowContainer}>
      <View>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={[styles.title]} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text style={[styles.location]}>
                  <EvilIcons
                    name="location"
                    size={16}
                    color="black"
                    style={{ marginRight: 5 }}
                  />
                  {item.location}
                </Text>
                <Text style={[styles.date]}>{item.date}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <OverflowItems data={data} />

      <Animated.FlatList
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width * 0.7, 0, width * 0.7],
          });

          return (
            <View
              style={{ width, justifyContent: "center", alignItems: "center" }}
            >
              <View
                style={{
                  borderRadius: 18,
                  shadowColor: "#000",
                  shadowOpacity: 0.5,
                  shadowRadius: 30,
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  padding: 12,
                  elevation: 25,
                  backgroundColor: "white",
                }}
              >
                <View
                  style={{
                    width: ITEM_WIDTH,
                    height: ITEM_HEIGHT,
                    overflow: "hidden",
                    alignItems: "center",
                    borderRadius: 14,
                  }}
                >
                  <Animated.Image
                    source={{ uri: item.photo }}
                    style={{
                      width: ITEM_WIDTH * 1.4,
                      height: ITEM_HEIGHT,
                      resizeMode: "cover",
                      transform: [{ translateX }],
                    }}
                  />
                </View>

                <Image
                  source={{ uri: item.avatar_url }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 60,
                    borderWidth: 6,
                    borderColor: "white",
                    position: "absolute",
                    bottom: -30,
                    right: 60,
                  }}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: -1,
  },
  location: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING,
  },
  itemContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: "hidden",
  },
});
