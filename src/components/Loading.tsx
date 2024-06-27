import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export function Loading() {
  // const [spinValue] = useState(new Animated.Value(0));
  //
  // const spin = spinValue.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ["0deg", "360deg"],
  // });
  //
  // useEffect(() => {
  //   Animated.loop(
  //     Animated.spring(spinValue, {
  //       toValue: 360,
  //       useNativeDriver: true,
  //     }),
  //   ).start();
  // }, []);

  return (
    <View className="flex items-center justify-center flex-row gap-x-2 w-full h-full">
      <Feather className="animate-spin" name="loader" size={32} />
      {/* <Animated.Image */}
      {/*   style={[{ transform: spin }]} */}
      {/*   source={} */}
      {/* /> */}
      <Text className="text-black text-lg">Carregando...</Text>
    </View>
  );
}
