import { getCategories } from "@/features/categories/axios";
import { CategoryType } from "@/types";
import { IMAGE_SOURCES } from "@/values";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { theme } from "../themes";

export function Categories() {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  console.log(categories);

  return (
    <View className="space-y-5">
      <View className=" mx-5 flex-row justify-between items-center">
        <Text
          style={{ fontSize: wp(4) }}
          className="font-semibold text-neutral-700"
        >
          Categories
        </Text>
        <TouchableOpacity>
          <Text style={{ fontSize: wp(4), color: theme.text }}>See all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="space-x-4"
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((category, index) => {
          const image = IMAGE_SOURCES.find((i) => i.id === category.imageId);
          return (
            <TouchableOpacity
              key={index}
              className="flex items-center space-y-2"
            >
              <Image
                source={image?.source}
                className="rounded-3xl"
                style={{ width: wp(20), height: wp(19) }}
              />
              <Text className="text-neutral-700 font-medium">
                {category.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
