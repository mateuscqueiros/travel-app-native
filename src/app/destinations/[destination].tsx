import { destinationData } from "@/constants";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../themes";

export default function DestinationScreen() {
  const [isFavorite, setFavorite] = useState(false);
  const { destination: destinationId } = useLocalSearchParams<{
    destination: string;
  }>();
  const item = destinationData.find((d) => d.id === Number(destinationId));

  const router = useRouter();

  if (!item) {
    return router.push("not-found");
  }

  return (
    <View className="bg-white flex-1">
      <Image source={item.image} style={{ width: wp(100), height: hp(55) }} />
      <StatusBar style="light" />

      <SafeAreaView className="pt-5 flex-row justify-between items-center w-full absolute">
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
          className="p-2 ml-4 rounded-full"
        >
          <FontAwesome
            name="chevron-left"
            size={wp(7)}
            strokeWidth={4}
            color={"white"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFavorite(!isFavorite)}
          style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
          className="p-2 mr-4 rounded-full"
        >
          <FontAwesome
            name="heart"
            size={wp(7)}
            strokeWidth={4}
            color={isFavorite ? "red" : "white"}
          />
        </TouchableOpacity>
      </SafeAreaView>

      {/* title descrition and booking buttn */}
      <View
        style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className="pt-8 px-5 flex-1 justify-between bg-white -mt-14"
      >
        <ScrollView showsVerticalScrollIndicator={false} className="space-y-5">
          <View className="flex-row justify-between items-start">
            <Text
              className="font-bold flex-1 text-neutral-500"
              style={{ fontSize: wp(7) }}
            >
              {item?.title}
            </Text>
            <Text
              style={{ fontSize: wp(7), color: theme.text }}
              className="font-semibold"
            >
              ${item?.price}
            </Text>
          </View>

          <Text
            style={{ fontSize: wp(3.7) }}
            className="text-neutral-700 tracking-wide  mb-2"
          >
            {item?.longDescription}
          </Text>
          <View className="flex-row justify-between mx-1">
            <View className="flex-row space-x-2 items-start">
              <FontAwesome name="clock-o" size={wp(7)} color={"skyblue"} />
              <View className="flex space-y-2">
                <Text
                  style={{ fontSize: wp(4.5) }}
                  className="font-bold text-neutral-700"
                >
                  {item.duration}
                </Text>
                <Text className="text-neutral-600 tracking-wide">Duration</Text>
              </View>
            </View>

            <View className="flex-row space-x-2 items-start">
              <FontAwesome name="map" size={wp(7)} color={"#f87171"} />
              <View className="flex space-y-2">
                <Text
                  style={{ fontSize: wp(4.5) }}
                  className="font-bold text-neutral-700"
                >
                  {item.distance}
                </Text>
                <Text className="text-neutral-600 tracking-wide">Distance</Text>
              </View>
            </View>

            <View className="flex-row space-x-2 items-start">
              <FontAwesome name="sun-o" size={wp(7)} color={"orange"} />
              <View className="flex space-y-2">
                <Text
                  style={{ fontSize: wp(4.5) }}
                  className="font-bold text-neutral-700"
                >
                  {item.weather}
                </Text>
                <Text className="text-neutral-600 tracking-wide">
                  {Number(item.weather.split(" ")[0]) > 25 ? "Sunny" : "Cold"}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={{
            backgroundColor: theme.bg(0.8),
            height: wp(15),
            width: wp(50),
          }}
          className="mb-6 mx-auto rounded-full items-center justify-center flex"
        >
          <Text style={{ fontSize: wp(5.5) }} className="font-bold text-white">
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
