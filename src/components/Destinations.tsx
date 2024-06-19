import {
  changeFavoriteDestination,
  getDestinations,
} from "@/features/destinations";
import { DestinationType } from "@/types";
import { IMAGE_SOURCES } from "@/values";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export type DestinationCardProps = {
  item: DestinationType;
  onChangeFavorite?: () => void;
};

export function Destinations() {
  const [destinations, setDestinations] = useState<DestinationType[]>([]);

  const getDestinationData = () =>
    getDestinations()
      .then((data) => setDestinations(data))
      .catch((err) => console.log(err));

  useFocusEffect(
    useCallback(() => {
      getDestinationData();
    }, []),
  );

  return (
    <View className="flex-wrap mx-4 flex-row justify-between pb-10">
      {destinations.map((item, index) => {
        return (
          <DestinationCard
            onChangeFavorite={getDestinationData}
            item={item}
            key={index}
          />
        );
      })}
    </View>
  );
}

const DestinationCard = ({ item, onChangeFavorite }: DestinationCardProps) => {
  const router = useRouter();

  const image = IMAGE_SOURCES.find((i) => i.id === item.imageId);

  return (
    <TouchableOpacity
      onPress={() => router.push(`destinations/${item.id}`)}
      style={{ width: wp(44), height: wp(65) }}
      className="flex justify-end relative p-4 space-y-2 mb-5"
    >
      <Image
        source={image?.source}
        style={{ width: wp(44), height: wp(65), borderRadius: 35 }}
        className="absolute"
      />

      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={{
          width: wp(44),
          height: hp(15),
          borderBottomLeftRadius: 35,
          borderBottomRightRadius: 35,
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        className="absolute bottom-0"
      />

      <TouchableOpacity
        onPress={() => {
          changeFavoriteDestination(item.id, !item.isFavorite)
            .then(() => {
              onChangeFavorite && onChangeFavorite();
            })
            .catch((err) => console.log(err));
        }}
        className="absolute top-1 p-3 right-3 rounded-full"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
      >
        {item.isFavorite ? (
          <FontAwesome name="heart" size={wp(5)} color="#fa6868" />
        ) : (
          <FontAwesome name="heart-o" size={wp(5)} color="white" />
        )}
      </TouchableOpacity>

      <Text style={{ fontSize: wp(4) }} className="text-white font-semibold">
        {item.title}
      </Text>
      <Text style={{ fontSize: wp(2.2) }} className="text-white">
        {item.shortDescription}
      </Text>
    </TouchableOpacity>
  );
};
