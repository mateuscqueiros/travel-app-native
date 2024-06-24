import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { theme } from "../themes";
import { TAG_DATA } from "../values";

export type FilterTagsProps = {
  activeTag: number | null;
  setActiveTag: (value: number | null) => void;
};

export default function FilterTags({
  activeTag,
  setActiveTag,
}: FilterTagsProps) {
  return (
    <ScrollView
      horizontal
      bounces={false}
      showsHorizontalScrollIndicator={false}
    >
      <View className="flex-row justify-around items-center mx-4 bg-neutral-100 rounded-full p-2 px-4 space-x-2">
        {TAG_DATA.map((tag, index) => {
          let isActive = tag.id == activeTag;
          let activeButtonClass = isActive ? "bg-white shadow" : "";

          return (
            <TouchableOpacity
              onPress={() => setActiveTag(tag.id)}
              className={`p-3 space-x-4 rounded-full flex ${activeButtonClass}`}
              key={index}
            >
              <Text
                className="font-semibold"
                style={{
                  fontSize: wp(4),
                  color: isActive ? theme.text : "rgba(0,0,0,0.6)",
                }}
              >
                {tag.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}
