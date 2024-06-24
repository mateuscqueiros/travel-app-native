import FilterTags from "@/components/FilterTags";
import { DestinationsList } from "@/features/destinations/components/List";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
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
import { Categories } from "../components";

const ios = Platform.OS == "ios";
const topMargin = ios ? "pt-3" : "pt-10";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [activeTag, setActiveTag] = useState<number | null>(0);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className={topMargin}>
        {/* avatar */}
        <View className="mx-5 flex-row justify-between itens-center mb-10">
          <Text
            style={{ fontSize: wp(7) }}
            className="font-bold text-neutral-700"
          >
            Descubra
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
              value={search}
              onChangeText={setSearch}
              placeholder="Buscar um destino"
              placeholderTextColor="gray"
              className="flex-1 text-base pl-1 tracking-wider"
            />
          </View>
        </View>

        <View className="mb-4">
          <Categories
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </View>

        <View className="mb-4">
          <FilterTags activeTag={activeTag} setActiveTag={setActiveTag} />
        </View>

        <View>
          <DestinationsList
            search={search}
            activeCategory={activeCategory}
            activeTag={activeTag}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
