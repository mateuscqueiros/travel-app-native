import SortCategories from "@/components/SortCategories";
import { getDestinations } from "@/features/destinations";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Categories, Destinations } from "../components";

const ios = Platform.OS == "ios";
const topMargin = ios ? "pt-3" : "pt-10";

export default function HomeScreen() {
  console.log("render");
  useEffect(() => {
    console.log("useEffect");
    fetch("http://10.0.2.2:3001/destinations").then((a) => console.log("a", a));
    getDestinations()
      .then((data) => {
        console.log("ok");
        console.log(data);
      })
      .catch((err) => {
        console.log("error");
        console.log(JSON.stringify(err));
      })
      .finally(() => console.log("finally"));
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className={topMargin}>
        {/* avatar */}
        <View className="mx-5 flex-row justify-between itens-center mb-10">
          <Text
            style={{ fontSize: wp(7) }}
            className="font-bold text-neutral-700"
          >
            Let's Discover
          </Text>
          <TouchableOpacity>
            <Image
              source={require("../assets/images/avatar.png")}
              style={{ height: wp(12), width: wp(12) }}
            />
          </TouchableOpacity>
        </View>

        {/* searchbar */}
        <View className="mx-5 mb-4">
          <View className="flex-row items-center bg-neutral-100 rounded-full p-4 space-x-2 pl-6">
            <FontAwesome name="search" size={20} strokeWidth={3} color="gray" />
            <TextInput
              placeholder="Search destination"
              placeholderTextColor={"gray"}
              className="flex-1 text-base mb-1 pl-1 tracking-wider"
            />
          </View>
        </View>

        {/* categarioes */}
        <View className="mb-4">
          <Categories />
        </View>

        {/* sort categarioes */}
        <View className="mb-4">
          <SortCategories />
        </View>

        {/* destinations */}
        <View>
          <Destinations />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
