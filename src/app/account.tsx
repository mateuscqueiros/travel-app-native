import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  const user = {
    name: 'Mateus Queirós',
    email: 'mateuscqueiros@gmail.com',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="light" />
      <ScrollView className="mx-5" showsVerticalScrollIndicator={false}>
        <View className="flex flex-col justify-between h-full">
          <View className="mb-10 pt-8">
            <Text className="text-3xl font-bold text-neutral-700">
              {user.name}
            </Text>
            <Text className="pt-3">{user.description}</Text>
          </View>
          <View className="gap-y-4">
            <Button title="Deletar" color="#FF6A67" />
            <TouchableHighlight
              style={{ backgroundColor: '#FF6A67' }}
              className="flex flex-row items-center justify-center font-bold rounded-full p-4"
            >
              <>
                <FontAwesome
                  name="trash"
                  color="white"
                  size={20}
                  style={{ marginRight: 8 }}
                />
                <Text className="text-lg text-white">
                  Deletar conta (Highlight)
                </Text>
              </>
            </TouchableHighlight>
            <TouchableOpacity
              style={{ backgroundColor: '#FF6A67' }}
              className="flex flex-row items-center justify-center font-bold rounded-full p-4"
            >
              <FontAwesome
                name="trash"
                color="white"
                size={20}
                style={{ marginRight: 8 }}
              />
              <Text className="text-lg text-white">
                Deletar conta (Opacity)
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
